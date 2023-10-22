import React from 'react'
import './frien-details.css'
export default function Frienddetails({user}) {

  console.log(user)
  return (
    <div className='details'>
           
        <img className={'user-img'} src={user.Profile.toString()}  height={100} width={100}  alt={'bcd'}></img>
       
        <h2 className='username'>{user.username}</h2>
        <div className='aboutme'>
          <h5>About me</h5>
         
          <p className='aboutmetext' color='white'>{user.Aboutme}</p>
          </div>
        

   
 
    </div>
  )
}
