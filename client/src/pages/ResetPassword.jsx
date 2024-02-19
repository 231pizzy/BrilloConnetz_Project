import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("recoveryToken");

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "password") {
      setPassword(value);
    } else if (id === "confirmPassword") {
      setConfirmPassword(value);
    }
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Check if password and confirmPassword match
      if (password !== confirmPassword) {
        throw new Error("Password does not match");
      }

      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, recoveryToken: token }),
      });

      setLoading(false);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Password reset failed.");
      }

      toast.success("Password reset successful");
      navigate("/sign-in");
    } catch (error) {
      if (error.message === "Password does not match") {
        toast.error("Password does not match");
      } else {
        toast.error(
          "Invalid token or an error occurred during password reset."
        );
      }
      setError(true);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto dark:bg-black dark:text-white h-screen">
      <h1 className="text-3xl text-center font-semibold my-7">
        Reset password
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="Change Password"
          className="border p-3 rounded-lg"
          id="password"
          value={password}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="border p-3 rounded-lg"
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Reset password"}
        </button>
      </form>
    </div>
  );
}
