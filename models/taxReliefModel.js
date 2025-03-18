import mongoose from "mongoose";

const taxReliefSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      

    },
    year: {
      type: Number,
      required: true,
      default: () => {
        const currentDate = new Date();
        return currentDate.getMonth() >= 3 ? currentDate.getFullYear() : currentDate.getFullYear() - 1;
      }, // Auto-fill current year, but if before April, use previous year
    },
    income: {
      type: Number,
      required: true,
    },
    deduction: {
      type: Number,
      required: true,
    },
    taxReliefDescription: {
      type: String,
      required: true,
    },
    taxReliefID: {
      type: String,
      required: true,
    },
    reliefAmount: {
      type: Number,
      required: true,
    },
    finalTaxAmount: {
      type: Number,
      required: false,
      
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

// Function to calculate tax based on Sri Lanka's tax rates
function calculateTax(taxableIncome) {
  let tax = 0;

  if (taxableIncome <= 1200000) {
    tax = 0;
  } else if (taxableIncome <= 1700000) {
    tax = (taxableIncome - 1200000) * 0.06;
  } else if (taxableIncome <= 2200000) {
    tax = 500000 * 0.06 + (taxableIncome - 1700000) * 0.12;
  } else if (taxableIncome <= 2700000) {
    tax = 500000 * 0.06 + 500000 * 0.12 + (taxableIncome - 2200000) * 0.18;
  } else if (taxableIncome <= 3200000) {
    tax = 500000 * 0.06 + 500000 * 0.12 + 500000 * 0.18 + (taxableIncome - 2700000) * 0.24;
  } else {
    tax =
      500000 * 0.06 +
      500000 * 0.12 +
      500000 * 0.18 +
      500000 * 0.24 +
      (taxableIncome - 3200000) * 0.3;
  }

  return tax;
}

taxReliefSchema.pre("validate", function (next) {
  if (!this.finalTaxAmount) { // Ensures it's always calculated
    const taxableIncome = this.income - this.deduction - this.reliefAmount;
    this.finalTaxAmount = calculateTax(taxableIncome);
  }
  next();
});

const TaxRelief = mongoose.model("TaxRelief", taxReliefSchema);

export default TaxRelief; 

