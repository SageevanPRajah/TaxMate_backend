import mongoose from "mongoose";

// Define the schema for an individual tax relief entry.
const taxReliefEntrySchema = new mongoose.Schema(
  {
    taxReliefID: { type: String, required: true },
    taxReliefDescription: { type: String, required: true },
    reliefAmount: { type: Number, required: true },
  },
  { _id: false }
);

// Define the main schema for tax relief.
const taxReliefSchema = new mongoose.Schema(
  {
    userID: { type: String },
    year: { type: String }, // Using a string to store fiscal year (e.g., "2024-2025")
    income: { type: Number },
    deduction: { type: Number },
    taxReliefs: {
      type: [taxReliefEntrySchema],
      required: true,
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "At least one tax relief entry is required.",
      },
    },
    status: { type: String, default: "not paid" },
  },
  { timestamps: true }
);

// Create and export the TaxRelief model.
export const TaxRelief = mongoose.model("TaxRelief", taxReliefSchema);
