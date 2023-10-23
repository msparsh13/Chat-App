import React, { useContext, useEffect, useState  , useRef} from 'react'
import Input from './input'
import Messages from './messages'

import './chatcontainer.css'
import axios from "axios"; 

import { io } from 'socket.io-client';


export default function Container({user , friend , socket}) {

  


 
   const [msg , setmsg ] = useState([])
  
   const [isreply , setisreply ]  = useState(false)
 
  const [replyid , setreplyid] = useState()

  const ref = useRef()



  

  const getmessages = React.useCallback(async()=>{
    const res = await axios.post(`http://localhost:3000/backend/getmsg` , {
      sender : user._id ,
      receiver : friend._id ,
     }
   )
  
    setmsg(res.data)
    
   
    
  } , [] )



  useEffect(()=>{
    if(user){
     ref.current = io("http://localhost:3000")
     ref.current.emit("adduser" , user._id)
    }
  } , [user])



  
  useEffect(()=>{
   
    if(ref.current){
      console.log(ref.current)
      ref.current.on("msg-recieve" , (msg)=>{
      
         getmessages()
       
      })
    }
   
  }, [] )

  useEffect(() => {
    
    getmessages();
   
  },[getmessages]);



 const handleisreply = (e)=>{
 
   setisreply(!isreply)
   
  }

  

  function handlereplyid (id){
    setreplyid(id)
    console.log(id)
    console.log(replyid)
    
  }

  
  
 
  return (
    
   <>
    
 
      <div className='chat-message'>
        
        {msg.map((m)=>{ return <Messages key={m.id}  user={user}  friend={friend} data={m}  replybut={handleisreply} replyid={handlereplyid}  m_id={m.id} replytext={m.replytxt} isreply={m.isreply} id={m.replyid}></Messages>})}
        
        
       
      </div>
      
      
     <Input user={user}  friend={friend}  isreply={isreply}  id={replyid}  getmes={getmessages} replybut={handleisreply} socket={ref}/>
   
    </>)
   
  
}
