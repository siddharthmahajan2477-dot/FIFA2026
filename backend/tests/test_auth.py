from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["status"] == "online"

def test_check_username():
    response = client.get(
        "/api/v1/auth/check-username",
        params={"username": "available_test_user_123"}
    )
    assert response.status_code == 200
    assert response.json()["username"] == "available_test_user_123"
    assert "available" in response.json()

