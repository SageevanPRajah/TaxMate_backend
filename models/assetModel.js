import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema(
    {
        userID: { 
            type: String 
        },
        assetID: { 
            type: String,
            required: true
        },
        assetName: { 
            type: String,
            required: true
        },
        assetValue: { 
            type: String,
            required: true
        },
        category: { 
            type: String,
            required: true,
            enum: ['Current', 'Non-Current']
        },
        changeType: { 
            type: String,
            required: true,
            enum: ['Increase', 'Decrease']
        },
        percentage: { 
            type: String,
            required: true
        },
        amount: { 
            type: String,
            required: true
        },
        date: { 
            type: Date,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

export const Asset = mongoose.model('Asset', assetSchema);



