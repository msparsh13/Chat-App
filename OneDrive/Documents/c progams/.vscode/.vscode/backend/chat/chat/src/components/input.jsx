import React, { useEffect, useRef, useState } from 'react'
import "./input.css"
import EmojiPicker, { Emoji } from 'emoji-picker-react'
import axios from 'axios'
import { faArrowRight, faFaceSmile, faIcons, faSmile, faXmark } from '@fortawesome/free-solid-svg-icons'
import { io } from 'socket.io-client'
import { styled } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  


export default function Input({user , friend  , isreply  , id , getmes , replybut}) {
    const [msg , setmsg] = useState("")
    const [vis , setvis ] = useState(false)
    const [Arr , setArr] = useState()
    const [reptext , setreptext] = useState("")


  const ref=  useRef()

   

    const sendchat = e =>{
e.preventDefault()
if(msg.length >0){

  handlesendMsg(msg) ;

 
  setmsg("") ;
}

    }






 const handleemoji = (event , emoji) =>{
 let message = msg ;
console.log(event.emoji)
 message = message + event.emoji
 setmsg(message)
 }





 ref.current = io("http://localhost:3000/");



 const handlesendMsg = async (message) =>{



    
  ref.current.emit("sendmsg" , {
    sender : user._id ,
    receiver:  friend._id , 
      message
 
   }) 

   console.log("hello")

  if(isreply){


  const res  = await axios.get(`http://localhost:3000/backend/getreply/${id}`)
  await axios.post(`http://localhost:3000/backend/sendmsg` , {
    sender :  user._id , 
    receiver : friend._id ,
    text: msg,
    isreply :true ,
    replyid : id ,
    replytxt : res.data.message.text
 
  }) }
  else{
    await axios.post(`http://localhost:3000/backend/sendmsg` , {
    sender :  user._id , 
    receiver : friend._id ,
    text: msg,
    isreply :false ,
 
  })}

if(user){

  
   const msgs = [...msg] ;
   msgs.push({fromSelf : true , text: message})
    setmsg(msgs)
  console.log(msgs)
  
}
getmes()
setmsg("")
 }


  const handlevis = e =>{
    setvis(!vis)
   
  }
 const rep =e =>{
  replybut()
 }


 useEffect(()=>{
   
  if(ref.current){
    console.log(ref.current)
    ref.current.on("msg-recieve" , (msg)=>{
      console.log("abc")
    setArr({fromSelf:false , message:msg})
     
     
    })
  }
 
}, [] )




  useEffect(()=>{
    Arr && setmsg((a)=>[...a , Arr ])
   getmes()
    
  } , [Arr]) 
  



   const enterchat = (e) =>{
    if(e.keyCode===13 && !e.shiftKey){
      sendchat(e)
    }
   }
  return (

    <>

    
    { vis===false ?  (null) :  ( <div className='emojipicker'><button onClick={(e)=>{handlevis(e)}} className='cancel'><FontAwesomeIcon icon={faXmark} color='blue' /></button><EmojiPicker  emojiStyle='twitter' searchPlaceHolder='serach for emoji' onEmojiClick={handleemoji}/></div> )
        }

        <div className='input'>
 {isreply ?(<div className='rep'>reply to {friend.username}  <button className='cross' onClick={e=>replybut()} color='white'> <FontAwesomeIcon icon={faXmark} color='black' /></button></div>) : (null)}
    <form className='messageform' onSubmit={(e)=>{sendchat(e)}}  onKeyDown={(e)=>{enterchat(e)}}>
   
        <textarea className='testarea' rows={"5"} placeholder='Enter Your Message here' value={msg} onChange={(e)=>{setmsg(e.target.value)}}>
      
        </textarea>
        <button className='emoji' onClick={e=> handlevis(e)}><FontAwesomeIcon icon={faFaceSmile} color='yellow' fontSize={30}/></button>
       
        
      
       
     
    </form>
    </div>
    </>
  )
}
