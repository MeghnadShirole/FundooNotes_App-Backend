import nodemailer from 'nodemailer';

export const sendEMail = (url, email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
    });

    const mailOptions = {
        from: process.env.EMAIL, // sender address
        to: email, // receiver's address  
        subject: 'FundooNotes Reset Password Link', // Subject line
        text: 'Hello from FundooNotes\n\n Your Reset Password link is:\n\n' + url //url for reset password
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err)
                return reject('error while sending mail==> ', err);
            else
                return resolve('result on sending mail==> ', info);
        });
    });
}

//for registration
export const registration = (data) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
    });

    const registerMail = {
        from: process.env.EMAIL, // sender address
        to: data.email, // receiver's address  
        subject: 'FundooNotes Registration', // Subject line
        text: `Hello ${data.firstname},
        Welcome to FundooNotes 
        Your Registration was succesfully completed 
        Your Details are
        ${JSON.stringify(data)}`
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(registerMail, (err, info) => {
            if (err)
                return reject('error while sending mail==> ', err);
            else
                return resolve('result on sending mail==> ', info);
        });
    })
}