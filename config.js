import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5559;
export const mongodbURL = process.env.MONGODB_URL;
export const JWT_SECRET = process.env.JWT_SECRET;

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// new mailer config
export const SMTP_HOST    = process.env.SMTP_HOST;
export const SMTP_PORT    = process.env.SMTP_PORT;
export const SMTP_USER    = process.env.SMTP_USER;
export const SMTP_PASS    = process.env.SMTP_PASS;