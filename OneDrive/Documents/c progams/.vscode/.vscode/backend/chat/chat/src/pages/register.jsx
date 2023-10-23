import React from "react";
import { useState , useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'axios'
import axios from "axios";
import './register.css'
import { Link, useNavigate } from "react-router-dom";

import img from '../pages/assets/keyboard_laptop_gradient_203739_800x1200.jpg'
function Register(){
  const navigate = useNavigate()
 

   
    const [state , setState] = useState({

        username:"",
        Email : "" ,
        password : "",
        Confirm_password : ""

})



const toastoptions = {
    position: "bottom-right" ,
    autoClose : 8000 ,
    pauseOnHover : true,
    draggable : true ,
    theme : "dark" ,
   }
   const {password , Confirm_password , Email , username} = state ;


const handleValid= (data) =>{

  if(data.password.length<8){
    toast.error("Password should be atleast 8 digit")
    return false
  }

   
   if(data.password !== Confirm_password){
 toast.error("password should be same as Confirm Password")
 return false
   }
   return true
}
  




  const handleSubmit =  async (event) =>{
    event.preventDefault()
    if(handleValid(state) && state.Email.endsWith("@gmail.com")){
         const {data} = await axios.post(`http://localhost:3000/backend/register` , state)
         
        
         console.log(data.User)
         if(data.status===false){
        toast.error(data.msg , toastoptions)
         }
         if(data.status ===true ){
          localStorage.setItem('chat-user' , JSON.stringify(data.User)) ;
          console.log("done")
          navigate("/chat") 
         }
    }
   
    else{
      setState({
        password : '',
        Confirm_password : ''
      })
    }
  }
    

  const handleChange  = (e) =>{
  setState({...state , [e.target.name]:e.target.value})
  }

  useEffect(()=>{

    if(localStorage.getItem('user') ){
        navigate('/chat')
    }
} , [handleSubmit])

  return (
  <>
    <ToastContainer/>
    <div className="registerpage">
    <img src={img} className="side" />

    <form className={'registerform'} onSubmit={(e)=>{handleSubmit(e)}} >
      <h1 className="heading">Sign Up</h1>
  <input type="text"
  value={username}
   placeholder="username"
    name="username" 
    onChange={(e)=>handleChange(e)} />


<input type="email"
value={Email}
   placeholder="Email"
    name="Email" 
    onChange={(e)=>handleChange(e)}
     />

<input type="password"
value={password}
   placeholder="password"
    name="password" 
    autoComplete="new-password"
    onChange={(e)=>handleChange(e)} />


<input type="password"
value={Confirm_password}
   placeholder=" Confirm password"
    name="Confirm_password" 
    autoComplete="new-password"
    onChange={(e)=>handleChange(e)} />
    

<input type="submit"></input>



    
 <Link to={"/login"} className="login">already have an account? </Link>
    

        </form>
    </div>
    </>
  )
}

export default Register