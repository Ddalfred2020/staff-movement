
require("dotenv").config();

const transporter=require("./mailer")

async function sendEmail(to,subject,message){

try{

await transporter.sendMail({

from:process.env.EMAIL_FROM,

to,

subject,

html:message

});

console.log("Email Sent Successfully");

}
catch(error){

console.log(error);

}

}

module.exports=sendEmail;