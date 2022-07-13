const jwt = require("jsonwebtoken")

const jwtsecret = "FSMovies2021"



module.exports = function (){
    return jwt.sign({},jwtsecret,{
        expiresIn:"30d"
    })
}