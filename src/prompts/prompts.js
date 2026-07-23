const inquirer = require("inquirer");
const chalk = require("chalk");
const path = require("path")
const { acceptPlainMessages, acceptHTMLMessages, getMessageFormat, acceptHTMLTemplate } = require("./messagePrompts");
const { validateFiles, section, getFilePath } = require("../utils/utils");
const { info } = require("../utils/logger");

const prompt = inquirer.createPromptModule();

async function getSubject() {
   section("Email Subject");

   const { subject } = await prompt([
      {
         type: "input",
         name: "subject",
         message: ">",
         validate(input) {
               return input.trim() !== "" || "Subject cannot be empty.";
         },
      },
   ]);

   return subject.trim();
}

async function getMessage() {
   section("Email Message");

   const format = await getMessageFormat();

   if(format === 'text')
      return acceptPlainMessages();
   
   else if(format === 'html') 
      return acceptHTMLMessages();

   else
      return acceptHTMLTemplate();
}

async function getAttachments() {
   section("Attachments");

   let attachments = [];

   const { include } = await prompt({
      type: 'confirm',
      name: 'include',
      message: chalk.cyan("Include attachments?"),
      default: true
   })

   if(!include)
      return [];

   while(true)
   {
      const result = await getFilePath();

      info(`Added: ${path.basename(result.filePath)}`)

      attachments.push(result.filePath);

      const { another } = await prompt({
         type: 'confirm',
         name: "another",
         message: chalk.cyan('Add another attachment?'),
         default: true
      })

      if(!another)
         break;
   }
   
   return attachments;
}

let recipientNumber = 1;

async function getRecipient() {
   section(`Recipient #${recipientNumber}`);

   const { recipient } = await prompt([
      {
         type: "input",
         name: "recipient",
         message: ">",
      },
   ]);

   recipientNumber++;

   return recipient.trim();
}

module.exports = {
   getSubject,
   getMessage,
   getAttachments,
   getRecipient,
};