import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosFootball } from "react-icons/io";
import { FaBasketball } from "react-icons/fa6";
import { FaBaseballBatBall } from "react-icons/fa6";
import { MdSportsHockey } from "react-icons/md";
import { MdSportsMotorsports } from "react-icons/md";
import { MdSportsRugby } from "react-icons/md";
import { FaSkiingNordic } from "react-icons/fa";
import { FaTableTennisPaddleBall } from "react-icons/fa6";
import { IoGolf } from "react-icons/io5";
import { GiCricketBat } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const sportList = [
  {
    id: 1,
    title: "Football",
    icon: <IoIosFootball />,
  },
  {
    id: 2,
    title: "Basketball",
    icon: <FaBasketball />,
  },
  {
    id: 3,
    title: "Baseball",
    icon: <FaBaseballBatBall />,
  },
  {
    id: 4,
    title: "Ice Hockey",
    icon: <MdSportsHockey />,
  },
  {
    id: 5,
    title: "Motorsports",
    icon: <MdSportsMotorsports />,
  },
  {
    id: 6,
    title: "Rugby",
    icon: <MdSportsRugby />,
  },
  {
    id: 7,
    title: "Skiing",
    icon: <FaSkiingNordic />,
  },
  {
    id: 8,
    title: "Table Tennis",
    icon: <FaTableTennisPaddleBall />,
  },
  {
    id: 9,
    title: "Golf",
    icon: <IoGolf />,
  },
  {
    id: 10,
    title: "Cricket",
    icon: <GiCricketBat />,
  },
];

const SportList = () => {
  const navigate = useNavigate();
  const handleJoin = () => {
    navigate("/sign-up");
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Display 1 item on mobile screens
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768, // Adjust breakpoint as needed
        settings: {
          slidesToShow: 1, // Display 3 items on larger screens
        },
      },
    ],
  };
  
  return (
    <div className="pb-24">
      <div className="container">
        {/* Heading */}
        <h1
          data-aos="fade-up"
          className="text-3xl sm:text-4xl font-semibold font-serif mb-3"
        >
          From Courts to Fields
        </h1>
        <p data-aos="fade-up" aos-delay="400" className="text-sm pb-10">
        Unveiling Sporting Diversity
        </p>
        {/* Car listing */}
        <div>
        <Slider {...settings}>
            {sportList.map((sport) => (
              <div key={sport.id} className="relative group">
                <div className="w-full h-[120px] flex items-center justify-center ">
                  <div className="flex items-center text-3xl">
                    {sport.icon}
                    <h1 className="ml-2 text-3xl">{sport.title}</h1>
                  </div>
                </div>
              </div>
            ))}
          </Slider>

        </div>
        {/* End of car listing */}
        <div className="grid place-items-center mt-8">
          <button
            data-aos="fade-up"
            className="button-outline"
            onClick={handleJoin}
          >
            join Now!
          </button>
        </div>
      </div>
    </div>
  );
};

export default SportList;
