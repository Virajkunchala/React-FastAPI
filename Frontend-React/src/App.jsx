import { useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'; 
import Form from 'react-bootstrap/Form'; 
import Button from 'react-bootstrap/Button'; 


function App() {
  //input text fileds,error message varibles intilasition 
  const [textInput,setTextInput]=useState('');
  const[status,setStatus]=useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [result,setResult]=useState('');

  //handle onchange function of text filed
  const handleChange= (event)=>{
    setTextInput(event.target.value);
    setStatus('');
    setErrorMessage('');
    setResult('');
  };
  
  //form handling (form validation according to arthamtic expression)
  const handleSubmit = async(event)=>{
    event.preventDefault();
    setErrorMessage('');
    const processedtextInput=textInput.trim().split(/\s*(?:(\+|\-))\s*/);
    
    if (processedtextInput.length !==3){
      setErrorMessage('Invalid input:Please enter two numbers and one operator like : a+b or a-b')
    }

    const num1=parseFloat(processedtextInput[0]);
    const operator=processedtextInput[1];
    const num2=parseFloat(processedtextInput[2]);

    //exceptions related other than  +/- operators
    if(!['+','-'].includes(operator)){
      setErrorMessage('Invalid input : operator must be "+" or "-" (like : a+b, a-b)');
      return;
    }

    if(isNaN(num1) || !operator || isNaN(num2)){
      setErrorMessage('Please enter a valid arthimatic expression (like : a+b, a-b)');
      return;
    }
    
    //connect with API end point FASTAPI module 
    try{
      const response=await axios.post("http://localhost:8000/api/calculate",{expression:textInput});
      console.log(response.status);
      setResult(response.data.result);
      setStatus(response.status);
      setTextInput("");
      if (response.data.is_negative) {
        setErrorMessage('The result is negative.');
      }
    }catch(error){
      // console.log(error);
      setResult('');
      // console.error('Error while submitting the form',error);
      if (error.response) {
        setStatus(error.response.status);
        setErrorMessage('Too many values provided. Please use: operand operator operand.');
      } else if (error.request) {
        setErrorMessage('There seems to be a API connection error, please check the connection and try again');
      } else if (error.message) {
        setErrorMessage('Error: ${error.message}');
      }else{
        setErrorMessage('An error occured while processing your request');
      }
    }

  };
  

  return (
    <>
      <div style={{ display: 'block',  
                  width: 700,  
                  padding: 30 }}> 
      <h4></h4> 
      <Form onSubmit={handleSubmit}>
      <Form.Group> 
          <Form.Label>Expression:</Form.Label> 
          <Form.Control type="text" 
                       value={textInput} onChange={handleChange}  placeholder="Enter your expression ex: 1+2 ,30-20" /> 
        </Form.Group>  
        <Button variant="primary" type="submit"> 
           Submit 
        </Button> 
        {result && <div className='text-success'>Result of the expression:{result}</div>}
        {status && <div>Status code: {status}</div>}
        {errorMessage && <div className='text-danger'>{errorMessage}</div>}

      </Form> 
    </div> 
        
    </>
  )
}

export default App
