import { useState } from "react";
import {  Link } from "react-router-dom";
import { toast } from "react-toastify";


export default function ForgotPassword() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/forgot-password", {
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
      toast.success("password reset link has being sent to your email!");
    } catch (error) {
      toast.error("password reset failed");
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <div className="p-3 max-w-lg mx-auto pt-16">
        <h1 className="text-3xl text-center font-semibold my-7 text-gradient">
          Forgot your password?
        </h1>
        <p className="text-xl text-center font-semibold my-7 text-gradient">
          Please enter your registered email address.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your registered email"
            className="border p-3 rounded-lg"
            id="email"
            onChange={handleChange}
            required
          />
          <button
            // disabled={loading}
            className="rounded-md bg-green-700 hover:bg-green-800 transition duration-500 py-2 px-6 text-white"
          >
            Request password reset
          </button>
          <div className="flex gap-2 mt-5 items-center justify-center">
          <Link to={"/sign-in"}>
            <span className="text-blue-700">Back to Sign in</span>
          </Link>
        </div>
          
        </form>
      </div>
    </div>
  );
}
