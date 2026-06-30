const mongoose =require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const{isEmail} = require("validator")

const Schema = mongoose.Schema
const staffuserschema = new Schema({
    email:{
        type:String,
        require:[true,"Please enter an email address"],
        lowercase:true,
        unique:true,
        validate:[isEmail,"Please enter a valid email"]
    
    },
    password:{
        type:String,
        require:[true,"Please enter a password"],
        minlength:[6,"Minimum password must be six characters long"]
    }
})

staffuserschema.pre("save", async function(){
const salt = await bcrypt.genSalt()
 this.password = await bcrypt.hash(this.password,salt)

})

staffuserschema.statics.login =  async function(email,password){
     const user = await this.findOne({email})
     if(user){
       const auth = await bcrypt.compare(password, user.password)
       if(auth){
          return user
       }
       throw Error("This password is incorrect")
     }
     throw  Error("This email is incorrect");
     
}

const STAFFUSER = mongoose.model('STAFFUSER',staffuserschema)

module.exports = STAFFUSER;