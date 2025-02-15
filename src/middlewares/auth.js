const adminAuth = (req,res,next)=>{
    const pass="123";
    const isAdmin=pass==="123";
    if(isAdmin)
        next();
    else res.status(401).send("Unauthorized")
}
module.exports={adminAuth}