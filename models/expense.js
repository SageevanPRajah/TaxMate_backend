import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
    {
        userID: { 
            type: String 
        },
        expenseID: {
            type: String,
            
        },

        expenseName: {
            type: String,
             
        },

        totalAmount: {
            type: Number,
        },

        
        date: {
            type: Date,
             
        },

        expenseCategory: {
            type: String,
            
        },

        expenseAmount: {
            type: String,
            
        }

    },
    {
        timestamps: true,
    }
);

export const Expense = mongoose.model('Expense', expenseSchema);