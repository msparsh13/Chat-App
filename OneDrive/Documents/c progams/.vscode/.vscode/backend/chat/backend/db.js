const mongoose = require("mongoose")

const URL = "mongodb+srv://sparshmahajan169:sparsh13@cluster0.x9ahicn.mongodb.net/"


const db = async() =>{
    try{
        await mongoose.connect(URL , {
        useNewUrlParser: true,
        useUnifiedTopology: true,})
        console.log("one with database")
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {db}