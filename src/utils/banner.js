const figlet = require("figlet");
const chalk = require("chalk").default;

function showBanner() {
   console.clear();

   console.log(
      chalk.cyan(
         figlet.textSync("MailerJS", {
               font: 'ANSI Shadow',
               horizontalLayout: "default",
               verticalLayout: "default",
         })
      )
   );

   console.log(chalk.gray("Modern SMTP Email CLI\n"));
}

module.exports = {
   showBanner,
};