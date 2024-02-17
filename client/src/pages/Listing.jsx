import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaShare } from "react-icons/fa";
import {
  // FaCar,
  FaGasPump,
  FaCogs,
  FaHorse,
  // FaSteeringWheel,
} from "react-icons/fa";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { GiSteeringWheel } from "react-icons/gi";
import { TbEngine } from "react-icons/tb";
// import Contact from "../components/Contact";
import { IoMdTime } from "react-icons/io";
import Bot from "../components/Bot";

// https://sabe.io/blog/javascript-format-numbers-commas#:~:text=The%20best%20way%20to%20format,format%20the%20number%20with%20commas.

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        console.log(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  const handlePhoneCall = () => {
    // Use HTML anchor tag to initiate a phone call
    window.location.href = `tel:+2348062329708`;
  };

  return (
    <main className="pt-12  px-3 gap-6">
      <Bot />
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px] rounded-md"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.condition === "used" ? "Direct Belgium" : "Brand New"} -{" "}
              {listing.name}
            </p>
            <p className="flex items-center mt-2 gap-2 text-slate-700 text-md">
              Year: {listing.year}
            </p>
            <p className="flex items-center gap-2 text-slate-700 text-md">
              Color: {listing.color}
            </p>
            <p className="flex items-center gap-2 text-slate-700 text-md">
              Brand: {listing.brand}
            </p>
            <div className="flex gap-4">
              <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                ₦ {listing.price.toLocaleString()}
              </p>
            </div>
            <div className="flex gap-4 text-slate-700 mt-2">
              <div className="icon-container">
                <div className="bg-slate-800 w-8 h-8 rounded-full justify-center flex items-center mb-2">
                  <MdAirlineSeatReclineExtra className=" text-white" />
                </div>
                <div className="font-bold text-xs text-center">
                  {listing.seats > 1
                    ? `${listing.seats} seats `
                    : `${listing.steats} seat `}
                </div>
              </div>

              <div className="icon-container">
                <div className="bg-slate-800 w-8 h-8 rounded-full justify-center flex items-center mb-2">
                  <FaGasPump className="icon text-white" />
                </div>
                <div className="font-bold text-xs text-center">
                  {listing.fuelType}
                </div>
              </div>

              <div className="icon-container">
                <div className="bg-slate-800 w-8 ml-3 h-8 rounded-full justify-center flex items-center mb-2">
                  <FaCogs className="icon text-white" />
                </div>
                <div className="font-bold text-xs text-center">
                  {listing.transmission}
                </div>
              </div>

              <div className="icon-container">
                <div className="bg-slate-800 w-8 h-8 rounded-full justify-center flex items-center mb-2">
                  <TbEngine className="icon text-white" />
                </div>
                <div className="font-bold text-xs text-center">
                  {listing.horsePower}
                </div>
              </div>

              <div className="icon-container">
                <div className="bg-slate-800 w-8 h-8 rounded-full justify-center flex items-center mb-2">
                  <GiSteeringWheel className="icon text-white" />
                </div>
                <div className="font-bold text-xs text-center">
                  {listing.wheelControl}
                </div>
              </div>
            </div>
            <p className="text-slate-800 flex items-center">
              {/* Icon with larger size */}
              <IoMdTime className="mr-1 text-xl" />
              {/* Updated at text */}
              <span className="font-semibold text-black dark:text-slate-800">
                Updated at:{" "}
              </span>
              {/* Convert updatedAt to a more readable format */}
              {new Date(listing.updatedAt).toLocaleString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>

            <p className="text-slate-800">
              <span className="font-semibold text-black dark:text-slate-800">
                Description -{" "}
              </span>
              {listing.description}
            </p>
            <button
              onClick={handlePhoneCall}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Book Inspection
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
