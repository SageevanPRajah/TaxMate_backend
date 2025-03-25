import mongoose from "mongoose";

const taxReliefEntrySchema = new mongoose.Schema(
    {
      taxReliefID: { type: String, required: true },
      taxReliefDescription: { type: String, required: true },
      reliefAmount: { type: Number, required: true },
    },
    { _id: false }
  );
  

  const taxReliefSchema = new mongoose.Schema(
    {
      userID: { type: String }, // Correct: Should be a String
      year: { type: Number }, // Correct: Should be a Number
      income: { type: Number }, // Correct: Should be a Number
      deduction: { type: Number }, // Correct: Should be a Number
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
      finalTaxAmount: { type: Number }, // Correct: Should be a Number
      status: { type: String, default: "not paid" }, // Correct: Should be a String
    },
    {
      timestamps: true,
    }
  );

export const TaxRelief = mongoose.model('TaxRelief', taxReliefSchema);