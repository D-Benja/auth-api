import nodemailer, { SendMailOptions } from "nodemailer";
import config from "config";

const smtp = config.get<{
  user: string;
  pass: string;
  host: string;
  port: number;
  secure: boolean;
}>("smtp");

const transporter = nodemailer.createTransport({
  ...smtp,
  auth: {
    user: smtp.user,
    pass: smtp.pass,
  },
});

async function sendEmail(payload: SendMailOptions) {
  transporter.sendMail(payload, (error, info) => {
    if (error) {
      return console.log("Error sending email- ", error);
    }

    console.log(`Check the email on ${nodemailer.getTestMessageUrl(info)}`);
  });
}

export default sendEmail;
