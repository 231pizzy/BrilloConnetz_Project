import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  registerStart,
  registerSuccess,
  registerFailure,
} from "../redux/user/userSlice";

const topSports = [
  "Football",
  "Basketball",
  "Tennis",
  "Cricket",
  "Golf",
  "Baseball",
  "Rugby",
  "Hockey",
  "Volleyball",
  "Boxing",
];

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showInterestsDropdown, setShowInterestsDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleInterestSelect = (interest) => {
    setFormData({
      ...formData,
      interests: [...(formData.interests || []), interest],
    });
  };

  console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      dispatch(registerStart());
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      dispatch(registerSuccess(data));
      navigate("/notification");
    } catch (error) {
      setLoading(false);
      setError(error.message);
      dispatch(registerFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto h-full">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="First Name"
          className="border p-3 rounded-lg"
          id="firstName"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="border p-3 rounded-lg"
          id="lastName"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="userName"
          onChange={handleChange}
        />
         <input
          type="text"
          placeholder="phone number eg +234 *******"
          className="border p-3 rounded-lg"
          id="phone"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <div className="relative">
          <button
          type="button"
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            onClick={() => setShowInterestsDropdown(!showInterestsDropdown)}
          >
            Select your interests
          </button>
          {showInterestsDropdown && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-md mt-1 rounded-lg">
              {topSports.map((interest) => (
                <label key={interest} className="block cursor-pointer">
                  <input
                    type="checkbox"
                    onChange={() => handleInterestSelect(interest)}
                    className="ml-6 mt-2"
                  />
                      {""}{interest}
                </label>
              ))}
            </div>
          )}
        </div>
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <Link to={"/sign-in"}>
            <span className="text-blue-700">Sign in</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
