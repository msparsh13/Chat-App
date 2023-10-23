
import { Promise } from 'mongoose'
import React, { useState } from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Details from '../components/user-details'
import Frienddetails from '../components/frien-details'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import './userdetails.css'
export default function Userdetails() {

   
   
   const [msg , setmsg] = useState("")
   const [ChatUser,  setChatUser] = useState(undefined) ;
   const [postimg , setpostimg] = useState("")
 const navigate= useNavigate()

  




 const settinguser = async() =>{
  if(!localStorage.getItem("chat-user")){
   console.log("no user available")
  }
  else{
     setChatUser(await JSON.parse(localStorage.getItem("chat-user")))
   console.log("done")
  
   }
 
 }
  const handleSubmit = async(e) =>{
   
    try
    { e.preventDefault()
      if( postimg===""){
        setpostimg(ChatUser.Profile)
      }
     
     const  res =  await axios.post(`http://localhost:3000/backend/setimg/${ChatUser._id}` , {Aboutme : msg , Profile : postimg}) ;
    const u = await axios.get(`http://localhost:3000/backend/getone/${ChatUser._id}`)
     console.log(res)
    alert("changed")
   console.log(u.data)
   localStorage.removeItem('chat-item')
   localStorage.setItem('chat-user' , JSON.stringify(u.data)) ;
 
   
    setmsg("")

    navigate('/chat')
  

  }
    catch(err){
      console.log(err)
    }
   
    }
    
    useEffect(()=>{
      settinguser()
     
   
  } , []) 
  
 
  const handlefilupload= async(e) =>{
    if(!e.target.files[0]){
      return ;
    }
     const file = e.target.files[0]
     console.log(file)
     const base64 = await convttobase64(file)
     console.log(base64)
     setpostimg( base64)
  }



  function convttobase64(file){
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file);
        fileReader.onload =() =>{
            setpostimg(fileReader.result)
            console.log(fileReader.result)
        }
        fileReader.onerror = (err) =>{
          console.log(err)
        }
    }
  


  return ChatUser && (

    <div className='userdetails'>
  
    <form onSubmit={handleSubmit} className='inputform'>
   
      <h4>Your Profile</h4>
    <input type='file' name='file' className='file' onChange={handlefilupload}></input>
    <h4>About Me</h4>
    <textarea className='testarea' rows={"5"} placeholder='Enter Your About me' value={msg} onChange={(e)=>{setmsg(e.target.value)}}></textarea>
    <input type='submit'></input>
    
    </form>
    
    <div className="preview">
     <Frienddetails user={ChatUser} />
    </div>
    <button className='goback' onClick={()=>{navigate("/chat")}} color='white'><FontAwesomeIcon icon={faXmark} color='white'/></button>

    </div>
  )
}
