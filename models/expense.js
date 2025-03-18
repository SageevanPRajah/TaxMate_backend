import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
    {
        expenseID: {
            type: String,
        },

        expenseName: {
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

        expenseCategory: {
            type: String,
            required: true 
        },

        expenseAmount: {
            type: Number,
            required: true 
        }

    },
    {
        timestamps: true,
    }
);

export const Expense = mongoose.model('Expense', expenseSchema);