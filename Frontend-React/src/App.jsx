import { useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'; 
import Form from 'react-bootstrap/Form'; 
import Button from 'react-bootstrap/Button'; 


function App() {
  //input text fileds,error message varibles intilasition 
  const [textInput,setTextInput]=useState('');
  const[textInputError,setTextInputError]=useState('');
  const [result,setResult]=useState('');

  //handle onchange function of text filed
  const handleChange= (event)=>{
    setTextInput(event.target.value);
    setTextInputError('');
    setResult('');
  };
  
  //form handling (form validation according to arthamtic expression)
  const handleSubmit = async(event)=>{
    event.preventDefault();
    setTextInputError('');
    // console.log('textInput:', textInput);
    const processedtextInput=textInput.trim().split(/\s*(?:(\+|\-))\s*/);
    
    // console.log('textInput:', processedtextInput);
    if (processedtextInput.length !==3){
      setTextInputError("Invalid input:Please enter two numbers and one operator like : a+b or a-b")
    }
    // const [num1,operator,num2]=processedtextInput.trim().split(/\s*(?:(\+|\-))\s*/).map(parseFloat);
    const num1=parseFloat(processedtextInput[0]);
    const operator=processedtextInput[1];
    const num2=parseFloat(processedtextInput[2]);
    // console.log([num1+num2]);
    //exceptions related other than  +/- operators
    if(!['+','-'].includes(operator)){
      setTextInputError("Invalid input : operator must be '+' or '-' (like : a+b, a-b)");
      return;
    }
    // console.log(num1, num2, operator);

    if(isNaN(num1) || !operator || isNaN(num2)){
      setTextInputError('Please enter a valid arthimatic expression (like : a+b, a-b)');
      return;
    }
    
    //connect with API end point FASTAPI module 
    try{
      const response=await axios.post("http://localhost:8000/api/calculate",{expression:textInput});
      console.log(response.data);
      setResult(response.data.result);
      // setTextInputError('');
      // setTextInput("");
    }catch(error){
      setResult('');
      console.error('Error while submitting the form',error);
      // setTextInputError('Error while submitting the form try again',error);
      if (error.response){
        setTextInputError('Error while submitting the form',error);
      }else if(error.request){
        setTextInputError('There seems to be connection error,please check connection and try again');
      }else{
        setTextInputError('An error occured while processing your request');
      }
    }finally{
      setTextInput('');
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
          {textInputError && <div className='text-danger'>{textInputError}</div>}
      </Form> 
    </div> 
        
    </>
  )
}

export default App
