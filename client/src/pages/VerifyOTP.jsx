import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch, } from "react-redux";
import {
  otpVerification
} from "../redux/user/userSlice";

export default function VerifyOTP() {
  const { currentUser } = useSelector((state) => state.user);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [formData, setFormData] = useState({});
  const [countdown, setCountdown] = useState(180); // 3 minutes in seconds
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
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
      if (data.success === false) {
        return;
      }
      dispatch(otpVerification(data));
      toast.success("OTP verification successful!");
      navigate("/sign-in");
    } catch (error) {
      toast.error("Invalid OTP");
    }
  };

  const handleResendClick = () => {
    // Logic to resend OTP goes here
    // For now, we'll just simulate the action by setting a timeout
    setResendDisabled(true);
    setCountdown(180); // Reset countdown after 3 minutes
    // Additional logic to resend OTP
    toast.success("OTP resent successfully!");
  
    setTimeout(() => {
      setResendDisabled(false);
    }, 180000); // 3 minutes in milliseconds
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
    <div className="p-3 max-w-lg mx-auto">
      <div className="p-3 max-w-lg mx-auto pt-16">
        <h1 className="text-3xl text-center font-semibold my-7 text-gradient">
          OTP Verification
        </h1>
        <p className="text-xl text-center font-semibold my-7 text-gradient">
          Please enter the code sent to your phone number {currentUser.phone}
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
