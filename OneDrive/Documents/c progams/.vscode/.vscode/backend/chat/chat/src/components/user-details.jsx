import React from 'react'

export default function Details({user}) {
  return (
    <div className='userdetails'>

<div className='user-img'>
        <img src={user.Profile}  alt={'abc'}></img>
        </div>
        <h2 className='username'>{user.username}</h2>
        <div className='aboutme'>
          <h5>About me</h5>
          <p className='aboutmetext'>{user.aboutme}</p>
          </div>
        

      </div>


  )
}
