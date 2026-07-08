const mongoose = require("mongoose")



const Schema = mongoose.Schema

const notificationSchema = new Schema({
    message:{
        type:String,
        required:true
    },
    read:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const  NOTIFICATION = mongoose.model("NOTIFICATION",notificationSchema)

module.exports = NOTIFICATION