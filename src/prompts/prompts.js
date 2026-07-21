const inquirer = require("inquirer");
const chalk = require("chalk");
const { acceptPlainMessages, acceptHTMLMessages, getMessageFormat, acceptHTMLTemplate } = require("./messagePrompts");
const { validateFiles, section, getFilePath } = require("../utils/utils");

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

async function getAttachment() {
   section("Attachment");

   const { include } = await prompt({
      type: 'confirm',
      name: 'include',
      message: chalk.cyan("Include attachment?"),
      default: true
   })

   if(!include)
      return null;
   
   const result = await getFilePath()

   return result.filePath;
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
   getAttachment,
   getRecipient,
};