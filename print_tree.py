import os

def generate_tree(dir_path, prefix="", ignore_dirs=None):
    if ignore_dirs is None:
        ignore_dirs = {'.git', 'node_modules', 'venv', '.next', '__pycache__', 'dist', 'build', '.gemini'}
    
    try:
        entries = sorted(os.listdir(dir_path))
    except PermissionError:
        return ""
        
    entries = [e for e in entries if e not in ignore_dirs]
    
    tree_str = ""
    for i, entry in enumerate(entries):
        path = os.path.join(dir_path, entry)
        is_last = (i == len(entries) - 1)
        
        connector = "└── " if is_last else "├── "
        tree_str += f"{prefix}{connector}{entry}\n"
        
        if os.path.isdir(path):
            extension = "    " if is_last else "│   "
            tree_str += generate_tree(path, prefix + extension, ignore_dirs)
            
    return tree_str

if __name__ == "__main__":
    root_dir = r"C:\Users\Admin\Desktop\FootBallAI"
    tree = generate_tree(root_dir)
    
    output = f"# Project Structure\n\n```text\nFootBallAI\n{tree}```\n"
    
    with open("project_structure.md", "w", encoding="utf-8") as f:
        f.write(output)
    
    print("Created project_structure.md")
