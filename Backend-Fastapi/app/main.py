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
    '''
    calculates the mathamatical expression based on the requested data,
    supports only additon '+' substraction '-' operators
    Raise HTTP exceiptions for invalid expressions or unsupported operators
    ''' 
    try: 
        #used regular expression for matching the criteria + - 
        # num1, operator, num2=re.split("([+-/*])",expression.expression.replace(" ",""))
        num1,operator,num2=re.split(r"(\+|-|\*|/)",expression.expression.replace(" ",""))
        num1=float(num1)
        num2=float(num2)
    except(ValueError,TypeError) as e:
        raise HTTPException(status_code=400,detail=f"Invalid expression:{str(e)}")
    
    if operator not in "+-":
        raise HTTPException(status_code=400,detail=f"Unsupported operator:{operator}") 
    
    
    result=num1+num2 if operator =="+" else num1-num2
    
    return {"result":result,"status_code":200,"messge":"Success"}
    
@app.get("/")
async def read_root():
    return {"message": "Welcome to fastapi."}




# if __name__ == "__main__":
#     uvicorn.run("main:app", host="0.0.0.0", port=8000)
