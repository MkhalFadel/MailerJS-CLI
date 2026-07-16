const inquirer = require("inquirer");
const readline = require("readline");
const chalk = require("chalk").default;
const { validateFiles } = require("../utils/utils");

const prompt = inquirer.createPromptModule();

function section(title) {
   console.log();
   console.log(chalk.cyan.bold(title));
   console.log(chalk.gray("─".repeat(title.length)));
}

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

   console.log(chalk.gray('Type "END" on a new line when finished.\n'));

   const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
   });

   const lines = [];
   let line = 1;

   return new Promise((resolve) => {
      rl.setPrompt(`${chalk.blue(line.toString().padStart(2))} │ `);
      rl.prompt();

      rl.on("line", (input) => {
         if (input.trim().toUpperCase() === "END") {
               rl.close();
               resolve(lines.join("\n").trim());
               return;
         }

         lines.push(input);

         line++;

         rl.setPrompt(`${chalk.blue(line.toString().padStart(2))} │ `);
         rl.prompt();
      });
   });
}

async function getAttachment() {
   section("Attachment");

   const { attachment } = await prompt([
      {
         type: "input",
         name: "attachment",
         message: "Enter file path:",
         async validate(input){
            const result = await validateFiles(input);
            return result.isValid ? true : result.error
         }
      },
   ]);

   return attachment;
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
   section
};