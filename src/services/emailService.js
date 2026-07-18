const nodemailer = require("nodemailer")
const ora = require("ora");

function createTransporter(config)
{
   const transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.secure,
      auth: {
         user: config.smtp.username,
         pass: config.smtp.password
      }
   })

   return transporter;
}

async function verifyConnection(config)
{
   const transporter = createTransporter(config);

   await transporter.verify();
} 

async function sendEmail(config, emailData, transporter)
{
   const spinner = ora(`Sending email to ${emailData.to}`).start();

   let attachment = [];

   if(emailData.attachment !== null)
      attachment = [{
         path: emailData.attachment
      }]

   const mailOptions = {
      from: {
         name: config.sender.name,
         address: config.sender.email
      },
      to: emailData.to,
      subject: emailData.subject,
      text: emailData.message,
      attachments: attachment
   }

   try {
      const mailResult = await transporter.sendMail(mailOptions)
      spinner.succeed(`Email sent to ${emailData.to}`);
      return mailResult;
   } catch (error) {
      spinner.fail(`Failed to send the email to ${emailData.to}`);
      throw error;
   }
}

module.exports = { createTransporter, verifyConnection, sendEmail };