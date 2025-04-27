import mongoose from 'mongoose';

const liabilitySchema = new mongoose.Schema(
    {
        liabilityID: { 
            type: String,
            required: true
        },
        liabilityName: { 
            type: String,
            required: true
        },
        type: { 
            type: String,
            required: true,
            enum: ['Mortgage', 'Loan', 'Credit Card', 'Other']
        },
        amount: { 
            type: String,
            required: true
        },
        dueDate: { 
            type: Date,
            required: true
        },
        status: { 
            type: String,
            required: true,
            enum: ['Active', 'Paid', 'Overdue']
        },
        description: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true,
    }
);

export const Liability = mongoose.model('Liability', liabilitySchema);