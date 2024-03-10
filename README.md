##FastAPI/React(Vite) Application

A basic Arithmetic  expression evaluation  application using React(Vite) as Frontend and Fast API as backend

###Prerequisites

1.Python 3.x (python 3.11)

2.Node.js  (Node.js v21.6.1)

3.npm

###How to run

    *Ensure ports 5173,8080,8000 are free 

###Installation
   
1.clone the repository  
```bash
    git clone https://github.com/Virajkunchala/ReactFastAPI.git
```
2.Install frontend dependencies
 ```bash
    cd ReactFastAPI/Frontend-React
    npm install 
```

3.Install backend dependencies
```bash

    cd ReactFastAPI/Backend-Fastapi
    pip install -r requirements.txt
```

4.Start the fastapi backend server
```bash

    uvicorn app.main:app --reload 
```
This application will be accessible at [localhost:8000](http://localhost:8000/)
Just to check if the server is running fine we will not perform any actions here 

5.start the react frontend 
```bash
    npm run dev
```
This application will be accessible at [localhost:5173](http://localhost:5173/)

###Usage of the application

1.go to [localhost:5173](http://localhost:5173/)

2.Input the arithmetic expression into the given text box for ex: 1+5,100-90

3.click the submit button

4.Result will be display under the button 

As of now only addition/subtraction arithmetic operations are available 

