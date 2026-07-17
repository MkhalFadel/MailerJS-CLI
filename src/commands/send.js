const { showBanner } = require("../utils/banner");
const { getSubject, getMessage, getAttachment, getRecipient, section } = require("../prompts/prompts");
const { default: chalk } = require("chalk");
const confirm = require("@inquirer/confirm").default;
const validator = require("validator");
const { showSummary, emailFormatter } = require("../utils/utils");
const { loadConfig } = require("../services/configService");
const { sendEmail, createTransporter } = require("../services/emailService");
const { success, error, info } = require("../utils/logger");

async function runSend() {
      showBanner();

      const email = {
            subject: await getSubject(),
            message: await getMessage(),
            attachment: await getAttachment(),
            recipients: []
      }

      while (true) {
            const recipient = await getRecipient();
            
            if (recipient.trim() === "") break;
            
            if(validator.isEmail(recipient))
            {
                  email.recipients.push({
                        email: recipient,
                        status: "pending"
                  });
                  
                  console.log(`Would send email to ${recipient}`);
            }else{
                  console.log("Invalid Email..");
            }

      }

      showSummary(email)

      const send = await confirm({
            message: chalk.cyan("Send emails?"),
            default: true
      })

      const totalEmails = email.recipients.length;
      let totalSuccess = 0;
      let totalFailed = 0;

      if(send)
      {
            const config = await loadConfig()
            const transporter = createTransporter(config)

            for(let i = 0; i < totalEmails; i++)
            {
                  const emailData = emailFormatter(email);
                  const currentRecipient = email.recipients[i];
                  emailData.to = currentRecipient.email;

                  try {
                        await sendEmail(config, emailData, transporter);
                        currentRecipient.status = 'sent';
                        totalSuccess++;
                  } catch (err) {
                        currentRecipient.status = 'failed';
                        totalFailed++;
                  }
            }
            
            section("Summary");
            info(`Total Emails: ${totalEmails}`);
            success(`Sent: ${totalSuccess}`);
            error(`Failed: ${totalFailed}`);
      }

}

module.exports = runSend;