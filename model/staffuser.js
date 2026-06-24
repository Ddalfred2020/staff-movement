const mongoose =require("mongoose")


const Schema = mongoose.Schema
const staffuserschema = new Schema({
    email:{
        type:String,
        reguire:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        minlength:6
    }
})

const STAFFUSER = mongoose.model('STAFFUSER',staffuserschema)

module.exports = STAFFUSER;