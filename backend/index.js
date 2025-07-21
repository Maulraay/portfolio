const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Allowed origins white-list
const allowedOrigins = [
  'http://localhost:9500',          // local frontend
  'https://frontend.prod.com',     // production
];

const corsOptions = {
  origin: function (origin, callback) {
    // allows tools like Postman (origin === undefined) and allowed origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Forbidden by CORS'));
    }
  },
  credentials: true, // if cookies are enabled
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

app.post('/sendMail', async (req, res) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `[PORTFOLIO] ${subject}`,
    text: `[Sent by ${name}/${email}]\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email successfully sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while email sending' + error });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server launched at http://localhost:${PORT}`);
});
