import React from "react";
import CarPng from "../../assets/rolls.png";
// import darkCar from "../../assets/IMG_1690 2.jpg";
import { useNavigate } from "react-router-dom";

const About = ({ theme }) => {
  const navigate = useNavigate();

  const handleShowroomClick = () => {
    navigate("/cars");
  };
  return (
    <div className="dark:bg-dark bg-slate-50 sm:min-h-[600px] sm:grid sm:place-items-center duration-300">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div data-aos="slide-right" data-aos-duration="1500">
            <img
              src={theme === "dark" ? CarPng : CarPng}
              alt=""
              className="sm:scale-125 sm:-translate-x-11 max-h-[300px] drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)]"
            />
          </div>
          <div>
            <div className="space-y-5 sm:p-16 pb-6">
              {/* <h1
                data-aos="fade-up"
                className="text-3xl sm:text-4xl font-bold font-serif"
              >
                About us
              </h1> */}
              <p
                data-aos="fade-up"
                className="text-red-700 text-2xl font-serif"
              >
                Ride in Style, Drive with Pride.
              </p>
              <h1
                data-aos="fade-up"
                data-aos-delay="600"
                className="text-2xl lg:text-3xl font-semibold font-serif"
              >
                Discover Unrivaled Luxury
              </h1>
              {/* <p data-aos="fade-up" className="leading-8 tracking-wide">
                Welcome to CarzArena, the epitome of luxury in the automotive
                realm. At the forefront of excellence, we curate a collection of
                the world's finest luxury cars, setting new standards in
                sophistication. Our team is dedicated to providing a
                personalized and extraordinary experience, redefining the art of
                driving.
              </p>
              <p data-aos="fade-up">
                CarzArena — where automotive aspirations meet distinction
              </p> */}
              <p data-aos="fade-up" data-aos-delay="1000">
                At the pinnacle of the luxury car market, we take pride in
                presenting a selection that blends elegance with cutting-edge
                technology. Each car in our showroom is a testament to our
                commitment to delivering unparalleled quality and style. Explore
                the epitome of automotive luxury with the number one luxury car
                dealer in Nigeria.
              </p>
              {/* <button
                data-aos="fade-up"
                className="button-outline"
                onClick={handleShowroomClick}
              >
                Show Room {">>>"}
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
