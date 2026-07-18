const { showBanner } = require("../utils/banner");
const { getSubject, getMessage, getAttachment, getRecipient, section } = require("../prompts/prompts");
const chalk = require("chalk");
const inquirer = require("inquirer")
const { showSummary, emailFormatter } = require("../utils/utils");
const { loadConfig } = require("../services/configService");
const { sendEmail, createTransporter } = require("../services/emailService");
const { success, error, info } = require("../utils/logger");
const { acceptManualRecipients, acceptImportedRecipients } = require("../services/recipientService");

const prompt = inquirer.createPromptModule();

async function runSend() {
      showBanner();

      let email = {
            subject: await getSubject(),
            message: await getMessage(),
            attachment: await getAttachment(),
            recipients: []
      }

      section("Recipients");
      const { addingMethod } = await prompt({
            type: 'list',
            name: 'addingMethod',
            message: "How would you like to add recipients?",
            choices: [
                  {
                        name: "Enter manually",
                        value: "manual"
                  },
                  {
                        name: 'Import from TXT file',
                        value: 'import'
                  }
            ]
      });
      

      if(addingMethod === "manual")
      {
            email = await acceptManualRecipients(email)
      }
      else{
            email = await acceptImportedRecipients(email);
      }

      showSummary(email)

      const { send } = await prompt({
            type: 'confirm',
            name: 'send',
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
                        console.log(err)
                  }
            }
            
            section("Summary");
            info(`Total Emails: ${totalEmails}`);
            success(`Sent: ${totalSuccess}`);
            error(`Failed: ${totalFailed}`);
      }
}

module.exports = runSend;