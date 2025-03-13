import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5559;
export const mongodbURL = process.env.MONGODB_URL;
