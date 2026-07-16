
require("dotenv").config();


// config/mailer.js

const axios = require("axios");

const api = axios.create({

    baseURL: "https://api.brevo.com/v3",

    headers: {

        "api-key": process.env.BREVO_API_KEY,

        "Content-Type": "application/json",

        "Accept": "application/json"

    }

});

module.exports = api;