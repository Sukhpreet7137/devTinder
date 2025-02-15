const mongoose=require("mongoose");

// this function is used to connect to the CLUSTER
// const connectDB=async()=>{
//     await mongoose.connect("mongodb+srv://dk9592630:Sukhpreet@cluster0.1ljiw5g.mongodb.net/");
// }


//By this function we are creating a database named devTinder in the cluster
const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://dk9592630:Sukhpreet@cluster0.1ljiw5g.mongodb.net/devTinder");
}

module.exports=connectDB;