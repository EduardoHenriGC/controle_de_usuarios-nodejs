const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.GOOGLE_CLIENT_USER,
        pass: process.env.GOOGLE_CLIENT_PASSWORD,
    },
});

module.exports = transporter;
