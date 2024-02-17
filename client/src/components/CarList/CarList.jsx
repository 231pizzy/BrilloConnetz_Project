import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import whiteCar from "../../assets/benz.jpeg";
import car1 from "../../assets/royce.jpeg";
import car2 from "../../assets/toyota.jpeg";
import car3 from "../../assets/bmw.png";
import car4 from "../../assets/bently.jpeg";
import car5 from "../../assets/land.png";
import car6 from "../../assets/lexus.png";
import car7 from "../../assets/ford.png";
import car8 from "../../assets/honda.png";
import car9 from "../../assets/audi.jpeg";
import { useNavigate } from "react-router-dom";

const carList = [
  {
    image: whiteCar,
    aosDelay: "0",
  },
  {
    image: car1,
    aosDelay: "500",
  },
  {
    image: car9,
    aosDelay: "500",
  },
  {
    image: car2,
    aosDelay: "500",
  },
  {
    image: car3,
    aosDelay: "1000",
  },
  {
    image: car4,
    aosDelay: "1000",
  },
  {
    image: car5,
    aosDelay: "1000",
  },
  {
    image: car6,
    aosDelay: "500",
  },
  {
    image: car7,
    aosDelay: "500",
  },
  {
    image: car8,
    aosDelay: "500",
  },
];

const CarList = () => {
  const navigate = useNavigate();
  const handleShop = () => {
    navigate("/cars");
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Set the autoplay speed in milliseconds (adjust as needed)
  };
  return (
    <div className="pb-24">
      <div className="container">
        {/* Heading */}
        <h1
          data-aos="fade-up"
          className="text-3xl sm:text-4xl font-semibold font-serif mb-3"
        >
          Explore Diverse Luxury Car Brands
        </h1>
        <p data-aos="fade-up" aos-delay="400" className="text-sm pb-10">
          Embark on a Journey of Opulence: Discover the Eclectic World of Luxury
          Cars
        </p>
        {/* Car listing */}
        <div>
          <Slider {...settings}>
            {carList.map((data) => (
              <div
                key={data.id}
                // data-aos="fade-up"
                // data-aos-delay={data.aosDelay}
                className="relative group"
              >
                <div className="w-full h-[120px]">
                  <img
                    src={data.image}
                    alt=""
                    className="w-full h-[120px] object-contain sm:translate-x-8 group-hover:sm:translate-x-16 duration-700"
                  />
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
            onClick={handleShop}
          >
            Shop Now!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarList;
