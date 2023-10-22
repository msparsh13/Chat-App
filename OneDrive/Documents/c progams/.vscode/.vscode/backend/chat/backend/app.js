const express = require('express')
const cors = require("cors") 
const mongoose = require("mongoose")
const {db} = require('./db')
const userRoutes = require("./userRoutes")
const socket = require("socket.io")

const app = express()
require("dotenv").config()

app.use(cors()) ;
app.use(express.json())
const PORT = 3000
const server = app.listen(PORT  , ()=>{
  console.log("one with the server")
})
 app.use("/backend" , userRoutes)



 const io = socket(server , {
  cors:{
    origin: "http://localhost:3001" ,
    credential : true ,

  }
 })


 global.onlineUsers = new Map()

console.log(global.onlineUsers)

 
io.on("connect" , (socket) =>{
  global.chatSocket  = socket ;


  socket.on("adduser" , (userId)=>{
    global.onlineUsers.set(userId , socket.id)
   
    console.log("hello")
  })
  console.log(onlineUsers)


  socket.on("sendmsg" , (data)=>{
   
    console.log(onlineUsers)
    const sendsocket = onlineUsers.get(data.receiver) ;
   
    if(sendsocket){
      
      socket.to(sendsocket).emit("msg-recieve" , data.message)
      
    }
  }) 
 
})


  






db()
