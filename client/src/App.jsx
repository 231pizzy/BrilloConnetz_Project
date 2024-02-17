import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Component imports
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Services from "./components/Services/Services";
import CarList from "./components/CarList/CarList";
import AppStoreBanner from "./components/AppStoreBanner/AppStoreBanner";
import Contact from "./components/Contact/Contact";
import Testimonial from "./components/Testimonial/Testimonial";
// import Footer from "./components/Footer/Footer";
import Carpage from "./pages/Carpage";
import SignIn from "./pages/Signin";
import Profile from "./pages/Profile";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import Bot from "./components/Bot";
import PrivateRoute from "./components/PrivateRoute";
import VerifyEmail from "./pages/VerifyEmail";
import VerifyOTP from "./pages/VerifyOTP";
import SignUp from "./pages/Signup";


const App = () => {
  // dark mode start
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);
  // dark mode end

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  const Home = () => (
    <div className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden">
      {/* <Navbar theme={theme} setTheme={setTheme} /> */}
      <About theme={theme} />
      <Hero theme={theme} />
      <Bot />
      <Services />
      <CarList />
      <Testimonial />
      <AppStoreBanner />
      <Contact />
    </div>
  );

  return (
    <div className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden">
      <ToastContainer position="bottom-center" limit={1} />
      <BrowserRouter>
        <Navbar theme={theme} setTheme={setTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Carpage />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/verifyOTP" element={<VerifyOTP />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          <Route path="/listing/:listingId" element={<Listing />} />
          <Route element={<PrivateRoute />}>
            <Route path="/create-listing" element={<CreateListing />} />
            <Route
              path="/update-listing/:listingId"
              element={<UpdateListing />}
            />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
};

export default App;
