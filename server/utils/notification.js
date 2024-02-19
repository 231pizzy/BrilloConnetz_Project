import twilio from 'twilio'
import nodemailer from "nodemailer"
import dotenv from "dotenv";

dotenv.config();
export const sendSMS = async (to, message) => {
    const accountSid = process.env.TWILIO_ACCOUNT; // Your Twilio Account SID
    const authToken = process.env.AUTH_TOKEN; // Your Twilio Auth Token
    const twilioNumber = process.env.TWILIO_NUMBER; // Your Twilio Phone Number
  
    const client = twilio(accountSid, authToken);
  
    try {
      await client.messages.create({
        body: message,
        from: twilioNumber,
        to: to
      });
      console.log('SMS sent successfully.');
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  };

export const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  
  export const verificationMail = async (newUser) => {
    try {
      transporter.sendMail({
        from: '"BrilloConnetz" <dev-obiora@outlook.com>',
        to: newUser.email,
        subject: "Verify Your Email Address",
        html: `<p> Hi ${newUser.userName},</p>
        <P>Welcome to BrilloConnetz</p>
        <p>Please click the link below to verify your email</p>
   <a href="${process.env.URL}/verify-email?emailToken=${newUser.emailToken}">CLICK HERE.</a>`,
      });
      console.log("Verification email sent:");
    } catch (err) {
      console.error("Error sending verification email:");
    }
  };


  export const forgotPasswordMail = async (user) => {
    try {
      transporter.sendMail({
        from: '"BrilloConnetz" <dev-obiora@outlook.com>',
        to: user.email,
        subject: "Forgot password",
        html: `<p> Hi ${user.userName},</p>
             <P>Forgot your password?</p>
             <p>We received a request to reset the password for your account.</p>
             <p>To reset your password</p>
        <a href="${process.env.URL}/reset-password?recoveryToken=${user.recoveryToken}">CLICK HERE.</a>`,
      });
      console.log("Verification email sent:");
    } catch (err) {
      console.error("Error sending verification email:");
    }
  };