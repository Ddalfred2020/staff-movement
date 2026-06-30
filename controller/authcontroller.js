
const STAFFUSER = require("../model/staffuser")
const jwt = require("jsonwebtoken")




const handleError = (err)=>{
  console.log(err.message,err.code)

  let errors = {email: '', password: ''}
  if(err.message === "This email is incorrect"){
    errors.email = "Please enter the correct email address"
  }

  if(err.message === "This password is incorrect"){
    errors.password = "Please enter the correct email address"
    
  }

  if(err.code === 11000){
    errors.email = 'This email already exist'
    return errors
  }

  if(err.message.includes("STAFFUSER validation failed")){
      Object.values(err.errors).forEach(({properties})=> {
     errors[properties.path] = properties.message
 })

  }
    return errors;
}

const maxAge = 3*24*60*60

const createToken = (id)=>{
  return jwt.sign({id},"my honest durator",{expiresIn:maxAge})
}

module.exports.signup_post = async(req,res)=>{

 const {email,password} = req.body;

    try{
      const staffuser = await STAFFUSER.create({email,password})
      console.log(staffuser)
      const token = createToken(staffuser._id)
      res.cookie('jwt',token,
        {maxAge:maxAge*1000,
          httpOnly:true})
      res.status(201).json({staffuser:staffuser._id})

    }catch(err){
       const errors = handleError(err)
       console.log(err)

      res.status(401).json({errors})
    }
}

module.exports.signup_get = (req,res)=>{

  res.render("signup",{title:"This is the signup page"})  

}

module.exports.login_get = (req,res)=>{
 res.render("login",{title:"This is the signup page"})
}

module.exports.login_post = async (req,res)=>{
    const {email,password} = req.body;

    try{
      const staffuser = await STAFFUSER.login(email,password)
      console.log(staffuser)
      const token = createToken(staffuser._id)
      res.cookie('jwt',token,
        {maxAge:maxAge*1000,
          httpOnly:true})
      res.status(201).json({staffuser:staffuser._id})

    }catch(err){
       const errors = handleError(err)
       console.log(err)

      res.status(401).json({errors})
    }
  
}

module.exports.logout_get = (req,res)=>{
 res.cookie('jwt',
  '',
  {maxAge:1,
    httpOnly:true})
        
   res.redirect("/")
}

