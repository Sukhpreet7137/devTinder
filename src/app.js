const express=require("express");

const app=express();

//request handler
app.use("/",(req,res)=>{
    res.send("Hello from the server!!")
})

app.use("/test",(req,res)=>{
    res.send("test from the server!!")
})

app.use("/hi",(req,res)=>{
    res.send("hi from the server!!")
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});