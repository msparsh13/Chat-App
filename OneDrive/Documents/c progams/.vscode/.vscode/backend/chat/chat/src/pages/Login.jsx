import React, { useEffect } from "react";
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'axios'
import axios from "axios";
import './login.css'
import { Link, useNavigate } from "react-router-dom";
import img from '../pages/assets/keyboard_laptop_gradient_203739_800x1200.jpg'
function Login(){
    



 const navigate = useNavigate()
   /* useEffect(()=>{

        if(localStorage.getItem('user') ){
            navigate('/chat')
        }
    } , [navigate]) */



    const [loginstate , setloginState] = useState({

        username:"",
        password :""
      

})
const {password ,  username} = loginstate;


const toastoptions = {
    position: "bottom-right" ,
    autoClose : 8000 ,
    pauseOnHover : true,
    draggable : true ,
    theme : "dark" ,
   }


const handleValid= () =>{


 
   if(password===""){
    toast.error("password is required" , toastoptions)
  
   }
   if(username===""){
    toast.error("username is neccessary" , toastoptions)
   }
   
}



  const handleSubmit =  async (event) =>{
  
    event.preventDefault()
    if(handleValid){
      console.log(username)
      console.log(password)
      console.log(loginstate)
         const {data} = await axios.post(`http://localhost:3000/backend/login` , loginstate)

      console.log(data)
         if(data.status===false){
          console.log("not done")
        toast.error(data.msg , toastoptions)
         }
         if(data.status ===true ){
          console.log("submited")
          localStorage.setItem('chat-user' , JSON.stringify(data.User_details)) ;
         navigate("/chat")
         }
    }
   
    else{
      return false 
    }
  }


    

  const handleChange  = (e) =>{
  setloginState({...loginstate , [e.target.name]:e.target.value})
  }

  const isempty = (word) => {
    if(word.length === 0){
      return false ;
    }
    else{
      return true ;
    }
  };

  return (
  
   
  
    <div className="loginpage">
     
      <img className="side" src={img}></img>
     <ToastContainer/>
    <form  className="loginform" onSubmit={(e)=>{handleSubmit(e)}} >
    <h1 className="heading">Login</h1>
    <input type="text"
  value={username}
   placeholder="username"
    name="username" 
    onChange={(e)=>handleChange(e)} />



<input type="password"
value={password}
   placeholder="password"
    name="password" 
    autoComplete="new-password"
    onChange={(e)=>handleChange(e)} />


<input type="submit"></input>
       

        <Link to={'/'}>
            Dont Have Account?
         
        </Link>
        </form>
        <ToastContainer />
    </div>
 
  )
}

export default Login


