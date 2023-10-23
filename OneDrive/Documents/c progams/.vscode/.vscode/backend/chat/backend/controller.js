const user = require("./schema")
const bcrypt = require("bcrypt")
const message = require("./messageschema");

module.exports.register = async(req , res ,  next)=>{
try{
   const {username , Email , password } =  req.body ;
    
    const usernamecheck =  await user.findOne({username});
        if(usernamecheck){
            return res.json({msg: "Username already used" , status : false})
        }
    


    const emailcheck =  await user.findOne({Email})
        if(emailcheck){
             res.json({msg: "Email already used" , status : false})
        }
      

    const hashedpass =  await bcrypt.hash(password , 10) 

    const User =  await user.create({
        username ,
        Email ,
        password  : hashedpass ,
    }) ;
      
  console.log(User) ;

    delete User.password 
    
    
    console.log(req.body)
    res.json({status : true , User})
   }
    catch(err){
        console.log(err)
    }
}






module.exports.login = async(req , res ,  next)=>{
    try{
       const {password , username} =  req.body ;

    
        const User_details=  await user.findOne({username});

            if(!User_details){
                return res.json({msg: "Incorrect Username" , status : false})
            }
        
    
            const passwordcheck =  await bcrypt.compare(password , User_details.password)
            if(!passwordcheck){
                return res.json({msg: "Incorrect Username or  password" , status : false})
            }
              delete username.password
        
      
        console.log(req.body)
        res.json({status : true , User_details})
       }
        catch(err){
            console.log(err)
        }
    }










    module.exports.addmsg = async(req , res , next) =>{
        try{
               const {sender , receiver , text , isreply , replyid , replytxt} = req.body  ;

               const msg  = await message.create({
                message :{text: text} ,
                users : [sender , receiver] ,
                sender : sender  ,
                receiver : receiver ,
                isreply : isreply ,
                replyid : replyid ,
                replytext : replytxt 
               })
       if(msg) { 
         return res.json({msg : "sent to db"}) }
       else return res.json({msg : "failed"})
        }catch(err){
            console.log(err)
        }
        getmsg() ;
    }



module.exports.getmsg = async(req , res , next) =>{
    try{
           const {sender , receiver} = req.body ;
           const messages = await message.find({
            users:{
                $all : [sender , receiver] ,
            } ,  
           }).sort({updateAt : 1 })


           const mapmsg = messages.map((msg)=>{
            return{
                fromSelf : msg.sender.toString() === sender ,
                message : msg.message.text ,
                sender : msg.sender , 
                id : msg.id ,
                isreply : msg.isreply ,
                replyid : msg.replyid ,
                replytxt : msg.replytext 
            }
           })
           res.json(mapmsg)
          
        
    }
    catch(err){
        res.json({msg : err})
    }
}




  module.exports.getmessage = async(req , res) =>
{
    try {
        const msg = await message.findById(req.params.id)
         res.json(msg)
         return msg.message.text
    }
    catch(err){
        res.json(err)
    }
}




    module.exports.allusers = async (req , res) =>{
        try{
            const all = await user.find({_id:{$ne:req.params.id}}).select([
                'email' , 'username' , 'Profile' , '_id' , 'Aboutme'
            ]) ;
            res.json(all)
        }
        catch(err){
                res.json(err)
        }
    }


    module.exports.setimg = async(req , res) =>{
        try{
            var img = req.body.Profile ;
            var aboutme = req.body.Aboutme
            console.log(aboutme)
           var i = req.params.id
           var u = await user.findByIdAndUpdate(i ,{Aboutme:aboutme , Profile:img} )

           res.json({msg : "set"})
        }catch(err){
            console.log(err)
        }
    }
  module.exports.allusersfind = async(req , res)=>{
  
       const a =  await user.find().select([
        'email' , 'username' , 'Profile' , '_id'
    ])
       res.json(a)
    
  }

  module.exports.findone = async(req , res)=>{
   const u =  await user.findById(req.params.id)
    res.json(u)
  }