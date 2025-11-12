const nodemailer = require('nodemailer');
const validator = require('validator');
const xss = require('xss');

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

exports.handler = async function(event) {
  console.log("Received mail request");

  try {
    // Basic body size limit
    const rawBody = event.body || '';
    if (rawBody.length > BODY_LIMIT) {
      return {
        statusCode: 413,
        body: JSON.stringify({ error: 'Payload too large' })
      };
    }

    let payload;
    try {
      payload = JSON.parse(rawBody);
    } catch (err) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
    }

    const ip = getClientIp(event);
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
      return { statusCode: 400, body: JSON.stringify({ error: `Missing required fields : ${payload.toString()}` }) };
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
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    console.log(`There was an error sending mail request: ${err.message}`);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
