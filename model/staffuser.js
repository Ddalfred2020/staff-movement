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

const STAFFUSER = mongoose.model('STAFFUSER',staffuserschema)

module.exports = STAFFUSER;