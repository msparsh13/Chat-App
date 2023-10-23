import React, { useEffect, useState , useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Friends from '../components/friends';
import styled from 'styled-components'
import axios from 'axios';
import Container from '../components/chatcontainer';
import './chat.css'
import Frienddetails from '../components/frien-details';
import {io} from 'socket.io-client'
import Welcome from './welcome';


export default function Chat() {


    const navigate = useNavigate()
   

    const [friend , setfriends] = useState([]) ;
    const [ChatUser,  setChatUser] = useState(undefined) ;
     const [chat , setchat] = useState(undefined)


     const settinguser = async() =>{
       if(!localStorage.getItem("chat-user")){
        console.log("no user available")
       }
       else{
      setChatUser(await JSON.parse(localStorage.getItem("chat-user")))
        console.log("done")
    
       }
     
     }

     useEffect(()=>{
        settinguser()
     
    } , []) 


     const getfriends = async(user) =>{
       if(user){
        const {data} = await axios.get(`http://localhost:3000/backend//alluser/${user._id}`)
        console.log(data)
        setfriends(data)
      console.log(friend)
      
       } 
     }
  
   
    useEffect( ()=>{
        if(ChatUser){
            getfriends(ChatUser)
    }
  } , [ChatUser])

     
  const ref = useRef()
  useEffect(() => {
    if (ChatUser) {
      ref.current = io("http://localhost:3000/");
      ref.current.emit("adduser", ChatUser._id);
     
    }
  }, [ChatUser]);
  

  
 
  
  console.log(ChatUser)

    const handlechatchange =(chat) => {
      setchat(chat)
      console.log(chat)
    } 
        
    const Chat = styled.div`
    background : black ;
     display : grid ;
     height : 100vh ;
     width : 100vw ;
     margin : 0 ;
     grid-template-columns:13vw 65vw auto;
     grid-template-rows: 100px auto auto ;
     column-gap : 20px ;


     .selected{
      background :  #121212,
     }
  
   `
  
   
   
 
       return (
    
        <Chat>
         { ChatUser && 
          ( <>  
          <div className='brand'>
          
            {chat && (
              <>
                 
                    </>)}
                </div>
        <div className='friendlist'>
          <Friends contacts={friend} changechat={handlechatchange}/>

          <div className='curr-user'>
                <div className='avatar'>
                <Link to={"/userdetails"} state={ChatUser}>
                <img src={ChatUser.Profile.toString()} height={100} width={100} className='usrimg' alt='avatar'></img>
                </Link>
                </div>
                </div>
        </div>

       <div className='chat-container'>
        {chat===undefined ? (<Welcome user={ChatUser}/>) : (   <Container user={ChatUser} friend={chat} />)}
     
      
       </div>
       <div className="frienddetails"> {chat===undefined ? (null) : (<Frienddetails user={chat}></Frienddetails>)}</div>
       </> )
        }
       </Chat>
   
  
  )




  
  
}


