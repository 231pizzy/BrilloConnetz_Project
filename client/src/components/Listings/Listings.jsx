import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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

export default function ListingItem({ listing }) {
  const formattedPrice = listing.price.toLocaleString();
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-1/2 md:w-[330px] dark:bg-black dark:text-white">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
          }
          alt="listing cover"
          className="h-[300px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate font-bold text-black text-2xl dark:text-white">
            {listing.name}
          </p>
          <p className="truncate font-bold text-black text-md dark:text-white">
            Brand: {listing.brand}
          </p>
          <p className="text-green-800 mt-2 font-semibold text-xl">
            ₦ {formattedPrice}
          </p>
          <div className="flex gap-4 text-slate-700 mt-2 dark:bg-black dark:text-white">
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
        </div>
      </Link>
    </div>
  );
}

// ListingItem.propTypes = {
//   listing: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
//     name: PropTypes.string.isRequired,
//     address: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     offer: PropTypes.bool.isRequired,
//     discountPrice: PropTypes.number.isRequired,
//     regularPrice: PropTypes.number.isRequired,
//     type: PropTypes.string.isRequired,
//     bedrooms: PropTypes.number.isRequired,
//     bathrooms: PropTypes.number.isRequired,
//     toilets: PropTypes.number.isRequired,
//     // Add any other required properties for the 'listing' object
//   }).isRequired,
// };
