import json
import sys
import os
# Ensure the project root (Desktop\FootBallAI) is in sys.path
project_root = os.path.abspath(os.path.dirname(__file__))
if project_root not in sys.path:
    sys.path.insert(0, project_root)

from backend.app.main import app

def main():
    """Generate the OpenAPI schema and write it to the repository root as openapi.json."""
    openapi_schema = app.openapi()
    output_path = os.path.join(project_root, 'openapi.json')
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(openapi_schema, f, indent=2)
    print(f'OpenAPI schema written to {output_path}')

if __name__ == '__main__':
    main()
