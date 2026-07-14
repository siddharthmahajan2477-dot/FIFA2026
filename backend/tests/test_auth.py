from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["status"] == "online"

def test_register_mock():
    response = client.post(
        "/api/v1/auth/register",
        json={"email": "test@stadium.local", "password": "securepassword"}
    )
    assert response.status_code == 200
    assert response.json()["email"] == "test@stadium.local"
