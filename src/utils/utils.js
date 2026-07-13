const { default: chalk } = require("chalk");
const fs = require("fs/promises")
const path = require("path");

function showSummary(data)
{
      console.log(chalk.gray("─".repeat(15)));
      console.log(chalk.cyan.bold("Email review"));
      console.log("\nSubject:\n",  chalk.grey(data.subject));
      console.log("\nMessage:\n", chalk.grey(data.message));
      console.log("\nAttachment:\n", chalk.grey(data.attachment || "none"));
      console.log("\nRecipients:")

      if(data.recipients.length)
      {
            for(const recipient of data.recipients)
            {
                  console.log(chalk.grey.bold(recipient.email));
            }
      }else{
            console.log(chalk.red("No recipients entered"))
      }
}

async function validateFiles(filePath)
{
      try{
            const absolutePath = resolveFilePath(filePath);

            await fs.access(absolutePath, fs.constants.R_OK)

            const stats = await fs.stat(absolutePath)

            if(!stats.isFile())
                  return { isValid: false, error: "The provided path points to a directory, not a file." };

            return {isValid: true, path: absolutePath}

      }catch(error)     
      {
            if (error.code === 'ENOENT') 
                  return { isValid: false, error: "File does not exist at the specified path." };

            if (error.code === 'EACCES')
                  return { isValid: false, error: "Permission denied. Cannot read this file." };
            
            return { isValid: false, error: error.message };
      }
}

function resolveFilePath(filePath) {
   const input = filePath.trim();

   // Empty input = no attachment
   if (!input) {
      return null;
   }

   // Expand "~" to the user's home directory
   if (input.startsWith("~")) {
      return path.join(process.env.HOME || process.env.USERPROFILE, input.slice(1));
   }

   // Absolute path
   if (path.isAbsolute(input)) {
      return path.normalize(input);
   }

   // Relative path
   return path.resolve(process.cwd(), input);
}

   module.exports = {
      resolveFilePath,
};

module.exports = {validateFiles, showSummary}