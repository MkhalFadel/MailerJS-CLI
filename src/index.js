#!/usr/bin/env node

const { showBanner } = require("./utils/banner");
const { getSubject, getMessage, getAttachment, getRecipient, } = require("./prompts/prompts");
const { default: chalk } = require("chalk");
const confirm = require("@inquirer/confirm").default;
const validator = require("validator");
const { showSummary } = require("./utils/utils");


async function main() {
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

      console.log("\nFinished.");
}

main();