const { isValidEmail } = require("../utils/validator");
const { getFilePath } = require("../utils/utils")
const { getRecipient } = require("../prompts/prompts")
const { section } = require("../utils/utils");
const { success, error, info } = require("../utils/logger");
const validator = require("validator");
const fs = require("fs").promises;

async function acceptManualRecipients(email)
{
   while (true) {
                  const recipient = await getRecipient();
                  
                  if (recipient.trim() === "") break;
                  
                  if(validator.isEmail(recipient))
                  {
                        email.recipients.push({
                              email: recipient,
                              status: "pending"
                        });
                  }else{
                        console.log("Invalid Email..");
                  }
      
   }

   return email;
}

async function acceptImportedRecipients(email)
{
   while (true) {
      const { path } = await getFilePath();
      const data = await fs.readFile(path, 'utf8');

      if(data.trim() === "") {
         error("The imported file is empty. Please choose another file.");
         continue;
      }

      const formattedEmails = parseRecipients(data);
      email.recipients = formattedEmails;
      return email;
   }
}

function parseRecipients(data) {
   let emails = data
      .replace(/\t+/g, " ")
      .trim()
      .split(/\s+/)
      .map(email => email.trim().toLowerCase())
      .filter(email => email !== "");

   emails = emails.map(e => {
      return {
         email: e,
         status: 'pending'
      }
   })

   let emailsInfo = {
      total: emails.length,
      valids: 0,
      invalids: 0,
      duplicates: 0
   };

   emails = filterValidEmails(emails, emailsInfo);
   emails = removeDuplicates(emails, emailsInfo);

   section("Recipients Imported");
   info(`Total emails: ${emailsInfo.total}`)
   success(`Valid: ${emailsInfo.valids}`);
   error(`Invalid: ${emailsInfo.invalids}`);
   error(`Duplicates removed: ${emailsInfo.duplicates}`);

   return emails; 
}

function filterValidEmails(emails, emailsInfo) {
   for (let i =  emails.length - 1; i >= 0; i--) {
      if (!isValidEmail(emails[i].email))
      {
         emails.splice(i, 1);
         emailsInfo.invalids++;
      } 
   }

   return emails;
}

function removeDuplicates(emails, emailsInfo) {
   const seen = new Set();
   const newEmails = emails.filter(e => {
      const duplicate = seen.has(e.email);
      seen.add(e.email)
      if(duplicate)
         emailsInfo.duplicates++;
      return !duplicate;   
   })
   emailsInfo.valids = newEmails.length;
   return newEmails;
}

module.exports = { acceptManualRecipients, acceptImportedRecipients }