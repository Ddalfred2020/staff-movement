
require("dotenv").config();


const api = require("./mailer");

async function sendEmail(to, subject, html) {

    try {

        const response = await api.post("/smtp/email", {

            sender: {

                name: process.env.EMAIL_FROM_NAME,

                email: process.env.EMAIL_FROM

            },

            to: [

                {

                    email: to

                }

            ],

            subject: subject,

            htmlContent: html

        });

        console.log("Email Sent");

        return response.data;

    }

    catch(err){

        console.log(err.response?.data || err.message);

    }

}

module.exports = sendEmail;