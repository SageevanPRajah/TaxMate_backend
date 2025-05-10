import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
    {
        userID: { 
            type: String 
        },

        incomeName: {
            type: String,
            
        },

        incomeType: {
            type: String,
            
        },

        totalAmount: {
            type: Number,
        },

        date: {
            type: Date,
            
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
           
        }

    },
    {
        timestamps: true,
    }
);

export const Income = mongoose.model('Income', incomeSchema);