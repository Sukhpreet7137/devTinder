// Schema basically defines what all things user can have
// Schema is used to define the structure of the document

// Schema is mapped to a MongoDB collection and defines the shape of the documents within that collection

const mongoose = require("mongoose");
const validtor=require("validator");
//schema level validation
const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:5
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true,

        validate(value){
            if(!validtor.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }   
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            return !["male","female","others"].includes(value)
        }
    },
    about:{
        type:String,
        default:"Hello I am Mern stack developer"
    }
},{timestamps:true})


//THIS IS STRUCUTRE OF THE USER COLLECTION

const userModal=mongoose.model("User",userSchema); //User is the name of the collection and userSchema is the structure of the collection   

module.exports=userModal; //exporting the userModal so that we can use it in other files