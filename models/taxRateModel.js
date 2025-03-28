import mongoose from "mongoose";

const taxRateSchema = new mongoose.Schema(
    {
        incomeTaxSlab:{
            type: String,
            required: true,
        },
        taxRate:{
            type: Number,
            required: true,
        },
    }
);

export const TaxRate = mongoose.model('TaxRate', taxRateSchema);