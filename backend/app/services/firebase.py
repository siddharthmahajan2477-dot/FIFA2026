import os
import firebase_admin
from firebase_admin import credentials, auth

# Singleton app instance
_firebase_app = None

def get_firebase_app():
    global _firebase_app
    if _firebase_app:
        return _firebase_app
        
    project_id = os.getenv("FIREBASE_PROJECT_ID")
    client_email = os.getenv("FIREBASE_CLIENT_EMAIL")
    private_key = os.getenv("FIREBASE_PRIVATE_KEY")
    
    if not project_id or not client_email or not private_key:
        raise ValueError("Firebase Admin SDK credentials (FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY) must be set in environment variables.")
        
    # Standardize newline parsing in the environment private key string
    formatted_key = private_key.replace("\\n", "\n").strip('"')
    
    cred = credentials.Certificate({
        "type": "service_account",
        "project_id": project_id,
        "private_key": formatted_key,
        "client_email": client_email,
    })
    
    _firebase_app = firebase_admin.initialize_app(cred)
    return _firebase_app

def verify_firebase_token(token: str) -> dict:
    """
    Verifies a Firebase ID token. Returns the decoded token payload
    or raises ValueError if the token is invalid or expired.
    """
    get_firebase_app()
    try:
        decoded = auth.verify_id_token(token)
        return decoded
    except Exception as e:
        raise ValueError(f"Firebase token verification failed: {str(e)}")
