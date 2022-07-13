const jwt = require("jsonwebtoken");

const List = require("./model")

const jwtsecret = "FSMovies2021"
const protect = async(req,res,next)=>{
 let token;
 if(
     req.headers.authorization &&
     req.headers.authorization.startsWith("Bearer")
 ){
    try{
        
        token = req.headers.authorization.split(" ")[1];
        const  decoded = jwt.verify(token,jwtsecret)
        console.log(decoded)
        next();
    }catch(err){
        console.log(err)
    }
 }if(!token){
     console.log("not authorized, no token")
 }
 
}

module.exports =  protect 