import { useEffect } from "react";
import sportFan from "../../assets/sportfan.png";
import AOS from "aos";
import { useNavigate } from "react-router-dom";
// import pattern from "../../assets/bgBanner.jpeg";

// const bannerImg = {
//   backgroundImage: `url(${pattern})`,
//   backgroundPosition: "center",
//   backgroundRepeat: "no-repeat",
//   backgroundSize: "cover",
//   height: "100%",
//   width: "100%",
// };
const Hero = ({ theme }) => {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.refresh();
  });

  const handleRegister = () => {

    navigate("/sign-up");
  };

  return (
    <div className="dark:bg-black dark:text-white duration-300 ">
      <div className="container min-h-[620px] flex" >
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-once="false"
            className="order-1 sm:order-2 mb-6 md:mb-0"
          >
            <img
              src={theme === "dark" ? sportFan : sportFan}
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
            At BrilloConnetz, we're dedicated to creating a vibrant and inclusive space for sports enthusiasts worldwide. Our passion for sports drives us to build a community where fans can connect, share their love for the game, and forge lasting friendships. Whether you're a seasoned athlete or a casual spectator, we believe in the power of sports to inspire, unite, and uplift. Join us as we celebrate the thrill of competition, the joy of camaraderie, and the endless possibilities that sports bring to our lives.
            </p>
            <button
              data-aos="fade-up"
              data-aos-delay="200"
              onClick={() => {
                AOS.refreshHard();
                handleRegister();
              }}
              className="rounded-md bg-green-700 hover:bg-green-800 transition duration-500 py-2 px-6 text-white"
            >
              Get Started 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
