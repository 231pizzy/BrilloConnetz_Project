import React from "react";
import fan from "../../assets/sportfan.png";


const About = ({ theme }) => {

  return (
    <div className="dark:bg-dark bg-slate-50 sm:min-h-[600px] sm:grid sm:place-items-center duration-300">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div data-aos="slide-right" data-aos-duration="1500">
            <img
              src={theme === "dark" ? fan : fan}
              alt=""
              className="sm:scale-125 sm:-translate-x-11 max-h-[300px] drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)] mt-4 md:mt-0"
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
                className="text-green-700 text-2xl font-serif"
              >
                Bringing Fans Together, One Game at a Time.
              </p>
              <h1
                data-aos="fade-up"
                data-aos-delay="600"
                className="text-2xl lg:text-3xl font-semibold font-serif"
              >
                BrilloConnetz
              </h1>
              <p data-aos="fade-up" data-aos-delay="1000">
              Step into the heart of sports fandom. Here, passion knows no bounds, and every game is a chance to connect. Whether you're a seasoned supporter or a newcomer to the scene, you're invited to join our vibrant community. Together, we'll celebrate victories, share stories, and create lasting memories.
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
