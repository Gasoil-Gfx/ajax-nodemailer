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
    console.log('fake hh');
  };
  