const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'amparo.frontend@gmail.com',
        pass: 'Oboehtml5.'
    }
});
module.exports = transporter;