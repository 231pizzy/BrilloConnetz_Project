import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function VerifyOTP() {
  const { currentUser } = useSelector((state) => state.user);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(180); // 3 minutes in seconds
  const navigate = useNavigate();

  const handleResendClick = () => {
    // Logic to resend OTP goes here
    // For now, we'll just simulate the action by setting a timeout
    setResendDisabled(true);
    setTimeout(() => {
      setResendDisabled(false);
      setCountdown(180); // Reset countdown after 3 minutes
      // Additional logic to resend OTP
      toast.success("OTP resent successfully!");
    }, 180000); // 3 minutes in milliseconds
  };

  useEffect(() => {
    let timer;
    if (resendDisabled) {
      timer = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000); // Decrease countdown by 1 second every second
    }
    return () => clearInterval(timer);
  }, [resendDisabled]);

  // Automatically start countdown and disable resend button on component mount
  useEffect(() => {
    setResendDisabled(true);
  }, []);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <div className="p-3 max-w-lg mx-auto pt-16">
        <h1 className="text-3xl text-center font-semibold my-7 text-gradient">
          OTP Verification
        </h1>
        <p className="text-xl text-center font-semibold my-7 text-gradient">
          Please enter the code sent to your phone number {currentUser.phone}
        </p>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter your OTP"
            className="border p-3 rounded-lg"
            id="otp"
            // onChange={handleChange}
            required
          />
          <button
            // disabled={loading}
            className="bg-blue-gradient text-black p-3 rounded-lg uppercase hover:bg-blue-hover disabled:opacity-80"
          >
            Verify
          </button>
          <div className="flex gap-2 mt-10">
            <p className="text-gradient mt-3">Didn't get the code?</p>
            <button
              disabled={resendDisabled}
              onClick={handleResendClick}
              className="bg-blue-gradient text-black p-3 rounded-lg uppercase hover:bg-blue-hover disabled:opacity-80"
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
