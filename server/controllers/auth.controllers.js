import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import crypto from "crypto"
import { sendSMS, verificationMail } from "../utils/notification.js";
// import validator from "validator";

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

    if(!emailToken) returnres.status(400).json("Email token not found...")

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
  const { email, password } = req.body;
  try {
    const normalizedEmail = email.toLowerCase();
    const validUser = await User.findOne({ email: normalizedEmail });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
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
          // firstName: req.body.firstName,
          // lastName: req.body.lastName,
          // company: req.body.company,
          // phone: req.body.phone,
          // userName: req.body.userName,
          // email: req.body.email,
          password: req.body.password,
          // avatar: req.body.avatar,
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

export const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only view your own listings!"));
  }
};
