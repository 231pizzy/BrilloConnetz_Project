import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import crypto from "crypto"
import { forgotPasswordMail, sendSMS, verificationMail } from "../utils/notification.js";


export const signup = async (req, res, next) => {
  const { firstName, lastName, userName, phone, email, interests, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const OTP = Math.floor(10000 + Math.random() * 90000);

  // Check if email or phone already exists
  const existingUserWithEmail = await User.findOne({ email: email.toLowerCase() });
  const existingUserWithPhone = await User.findOne({ phone });

  if (existingUserWithEmail) {
    return res.status(400).json({ error: "Email already exists." });
  }

  if (existingUserWithPhone) {
    return res.status(400).json({ error: "Phone number already exists." });
  }

  const newUser = new User({
    firstName,
    lastName,
    userName,
    phone,
    OTP,
    emailToken: crypto.randomBytes(64).toString("hex"),
    recoveryToken: crypto.randomBytes(64).toString("hex"),
    email: email.toLowerCase(),
    interests,
    password: hashedPassword,
  });

  if (!firstName || !lastName || !userName || !phone || !email || !password)
    return res.status(400).json("All fields are required....");

  try {
    await newUser.save();

    verificationMail(newUser);

    const { password: pass, ...rest } = newUser._doc;
    res.status(201).json(rest);
  } catch (error) {
    next(error);
  }
};


export const verifyEmail = async (req, res, next) => {
  try {
    const emailToken = req.body.emailToken

    if(!emailToken) return res.status(400).json("Email token not found...")

    const user = await User.findOne({emailToken})

    if(user){
      user.emailToken = null;
      user.emailVerified = true;

      await user.save();

      // Send SMS with the saved token
      const message = `Your BrilloConnetz OTP verification code is: ${user.OTP}`;
      await sendSMS(user.phone, message);


      res.status(200).json({
        message: "Email verification successful. OTP sent to your phone number.",
        emailVerified : user.emailVerified ,
        emailToken: user.emailToken,
      });
    } else res.status(404).json("Email verification failed")

  } catch (error) {
    next(error);
  }
}

export const verifyOTP = async (req, res, next) => {
  try {
    const {OTP}= req.body

    if(!OTP) returnres.status(400).json("Invalid OTP Verification code...")

    const user = await User.findOne({OTP})

    if(user){
      user.status = true;

      await user.save();


      res.status(200).json({
        message: "OTP verification successful",
        otpstatus : user.status,
      });
    } else res.status(404).json("OTP verification failed")

  } catch (error) {
    next(error);
  }
}

export const signin = async (req, res, next) => {
  const { emailOrPhone, password } = req.body;
  try {
    //query to search for user by email or phone number
    const query = {
      $or: [
        { email: emailOrPhone.toLowerCase() },
        { phone: emailOrPhone }
      ]
    };

    // Find user by email or phone number
    const user = await User.findOne(query);

    // If user not found, return error
    if (!user) return next(errorHandler(404, "User not found"));

    // Validate password
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));

    // Check if email is verified
    if (!user.emailVerified) {
      // If email is not verified, send verification email
      await verificationMail(user);
      return next(errorHandler(401, "Email not verified. Verification email sent."));
    
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Omit password from user object
    const { password: pass, ...rest } = user._doc;

    // Set token as cookie
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  const { email} = req.body;
  try {
   
    // Find user by email or phone number
    const user = await User.findOne({ email: email.toLowerCase() });

    // If user not found, return error
    if (!user) return next(errorHandler(404, "User not found"));
     
    forgotPasswordMail(user)

    res.status(200).json({
      message: "Password recovery link has being sent to your email"
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { recoveryToken, password } = req.body;

    // Check if recovery token and password are provided
    if (!recoveryToken || !password) {
      return res.status(400).json("Recovery token or password not provided");
    }

    // Find user by recovery token
    const user = await User.findOne({ recoveryToken });

    // If user not found, return appropriate error response
    if (!user) {
      return res.status(404).json("User not found with the provided recovery token");
    }

    // Hash the new password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Update user's password
    user.password = hashedPassword;

    // Reset recovery token to a new value
    user.recoveryToken = crypto.randomBytes(64).toString("hex");

    // Save the updated user
    await user.save();

    // Respond with success message
    res.status(200).json("Password reset successful");

  } catch (error) {
    // Pass the error to the error handler middleware
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account!"));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const resendOtp = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Check if userId is undefined
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Find user by userId
    const user = await User.findOne({ _id: userId });
    console.log(user)

    if (!user) return next(errorHandler(404, "User not found"));


    if (user.status) return next(errorHandler(404, "Account already verified, sign in"));
  

    // Send OTP via SMS
    const message = `Your BrilloConnetz OTP verification code is: ${user.OTP}`;
    await sendSMS(user.phone, message);

    return res.status(200).json({ message: 'OTP resent successfully' });
  } catch (error) {
    next(error);
  }
};
