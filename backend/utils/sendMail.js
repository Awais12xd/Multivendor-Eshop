import nodemailer from "nodemailer"

const sendMail = async(options) => {
    const transporter = nodemailer.createTransport({
        host:process.env.SMPT_HOST,
        port:process.env.SMPT_PORT,
        service:process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD
        }

    })
    const mailOptions = {
        from:process.env.SMTP_MAIL,
        to:options.to,
        subject:options.subject,
        text:options.message
    };
    await transporter.sendMail(mailOptions);
}

export {sendMail}