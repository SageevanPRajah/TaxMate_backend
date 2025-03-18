import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
    {
        incomeID: {
            type: String,
        },

        incomeName: {
            type: String,
            required: true
        },

        incomeType: {
            type: String,
            required: true
        },

        totalAmount: {
            type: Number,
        },

        date: {
            type: Date,
            required: true
        },

        employementIncomeTotalAmount: {
            type: Number,
        },

        businessIncomeTotalAmount: {
            type: Number,
        },

        investmentIncomeTotalAmount: {
            type: Number,
        },

        otherIncomeTotalAmount: {
            type: Number,
        },

        amount: {
            type: Number,
            required: true
        }

    },
    {
        timestamps: true,
    }
);

export const Income = mongoose.model('Income', incomeSchema);