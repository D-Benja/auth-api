require("dotenv").config();

export default {
  port: process.env.PORT || 8080,
  client_url: process.env.CLIENT_URL,
  db_url: process.env.DB_URL,
  node_env: process.env.NODE_ENV,
  smtp: {
    user: "lcfrzyzcfws3sgwv@ethereal.email",
    pass: "4sHrfnK439GTaNVdQq",
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
  },
  accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
  refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY,
  accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
  refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY,
};
