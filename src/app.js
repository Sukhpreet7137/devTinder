const express = require("express");
const connectDB = require("./config/database");
const app = express();
const { adminAuth } = require("./middlewares/auth")
const User = require("./models/User");
const { default: mongoose } = require("mongoose");
//request handler
// app.use("/",(req,res)=>{
//     res.send("Hello from the server!!")
// })

// app.use("/test",(req,res)=>{
//     res.send("test from the server!!")
// })

// app.use("/hi",(req,res)=>{
//     res.send("hi from the server!!")
// })


// Http methods

// app.get("/test",(req,res)=>{
//     res.send({firstName:"John",lastName:"Doe"})
// })

// app.post("/test",(req,res)=>{
//     res.send("Data Saved Successfully")
// })


// app.post("/user",(req,res)=>{
//     console.log(req.query)
//     res.send("Data Saved Successfully")
// })

app.use(express.json());

app.post("/signup", async (req, res) => {
    const newUser = new User(req.body);
    try {
        await newUser.save();
        res.send("User created successfully")
    }
    catch (err) {
        console.log(err)
        res
            .status(500)
            .send("Internal server error"+err)
    }
})

app.get("/users",async(req,res)=>{
    try{
        const users=await User.find();
        res.send(users)
    }
    catch(err){
        res
            .status(500)
            .send("Internal server error")  
    }
})


app.get("/userById",async(req,res)=>{
    try{
        const users=await User.findById("67ae39ac8a5270bd1fb44972");
        res.send(users)
    }
    catch(err){
        res
            .status(500)
            .send("Internal server error")  
    }
})

//validate function is used to validate the data before saving it to the database but on update it not works by default we need to pass the option runValidators:true

// api level validation
// so we will not allow everything to update again lets say you can not update the email id userid once you used during signup
app.patch("/updateUser",async(req,res)=>{
    try{
        const ALLOWED_FIELDS=["firstName","lastName","password"]
        const isValidOperation=Object.keys(req.body).every((field)=>ALLOWED_FIELDS.includes(field));
        if(!isValidOperation){
            throw new Error("Invalid fields to update")
        }
        const user=await User.findOneAndUpdate({_id:"1234"},req.body,{new:false,upsert:true,runValidators:true});
        // console.log(user)
        res.send("User updated successfully")
    }
    catch(err){
        res
            .status(500)
            .send("Internal server error")  
    }
})

app.delete("/deleteUser",async(req,res)=>{
    try{
        const user=await User.findByIdAndDelete("67ae39ac8a5270bd1fb44972");
        res.send("User deleted successfully")
    }
    catch(err){
        res
            .status(500)
            .send("Internal server error")  
    }
})

app.put("/updateUserPut",async(req,res)=>{
    try{
        const userId = new mongoose.Types.ObjectId("64ae39ac8a5270bd1fb44969");
        const user=await User.findOneAndUpdate({_id:userId},req.body,{new:false});
        res.send("User updated successfully")
    }
    catch(err){
        console.log(err)
        res
            .status(500)
            .send("Internal server error")
    }
})
connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}
).catch((err) => {
    console.log("Error connecting to the database");
}
)



   
//route handlers and next()


// /test is called request path and (req,res,next)=>{} is called request handler we can have multiple request handlers for a single request path
// as soon as we send response from a particular request handler the next request handler will not be executed and we will get error as "Cannot set headers after they are sent to the client"
// to avoid this we can use next() function to pass the control
// we can wrap request handlers in array  


// app.use("/test",(req,res,next)=>{
//     console.log("response 1");
//     next();
// }
// ,
// (req,res,next)=>{
//     console.log("response 2");
//     res.send("Hello from the server!!")
//     next()
// }
// ,(req,res)=>{
//     console.log("hello")
//     next()
// }
// )

// if we add next in last request handler then it will throw error as there is no request handler to pass the control


//we can create them into multiple functions as well 

// app.get("/test",(req,res,next)=>{
//     console.log("response 1");
//     next();
// })
// app.get("/test",(req,res)=>{
//     console.log("response 2");
//     res.send("Hello from the server!!")
// })

// app.get("/test",
//     (req,res,next)=>{ 
//     console.log("hello")
//     next()
//     },
//     (req,res)=>{ 
//     console.log("hello")
//     res.send("Hello from the server!!") 
// })

//Middleware is a request handler or a funcntion that allows you to intercept and manipulate requests and responses before they reach route handlers.
//Middle wares are the functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.
// The next middleware function is commonly denoted by a variable named next.

//This is the use case of middle wares

// first we need validate the user is admin or not
// if user is admin then only he can access the admin routes
// we can create a middleware for this otherwise we need to check in each route handler for all methods
// app.use("/admin",adminAuth)

// app.get("/admin/userDetails",(req,res)=>{
//     res.send("User Details")  
// })

// app.get("/admin/deleteUser",(req,res)=>{
//     res.send("User Details")  
// })


// const URI = "mongodb+srv://dk9592630:Sukhpreet@cluster0.1ljiw5g.mongodb.net/";
