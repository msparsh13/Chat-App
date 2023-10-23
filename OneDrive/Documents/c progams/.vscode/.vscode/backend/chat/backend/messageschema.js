const mongoose = require('mongoose')

const messageschema = new mongoose.Schema({
    message :{
      text:{
        type: String ,
        required: true
      } ,
    },
      users : Array ,
      sender:{
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'User' ,
        required: true 
      } ,
      isreply:{
        type: Boolean ,
       default : false ,
        required : true 

      } ,
     replyid :{
         type :  String ,
         required : false ,
         
     } , 
     replytext :{
         type : String  ,
         required : false,
         
     }
      
    },
   {
    timestamps: true ,
   }


   
) ;
module.exports = mongoose.model("Messages" , messageschema)