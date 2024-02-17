import React, { useEffect, useState } from "react";
import carPng from "../../assets/car.png";
// import yellowCar from "../../assets/banner-car.png";
import redCar from "../../assets/maserati.png";
import AOS from "aos";
import { useNavigate } from "react-router-dom";

const Hero = ({ theme }) => {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.refresh();
  });

  const handleShowRoomClick = () => {
    // Navigate to the "/cars" page
    navigate("/cars");
  };

  return (
    <div className="dark:bg-black dark:text-white duration-300 ">
      <div className="container min-h-[620px] flex">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-once="false"
            className="order-1 sm:order-2"
          >
            <img
              src={theme === "dark" ? carPng : redCar}
              alt=""
              className="sm:scale-125 relative -z-10 max-h-[600px] drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)]"
            />
          </div>
          <div className="space-y-5 order-2 sm:order-1 sm:pr-32 ">
            <h1
              data-aos="fade-up"
              className="text-3xl sm:text-4xl font-bold font-serif"
            >
              About us
            </h1>
            <p data-aos="fade-up" className="leading-8 tracking-wide">
              Welcome to CarzArena, the epitome of luxury in the automotive
              realm. At the forefront of excellence, we curate a collection of
              the world's finest luxury cars, setting new standards in
              sophistication. Our team is dedicated to providing a personalized
              and extraordinary experience, redefining the art of driving.
            </p>
            <p data-aos="fade-up">
              CarzArena — where automotive aspirations meet distinction
            </p>
            <button
              data-aos="fade-up"
              data-aos-delay="200"
              onClick={() => {
                AOS.refreshHard();
                handleShowRoomClick();
              }}
              className="rounded-md bg-red-700 hover:bg-red-800 transition duration-500 py-2 px-6 text-white"
            >
              Show Room {">>>"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
