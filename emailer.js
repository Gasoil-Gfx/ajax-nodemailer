import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


const { EMAIL_USER, EMAIL_PASS, RECEIVER_EMAIL } = process.env;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export default async (req, res) => {
    // Force an error response for testing
    return res.status(500).json({ message: "Simulated error for testing." });
  };
  
  