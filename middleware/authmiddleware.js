
const jwt = require("jsonwebtoken")
const STAFFUSER = require("../model/staffuser")
require("dotenv").config()


const requireAuth = (req,res,next)=>{
  const token = req.cookies.jwt

  if(token){
    jwt.verify(token,process.env.JWT_SECRET,(err,decodedToken)=>{
       if(err){
        console.log(err.message)
        res.redirect("/login")
       }else{
        console.log(decodedToken)
        next()
       }
    })
  }else{
    res.redirect("/login")
    
  }

}


const checkUser = (req, res, next)=>{
  const token = req.cookies.jwt

  if(token){
    jwt.verify(token,process.env.JWT_SECRET, async (err,decodedToken)=>{
       if(err){
        console.log(err.message)
        res.locals.staffuser = null
        next()
       }else{
        console.log(decodedToken)
        let staffuser =await STAFFUSER.findById(decodedToken.id)
        res.locals.staffuser = staffuser
        next()
       }
    })
  }else{
     res.locals.staffuser = null
    next()
  }

}
module.exports = {requireAuth,checkUser}