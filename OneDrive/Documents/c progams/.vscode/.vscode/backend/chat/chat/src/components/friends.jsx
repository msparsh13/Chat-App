import React, { useEffect, useState } from 'react'
import './friends.css'
import { styled } from 'styled-components';

export default function Friends({contacts ,changechat}) {
   
    const [userName , setuserName] = useState(undefined)
   
   const [selected , setSelected] = useState(undefined)

  

 




  const  setuser = async() =>{
    const data = await JSON.parse(
        localStorage.getItem("chat-user")
      );
      setuserName(data.username);}
  
 
   useEffect(()=>{ setuser()}, [])


const changecurrchat = (index , contact) =>{
     setSelected(index) 
     changechat(contact)
}






const Friends = styled.div`
background : white ;
maxHeight :  100vh ;
display : flex ;

border-radius : 30px ;
margin : 0 ;
`
   
  return (
    <Friends>
        
        {userName && (
            <>
              

                <div className='Friend-list'>
                    { contacts ? (
                        contacts.map((contact , index)=>{
                            return(
                                <div className={`contact ${index===selected ? "selected" :"" }`} key={index} onClick={()=>changecurrchat(index , contact )}>
                                    
                                   
                                    
                                       <img src={contact.Profile} alt='avatar' className='avatar' height={50} width={50} ></img>
                                       

                                   
                                    <div className='username'>
                                   
                                        <h3>{contact.username}</h3>
                                        </div>

                                    </div>
                            )
                        })):(null)
                    }
                </div>
              
            </>
        )}
        </Friends>
  )
}
