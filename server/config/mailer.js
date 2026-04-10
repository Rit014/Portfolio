const nodemailer = require('nodemailer')

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Gmail App Password
    },
  })
}

// Send notification email to portfolio owner
const sendContactEmail = async ({ name, email, message }) => {
  const transporter = createTransporter()

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `New message from ${name} — Portfolio`,
    html: `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
        <h2 style="color: #7fd4a0; border-bottom: 1px solid #eee; padding-bottom: 10px;">
          New Portfolio Message
        </h2>
        <table style="width:100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #888; width: 80px;">From</td>
            <td style="padding: 8px 0; font-weight: bold;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #888;">Email</td>
            <td style="padding: 8px 0;">
              <a href="mailto:${email}" style="color: #7fd4a0;">${email}</a>
            </td>
          </tr>
        </table>
        <div style="margin-top: 16px; padding: 16px; background: #f9f9f9; border-radius: 8px;">
          <p style="color: #888; margin: 0 0 8px; font-size: 13px;">MESSAGE</p>
          <p style="margin: 0; line-height: 1.6;">${message}</p>
        </div>
        <p style="margin-top: 20px; font-size: 12px; color: #aaa;">
          Sent from your portfolio contact form
        </p>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}

// Send confirmation email to the person who contacted you
const sendAutoReply = async ({ name, email }) => {
  const transporter = createTransporter()

  const mailOptions = {
    from: `"Ritu Panchal" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Thanks for reaching out, ${name}!`,
    html: `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
        <h2 style="color: #7fd4a0;">Hey ${name}, thanks for your message!</h2>
        <p style="line-height: 1.7; color: #444;">
          I've received your message and will get back to you within 24–48 hours.
        </p>
        <p style="line-height: 1.7; color: #444;">
          In the meantime, feel free to check out my work on
          <a href="https://github.com/rit014" style="color: #7fd4a0;">GitHub</a>.
        </p>
        <p style="margin-top: 24px; color: #444;">
          Best,<br/>
          <strong>Ritu Panchal</strong><br/>
          <span style="color: #888; font-size: 13px;">MERN Stack Developer</span>
        </p>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}

module.exports = { sendContactEmail, sendAutoReply }