import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    description: {
      type: String,
      default: "",
      maxlength: [200, "Description too long"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

export const Product = mongoose.model("Product", productSchema);