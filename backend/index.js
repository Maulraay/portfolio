const express = require('express');
const nodemailer = require('nodemailer');
const validator = require('validator');
const xss = require('xss');
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

const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_MAX = Number(process.env.CONTACT_RATE_MAX) || 5;
const BODY_LIMIT = 10 * 1024; // 10 KB
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET || '';

const rateMap = new Map(); // simple in-memory rate limiter (stateless across cold starts)

function containsCRLF(value) {
  return /\r|\n/.test(value || '');
}

function getClientIp(event) {
  const headers = event.headers || {};
  return (
    headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    headers['X-Forwarded-For']?.split(',')[0]?.trim() ||
    headers['x-real-ip'] ||
    headers['X-Real-IP'] ||
    event.requestContext?.http?.sourceIp ||
    event.requestContext?.identity?.sourceIp ||
    'unknown'
  );
}

function checkRate(ip) {
  const now = Date.now();
  const entry = rateMap.get(ip) || { count: 0, expires: now + RATE_WINDOW_MS };
  if (now > entry.expires) {
    entry.count = 0;
    entry.expires = now + RATE_WINDOW_MS;
  }
  entry.count += 1;
  rateMap.set(ip, entry);
  return entry.count <= RATE_MAX;
}

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

app.post('/sendMail', async (req, res) => {
  console.log("Received mail request");

  try {
    // Basic body size limit
    const payload = req.body || '';
    if (payload.length > BODY_LIMIT) {
      return {
        statusCode: 413,
        body: JSON.stringify({ error: 'Payload too large' })
      };
    }

    const ip = getClientIp(req);
    if (!checkRate(ip)) {
      return { statusCode: 429, body: JSON.stringify({ error: 'Too many requests' }) };
    }

    const { name, email, subject, message, website, captchaToken } = payload || {};

    // Honeypot
    if (website && String(website).trim() !== '') {
      return { statusCode: 400, body: JSON.stringify({ error: 'Bot detected' }) };
    }

    // Required fields
    if (!name || !email || !subject || !message) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) };
    }

    // Prevent header injection in fields used for headers
    if (containsCRLF(name) || containsCRLF(email) || containsCRLF(subject)) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid characters in input' }) };
    }

    // Validate
    if (!validator.isLength(name, { min: 1, max: 100 })) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid name' }) };
    }
    if (!validator.isEmail(email) || !validator.isLength(email, { min: 3, max: 254 })) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid email' }) };
    }
    if (!validator.isLength(subject, { min: 0, max: 150 })) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid subject' }) };
    }
    if (!validator.isLength(message, { min: 1, max: 10000 })) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid message' }) };
    }

    // Verify reCAPTCHA if configured
    if (RECAPTCHA_SECRET) {
      if (!captchaToken) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Captcha required' }) };
      }
      const resp = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${encodeURIComponent(RECAPTCHA_SECRET)}&response=${encodeURIComponent(captchaToken)}`
      });
      const v = await resp.json();
      if (!v.success || (v.score !== undefined && v.score < 0.3)) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Captcha verification failed' }) };
      }
    }

    // Sanitize for storage/display
    const sName = xss(String(name).trim());
    const sEmail = validator.normalizeEmail(String(email).trim());
    const sSubject = xss(String(subject).trim() || '(no subject)');
    const sMessage = xss(String(message).trim());

    // Transport configuration
    const transporter = nodemailer.createTransport({
      secure: 'true',
      service: 'gmail', // e.g., 'gmail' or leave undefined when using host/port
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Build mail safely: avoid using raw user input in header fields except replyTo
    const mailOptions = {
      from: sEmail,
      to: process.env.EMAIL_USER,
      subject: `[PORTFOLIO] ${sSubject}`,
      text: `From: ${sName} <${sEmail}>\n\n${sMessage}`,
      html: `<p>From: ${validator.escape(sName)} &lt;${validator.escape(sEmail)}&gt;</p><div>${validator.escape(sMessage).replace(/\n/g, '<br/>')}</div>`,
      replyTo: sEmail // safe because we validated email and blocked CRLF
    };

    await transporter.sendMail(mailOptions);

    console.log(`Mail successfully sent!`);
    return res.status(200).json({ message: 'Email successfully sent' });
  } catch (err) {
    console.error('sendMail error:', err && err.message ? err.message : err);
    return res.status(500).json({ error: 'Error while email sending' + err });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server launched at http://localhost:${PORT}`);
});
