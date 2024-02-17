// import twilio from 'twilio'
import nodemailer from "nodemailer"

// export const sendSMS = async (to, message) => {
//     const accountSid = 'your_account_sid'; // Your Twilio Account SID
//     const authToken = 'your_auth_token'; // Your Twilio Auth Token
//     const twilioNumber = 'your_twilio_phone_number'; // Your Twilio Phone Number
  
//     const client = twilio(accountSid, authToken);
  
//     try {
//       await client.messages.create({
//         body: message,
//         from: twilioNumber,
//         to: to
//       });
//       console.log('SMS sent successfully.');
//     } catch (error) {
//       console.error('Error sending SMS:', error);
//     }
//   };

export const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  
  export const verificationMail = async (newUser) => {
    try {
      const info = transporter.sendMail({
        from: {
          name: "BrilloConnetz",
          address: process.env.MAIL_USER,
        },
        to: newUser.email,
        subject: "Verify Your Email Address",
        html: `<p> Hello ${newUser.userName}, Verify your eamil by clicking this link...</p><a href="${process.env.URL}/verify-email?emailToken=${newUser.emailToken}">Here.</a>`,
      });
      console.log("Verification email sent:");
    } catch (err) {
      console.error("Error sending verification email:");
    }
  };