import React, { useState } from 'react'
import './message.css'
import { useRef , useEffect } from 'react'
import { io } from 'socket.io-client'
import { faIcons, faReply, faTurnDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function Messages({user , friend , scroll , data  , isreply , replyid , m_id  , replytext , replybut , id }) {
  

  const [reply , setreply] = useState(undefined)

  console.log(data)

  console.log(replytext)
  
  const divRef = useRef(null);
   const rep =() =>{
     
     replybut()
     if(replybut){
     
    replyid(m_id) }

    else{
      replyid(null)
    }
    
     
   }

   
  const divref = useRef()

  
   useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  } , []);


  const handleClickScroll=()=>  {
    const element = document.getElementById(`${id}`);
    
    if (element) {
     
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
   
  return (
    <>
  
         

    <div className='mesage' >
   
      
      <div className={`messages ${data.fromSelf ? "sended" : "recieved"}` } id={`${m_id}`}>

     
       
      <img src={data.fromSelf ? ( user.Profile.toString()):(friend.Profile.toString()) } alt='abc' className='pfps'></img>
      <div>
      { isreply ? (<div ><p  className='toreply' id={`#${replyid}`} onClick={handleClickScroll}>{replytext}</p></div>):(null)}
       <div className={`mes ${data.fromSelf ? "sended" : "recieved"} `}>
 
         <p className='text'>{data.message}</p>
         <button onClick={rep} className='reply'> <FontAwesomeIcon icon={faReply} color='blue' /></button>
      </div>
      </div>
 </div>
 <div ref={divRef} />
 </div> 
    
    
    
    </> 
  )
}
 