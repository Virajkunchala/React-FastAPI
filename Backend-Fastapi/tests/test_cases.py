import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient
from app.main import app
#handling the warnings globally in this test cases
import warnings
warnings.filterwarnings("ignore", category=DeprecationWarning)


client = TestClient(app)

def test_valid_addition():
    '''
    Test case for addition
    '''
    response = client.post(
        "/api/calculate",
        json={"expression": "30+70"},
    )
    assert response.status_code == 200
    assert response.json() == {
        "result": 100,
        "is_negative": False,
        "message": "Success",
        "status_code": 200
    }

def test_valid_substraction():
    '''
    Test case for  substraction
    '''
    response=client.post(
        "/api/calculate",
        json={"expression": "100-70"},
    )
    assert response.status_code == 200
    assert response.json() == {
        "result": 30,
        "is_negative":False,
        "message":"Success",
        "status_code": 200
    }
    
def test_unsupported_operator():
    '''
    Test case for resulting unsupported operator
    '''
    response=client.post(
        "/api/calculate",
        json={"expression":"10*20"},
    )
    assert response.status_code==400
    assert "Unsupported operator" in response.json()['detail']
    
def test_negative_result():
    '''
    Test case for resulting negative value
    '''
    response=client.post(
        "/api/calculate",
        json={"expression": "10-70"},
    )
    assert response.status_code == 200
    assert response.json() == {
        "result": -60,
        "is_negative":True,
        "message": "The result is negative."
        }