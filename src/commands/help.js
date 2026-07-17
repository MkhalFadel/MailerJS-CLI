const { showBanner } = require("../utils/banner");
const { section } = require("../utils/utils");
const { default: chalk } = require("chalk");

function runHelp() {
   showBanner();

   console.log(chalk.gray("A simple CLI for sending emails using SMTP.\n"));

   section("Usage");
   console.log(chalk.white("  mailer [command]\n"));

   section("Commands");

   const commands = [
      {
         command: "mailer",
         description: "Start the interactive email sender."
      },
      {
         command: "mailer config",
         description: "Configure your SMTP account."
      },
      {
         command: "mailer test",
         description: "Test the current SMTP configuration."
      },
      {
         command: "mailer help",
         description: "Show this help message."
      },
      {
         command: "mailer version",
         description: "Show the installed MailerJS-CLI version."
      }
   ];

   for (const { command, description } of commands) {
      console.log(
         `${chalk.cyan(command.padEnd(18))}${chalk.gray(description)}`
      );
   }

   console.log();

   section("Examples");

   const examples = [
      "mailer",
      "mailer config",
      "mailer test",
      "mailer version"
   ];

   examples.forEach(example => {
      console.log(chalk.green(`  $ ${example}`));
   });

   console.log();

   section("Configuration");

   console.log(
      chalk.gray(
         "Before sending emails, configure your SMTP account by running:"
      )
   );

   console.log(chalk.green("\n  $ mailer config\n"));
}

module.exports = runHelp;