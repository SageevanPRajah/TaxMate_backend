import mongoose from "mongoose";

// Tax relief entry schema
const taxReliefEntrySchema = new mongoose.Schema(
  {
    taxReliefID: { type: String, required: true },
    taxReliefDescription: { type: String, required: true },
    reliefAmount: { type: Number, required: true },
  },
  { _id: false }
);

// Tax relief schema
const taxReliefSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    year: {
      type: Number,
      required: true,
      default: () => {
        const currentDate = new Date();
        return currentDate.getMonth() >= 3
          ? currentDate.getFullYear()
          : currentDate.getFullYear() - 1;
      },
    },
    income: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Income",
      required: true,
    },
    deduction: {
      type: Number,
      required: true,
    },
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
    finalTaxAmount: {
      type: Number,
      // This will be calculated in the controller before saving
    },
    status: {
      type: String,
      enum: ["paid", "not paid"],
      default: "not paid",
    },
  },
  {
    timestamps: true,
  }
);




const TaxRelief = mongoose.model("TaxRelief", taxReliefSchema);

export default TaxRelief;
