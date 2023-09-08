const Usermodel = require("../models/user.model");
const nodemailer = require("nodemailer");

// exports.generateAndSendOTP = async (email) => {

//     const OTP = Math.floor(100000 + Math.random() * 900000);

//     sendmailregistraion(email, OTP)
//     const user = await Usermodel.findOneAndUpdate(
//         { email: email },
//         { OTP: OTP },
//         { new: true }
//     );

//     return true;
// };

exports.sendmailregistraion = (email, OTP) => {
    const transporter = nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525, // Your Mailtrap.io port may be different, check your Mailtrap.io inbox settings
        auth: {
            user: 'e2a2b1e525b73e',
            pass: 'dfa00d883416b2',
        },
    });

    // Generate OTP and user-specific information
    //const otp = generateOTP(); // Replace with your OTP generation logic
    const userEmail = email; // Replace with the user's email address

    // Compose the email
    const mailOptions = {
        from: 'sachin@gmail.com', // Replace with your sending email address
        to: userEmail,
        subject: 'Your OTP for Registration',
        text: `Your OTP is: ${OTP}`,
        // You can also include an HTML version for a formatted email
        // html: `<p>Your OTP is: ${otp}</p>`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending OTP email:', error);
        } else {
            console.log('OTP email sent successfully:', info.response);

        }
    });
}


exports.GenerateOtp = () => {

    const otp = Math.floor(10000 + Math.random() * 900000);
    let expiry = new Date()
    expiry.setTime(new Date().getTime() + (30 * 60 * 1000));

    return { otp, expiry };
}