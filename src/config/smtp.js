require("dotenv").config();

function getSMTPConfig() {
   return {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
      secure: process.env.SMTP_SECURE === "true",
   };
}

module.exports = {
   getSMTPConfig,
};