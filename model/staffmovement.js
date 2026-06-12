

const mongoose = require("mongoose")


const Schema = mongoose.Schema
const staffmovementschema = new Schema({
    staffname:{
       type:String,
       required:true
    },
    destination:{
       type:String,
       required:true
    },
     purpose:{
       type:String,
       required:true
    },
    department:{
       type:String,
       required:true
    },
     authorization:{
         type:String,
         required:true
    },
    possiblereturn:{
        type:String,
        required:true
    },
     timeout:{
        type:String,
        required:true
    },
    timein:{
        type:String,
        required:true
    }
},{timestamps:true})

const STAFFMOVEMENT = mongoose.model("STAFFMOVEMENT",staffmovementschema)

module.exports = STAFFMOVEMENT