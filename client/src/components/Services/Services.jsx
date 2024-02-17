import React from "react";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaHandshake } from "react-icons/fa";
import { IoPeopleCircleSharp } from "react-icons/io5";

const skillsData = [
  {
    name: "Affordability with Elegance",
    icon: (
      <FaMoneyCheckDollar className="text-5xl text-red-700 group-hover:text-white duration-300" />
    ),
    link: "#",
    description:
      "Our commitment to providing the best prices is as unwavering as our dedication to elegance. At CarzArena, we ensure that every client enjoys exceptional value, making luxury car ownership an affordable reality without compromising on quality or prestige.",
    aosDelay: "0",
  },
  {
    name: "Pinnacle of Quality Assurance",
    icon: (
      <FaHandshake className="text-5xl text-red-700 group-hover:text-white duration-300" />
    ),
    link: "#",
    description:
      "Step into a world where quality isn't just a standard; it's a commitment. Each luxury car in our collection undergoes rigorous scrutiny, ensuring that only the epitome of quality finds its way to your discerning taste.",
    aosDelay: "500",
  },
  {
    name: "Client-Centric Commitment",
    icon: (
      <IoPeopleCircleSharp className="text-5xl text-red-700 group-hover:text-white duration-500" />
    ),
    link: "#",
    description:
      "Our unwavering dedication to client satisfaction is at the core of everything we do. From personalized consultations to seamless transactions, we prioritize your needs and elevate your luxury car experience.",
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
                className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-16 bg-dark duration-300 text-white rounded-lg"
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
