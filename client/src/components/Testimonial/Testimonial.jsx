import React from "react";
import fan1 from "../../assets/fan1.jpeg"
import fan2 from "../../assets/fan2.png"
import fan3 from "../../assets/fan3.jpeg"

const testimonialData = [
  {
    name: "Aisvarya Adeseye",
    image: fan1,
    description: "This community is a game-changer! From match highlights to lively debates, I've found my tribe here. Every matchday is unforgettable thanks to the camaraderie and interactive features.",
    aosDelay: "0",
  },
  {
    name: "Adeyemi Adeseye",
    image: fan2,
    description: "Connecting with fellow basketball fans here is exhilarating! Whether it's analyzing plays or reliving iconic moments, this community's passion is unmatched. It's not just about the sport; it's about the shared love that makes every game unforgettable.",
    aosDelay: "300",
  },
  {
    name: "Benedicta Okosun",
    image: fan3,
    description: "Joining this community has elevated my tennis-watching experience! From Grand Slam finals to thrilling rallies, every match is tenfold more exciting when shared here. The lively discussions and user-friendly interface make it feel like home.",
    aosDelay: "1000",
  },
];
const Testimonial = () => {
  return (
    <>
      <span id="about"></span>
      <div className="dark:bg-black dark:text-white py-14 sm:pb-24">
        <div className="container">
          {/* Header */}
          <div className="space-y-4 pb-12">
            <p
              data-aos="fade-up"
              className="text-3xl font-semibold text-center sm:text-4xl font-serif"
            >
              Featured Fans
            </p>
            <p data-aos="fade-up" className="text-center sm:px-44">
            Passionate sports enthusiasts who bring the excitement of the game to life, uniting in shared love and camaraderie.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-black dark:text-white">
            {testimonialData.map((skill) => (
              <div
                key={skill.name}
                data-aos="fade-up"
                data-aos-delay={skill.aosDelay}
                className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-12 dark:bg-white/20 bg-gray-100 duration-300  rounded-lg "
              >
                <div className="grid place-items-center ">
                  <img
                    src={skill.image}
                    alt=""
                    className="rounded-full w-20 h-20"
                  />
                </div>
                <div className="text-2xl">⭐⭐⭐⭐⭐</div>
                <p>{skill.description}</p>
                <p className="text-center font-semibold">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
