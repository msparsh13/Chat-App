import React from 'react'
import './welcome.css'
export default function Welcome({user}) {
    console.log(user.username)
  return (
    <div className='welcome'>
      <h1 className='welcometext'>
       
        Welcome  {user.username}
      
</h1>
    </div>
  )
}
