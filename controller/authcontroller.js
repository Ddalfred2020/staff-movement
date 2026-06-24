
const STAFFUSER = require("../model/staffuser")
const jwt = require("jsonwebtoken")


module.exports.signup_post = async(req,res)=>{

 const {email,password} = req.body;

    try{
      const staffuser = await STAFFUSER.create({email,password})
      console.log(staffuser)

      res.status(201).json(staffuser)

    }catch(err){
        

      console.log(err)

      res.status(401).send("could not create databse")
    }
}

module.exports.signup_get = (req,res)=>{

  res.render("signup",{title:"This is the signup page"})  

}

module.exports.login_get = (req,res)=>{
 res.render("login",{title:"This is the signup page"})
}

module.exports.login_post = (req,res)=>{
    res.send("log in successfully")
  
}

module.exports.logout_get = (req,res)=>{

        
   res.send("log out")
}

