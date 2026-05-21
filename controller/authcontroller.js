


module.exports.signup_post = (req,res)=>{
    res.send("sign up successfully")
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

