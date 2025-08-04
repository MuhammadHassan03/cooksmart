import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

const sendEmail = async ({ to, subject, text, html }: EmailOptions) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"FoodSaver" <${process.env.EMAIL_USERNAME}>`,
    to,
    subject,
    text,
    html: html || text,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
