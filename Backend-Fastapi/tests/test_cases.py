import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient
from app.main import app
#handling the warnings globally in this test cases
import warnings
warnings.filterwarnings("ignore", category=DeprecationWarning)


client = TestClient(app)

def test_valid_addition():
    response = client.post(
        "/api/calculate",
        json={"expression": "30+70"},
    )
    assert response.status_code == 200
    assert response.json() == {
        "result": 100,
    }

def test_valid_substraction():
    response=client.post(
        "/api/calculate",
        json={"expression": "100-70"},
    )
    assert response.status_code == 200
    assert response.json() == {
        "result": 30,
    }
    
def test_unsupported_operator():
    response=client.post(
        "/api/calculate",
        json={"expression":"10*20"},
    )
    assert response.status_code==400
    assert "Unsupported operator" in response.json()['detail']