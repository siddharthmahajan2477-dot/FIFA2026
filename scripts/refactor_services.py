import os
import re

service_dir = r"c:\Users\Admin\Desktop\FootBallAI\services"

def process_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # If the file doesn't have setTimeout, skip
    if "setTimeout" not in content:
        return False

    # Regex to find static async methods that return a Promise with a setTimeout
    # This might be complex because of varying body formats. Let's just do a string replacement approach
    # We want to replace:
    # return new Promise((resolve) => setTimeout(() => resolve([]), 500))
    # return new Promise((resolve) => setTimeout(() => resolve(null), 500))
    
    # Let's use regex to find the method definitions
    method_pattern = re.compile(r'(static\s+async\s+(\w+)\s*\([^)]*\)\s*:\s*Promise<([^>]+)>\s*\{\s*)([\s\S]*?)(\s*\n  \})', re.MULTILINE)
    
    def replacer(match):
        header = match.group(1)
        method_name = match.group(2)
        return_type = match.group(3)
        body = match.group(4)
        footer = match.group(5)
        
        if "setTimeout" in body:
            # Determine the fallback value based on return_type
            fallback = "[]"
            if "[]" not in return_type and "Array" not in return_type:
                if "null" in return_type or return_type == "any":
                    fallback = "null"
                elif return_type in ["SanitationStats", "MatchCountdown", "Match"]:
                    fallback = "null"
                else:
                    fallback = "null"

            # Check if the body resolves to an object like resolve({...})
            if "resolve({" in body:
                 fallback = "null" # Simplified fallback, let UI handle nulls
            
            # Create generic fetch body
            endpoint = method_name.replace("get", "").lower()
            if not endpoint:
                endpoint = method_name
                
            new_body = f"""    try {{
      const response = await fetch(`${{process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}}/api/v1/{endpoint}`, {{
        headers: {{ 'Authorization': `Bearer ${{typeof window !== 'undefined' ? localStorage.getItem('token') : ''}}` }}
      }});
      if (!response.ok) throw new Error('Fetch failed');
      return await response.json();
    }} catch (error) {{
      console.error('{method_name} Error:', error);
      return {fallback} as any;
    }}"""
            return header + new_body + footer
        else:
            return match.group(0)
    
    new_content = method_pattern.sub(replacer, content)
    
    if new_content != content:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        return True
    return False

if __name__ == "__main__":
    count = 0
    for filename in os.listdir(service_dir):
        if filename.endswith(".ts"):
            if process_file(os.path.join(service_dir, filename)):
                print(f"Updated {filename}")
                count += 1
    print(f"Updated {count} files.")
