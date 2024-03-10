from fastapi import FastAPI,Depends,Body,HTTPException
from typing import Union,Dict,List
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import re

app = FastAPI()

#CORS middleware for communication
origins=['http://localhost','http://localhost:5173','https://localhost:5173',"localhost:5173"]
app.add_middleware(
    CORSMiddleware,allow_origins=origins,allow_credentials=True,allow_methods=["*"], allow_headers=["*"],
)

#pydantic data validation
class Expression(BaseModel):
    expression:str
    
#api for calculation 
@app.post("/api/calculate")
async def calculate(expression:Expression)->dict:
    """
    Calculate the mathematical expression based on the requested data.
    
    Supports only addition '+' and subtraction '-' operators.
    
    Args:
        expression (Expression): The expression to be calculated.
        
    Returns:
        dict: A dictionary containing the result of the calculation.
    """
    try: 
        #used regular expression for matching the criteria + - 
        num1,operator,num2=re.split(r"(\+|-|\*|/)",expression.expression.replace(" ",""))
        num1=float(num1)
        num2=float(num2)
    except(ValueError,TypeError) as e:
        raise HTTPException(status_code=400,detail=f"Invalid expression:{str(e)}")
    
    if operator not in "+-":
        raise HTTPException(status_code=400,detail=f"Unsupported operator:{operator}") 
    
    
    result=num1+num2 if operator =="+" else num1-num2
    
    if result < 0:
        return {"result": result, "is_negative": True, "message": "The result is negative."}
    
    return {"result":result,"is_negative": False,"status_code":200,"message":"Success"}
    
@app.get("/")
async def read_root():
    """
    welcome message for the FastAPI.
    
    Returns:
        dict: A dictionary containing the welcome message for debugging.
    """
    return {"message": "Welcome to fastapi"}




# if __name__ == "__main__":
#     uvicorn.run("main:app", host="0.0.0.0", port=8000)
