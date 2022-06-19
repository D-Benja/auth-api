require("dotenv").config();

export default {
  port: process.env.PORT || 8080,
  client_url: process.env.CLIENT_URL,
  db_url: process.env.DB_URL,
  smtp: {
    user: "lcfrzyzcfws3sgwv@ethereal.email",
    pass: "4sHrfnK439GTaNVdQq",
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
  },
};
