import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    wheelControl: {
      type: String,
      required: true,
    },
    horsePower: {
      type: String,
      required: true,
    },
    transmission: {
      type: String,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
