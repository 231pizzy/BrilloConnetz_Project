import React from "react";
import { FaPeopleLine } from "react-icons/fa6";
import { FaHandshake } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";

const skillsData = [
  {
    name: "Community Forums and Discussions",
    icon: (
      <FaPeopleLine className="text-5xl text-green-700 duration-300" />
    ),
    link: "#",
    description:
      "Our commitment to providing the best prices is as unwavering as our dedication to elegance. At CarzArena, we ensure that every client enjoys exceptional value, making luxury car ownership an affordable reality without compromising on quality or prestige.",
    aosDelay: "0",
  },
  {
    name: " Personalized Sports Profiles",
    icon: (
      <FaHandshake className="text-5xl text-green-700 duration-300" />
    ),
    link: "#",
    description:
      "Craft your unique sports persona with our personalized sports profiles. Showcase your favorite teams, highlight your proudest moments, and connect with fellow fans who share your passion. With customizable features and interactive elements, your profile becomes a digital extension of your sports identity, allowing you to express your love for the game in your own unique way.",
    aosDelay: "500",
  },
  {
    name: "Live Match Updates",
    icon: (
      <IoMdNotifications className="text-5xl text-green-700 duration-500" />
    ),
    link: "#",
    description:
      "Experience the thrill of every moment with our comprehensive live match updates feature. From scores to player stats, our real-time updates keep you immersed in the action, ensuring you're always up-to-date with the latest developments, even when you can't be in the stands.",
    aosDelay: "1000",
  },
];
const Services = () => {
  return (
    <>
      <span id="about"></span>
      <div className="dark:bg-black dark:text-white py-14 sm:min-h-[600px] sm:grid sm:place-items-center">
        <div className="container">
          <div className="pb-12">
            <h1
              data-aos="fade-up"
              className="text-3xl font-semibold text-center sm:text-4xl font-serif"
            >
              Why Choose Us
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {skillsData.map((skill) => (
              <div
                key={skill.name}
                data-aos="fade-up"
                data-aos-delay={skill.aosDelay}
                className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-16 bg-slate-100 duration-300 text-gray-800 rounded-lg"
              >
                <div className="grid place-items-center">{skill.icon}</div>
                <h1 className="text-2xl font-bold">{skill.name}</h1>
                <p>{skill.description}</p>
                <a
                  href={skill.link}
                  className="inline-block text-lg font-semibold py-3 text-red-700 group-hover:text-black duration-300"
                ></a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
