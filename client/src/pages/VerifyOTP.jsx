import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch, } from "react-redux";
import {
  otpVerification
} from "../redux/user/userSlice";

// Function to mask phone number
const maskPhoneNumber = (phoneNumber) => {
  const maskedLength = 3; // Number of characters to display at the beginning and end
  const maskedChars = '*'.repeat(phoneNumber.length - 6); // Calculate the number of masked characters

  // Concatenate the masked characters with the first 3 and last 3 characters of the phone number
  const maskedPhoneNumber = `${phoneNumber.slice(0, maskedLength)}${maskedChars}${phoneNumber.slice(-3)}`;
  
  // Return the masked phone number
  return maskedPhoneNumber;
};

export default function VerifyOTP() {
  const { currentUser } = useSelector((state) => state.user);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [formData, setFormData] = useState({OTP: ""});
  const [countdown, setCountdown] = useState(180); // 3 minutes in seconds
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id, value } = e.target;
    // Check if the value is a number and has a length of exactly 5
    if (/^\d{5}$/.test(value)) {
      // If the value matches the pattern, update the state
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        // Check if the response status is not OK
        toast.error("Invalid OTP");
        return;
      }
      dispatch(otpVerification(data));
      toast.success("OTP verification successful!");
      navigate("/sign-in");
    } catch (error) {
      toast.error("Error verifying OTP. Please try again.");
    }
  };

  const handleResendClick = async () => {
    try {
      
      const res = await fetch(`/api/auth/resend-otp/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const data = await res.json();
      if (data.success === false) {
        toast.error("Account already verified, sign in");
        return;
      }
      setResendDisabled(true);
      setCountdown(180); // Reset countdown after 3 minutes
      // Additional logic to resend OTP
      toast.success("OTP resent successfully!");
    
      setTimeout(() => {
        setResendDisabled(false);
      }, 180000); // 3 minutes in milliseconds
    } catch (error) {
      toast.error("Error sending OTP");
    }
  };
  

  useEffect(() => {
    let timer;
    if (resendDisabled) {
      timer = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount === 0) {
            clearInterval(timer);
            setResendDisabled(false);
            return 0;
          } else {
            return prevCount - 1;
          }
        });
      }, 1000); // Decrease countdown by 1 second every second
    }
    return () => clearInterval(timer);
  }, [resendDisabled]);
  

  return (
    <div className="p-3 max-w-lg mx-auto dark:bg-black dark:text-white h-screen">
      <div className="p-3 max-w-lg mx-auto pt-16">
        <h1 className="text-3xl text-center font-semibold my-7 text-gradient">
          OTP Verification
        </h1>
        <p className="text-xl text-center font-semibold my-7 text-gradient">
  Please enter the code sent to your phone number {maskPhoneNumber(currentUser.phone)}
</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter your OTP"
            className="border p-3 rounded-lg"
            id="OTP"
            onChange={handleChange}
            required
          />
          <button
            // disabled={loading}
            className="bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            Verify
          </button>
          <div className="flex gap-2 mt-10">
            <p className="text-gradient mt-3">Didn't get the code?</p>
            <button
            type="button"
              disabled={resendDisabled}
              onClick={handleResendClick}
              className="bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
              {resendDisabled
                ? `Resend OTP (${Math.floor(countdown / 60)}:${
                    countdown % 60 < 10
                      ? "0" + (countdown % 60)
                      : countdown % 60
                  })`
                : "Resend OTP"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
