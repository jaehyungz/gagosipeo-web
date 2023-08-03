import nodemailer from "nodemailer";

const user = process.env.NODE_MAILER_USER;
const pass = process.env.NODE_MAILER_PASS;

export const transport = nodemailer.createTransport({
  service: "gamil",
  auth: {
    user,
    pass,
  },
  host: "smtp.gmail.com",
  port: 465,
  //   secure: false, // upgrade later with STARTTLS
});

export const mailOptions = {
  from: user,
  to: user,
};
