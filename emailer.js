import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import sanitizeHtml from 'sanitize-html';

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
    // Sanitize user inputs to prevent XSS
    const contactFullName = sanitizeHtml(req.body.contactFullName);
    const contactEmail = sanitizeHtml(req.body.contactEmail);
    const contactPhone = sanitizeHtml(req.body.contactPhone);
    const contactMsgSubject = sanitizeHtml(req.body.contactMsgSubject);
    const contactMessage = sanitizeHtml(req.body.contactMessage);

    // Email HTML with inline CSS
    const emailHTML = `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h1 style="color: red;">Website Contact Form</h1>
            <p><strong>Name:</strong> ${contactFullName}</p>
            <p><strong>Email:</strong> <a href="mailto:${contactEmail}">${contactEmail}</a></p>
            <p><strong>Phone:</strong> ${contactPhone}</p>
            <p><strong>Subject:</strong> ${contactMsgSubject}</p>
            <p><strong>Message:</strong></p>
            <p>${contactMessage.replace(/\n/g, "<br>")}</p>
        </div>
    `;

    const mailOptions = {
        from: `"Website Contact Form" <${EMAIL_USER}>`, // Use your verified sender
        to: RECEIVER_EMAIL,
        subject: `New message from the website contact form: ${contactMsgSubject}`,
        html: emailHTML
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while sending the email." });
    }
};
