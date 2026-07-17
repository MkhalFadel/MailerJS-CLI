const { createTransporter, verifyConnection } = require("../services/emailService");
const { loadConfig } = require("../services/configService")
const { success, error } = require("../utils/logger")

async function runTest()
{
   const config = await loadConfig();

   try {
      await verifyConnection(config);
      success("SMTP is connected")
   } catch (err) {
      error("SMTP connection failed");
      error("Please verify your SMTP settings and credentials");
   }
}

module.exports = runTest