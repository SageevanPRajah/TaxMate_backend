import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        productID: { 
            type: String,  
        },
        name: { 
            type: String,
        },
        category: { 
            type: String,
        },
        price: { 
            type: Number,
        },
        quantity: { 
            type: Number,
        },
        address: { 
            number: { type: String },
            street: { type: String },
            city: { type: String },
            country: { type: String },
            postalCode: { type: String }
        },
        stock: { 
            type: String,
            default: 'in Stock',
        }
    },
    {
        timestamps: true,
    }
);

export const Product = mongoose.model('Product', productSchema);

