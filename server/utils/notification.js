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
        html: `<p> Hello ${newUser.userName},Welcome to BrilloConnetz. Verify your email by clicking this link...</p><a href="${process.env.URL}/verify-email?emailToken=${newUser.emailToken}">CLICK HERE.</a>`,
      });
      console.log("Verification email sent:");
    } catch (err) {
      console.error("Error sending verification email:");
    }
  };