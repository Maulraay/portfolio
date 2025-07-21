const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  const { name, email, subject, message } = JSON.parse(event.body || '{}');
  console.log("Received a request from " + name + " to send an email.");

  if (!name || !email || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing required fields" })
    };
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `[PORTFOLIO] ${subject}`,
      text: `[Sent by ${name}/${email}]\n${message}`
    });

    console.log("Message sent!");
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.log("[ERROR] An error occurred : " + error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
