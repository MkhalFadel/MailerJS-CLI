const package = require("../../package.json");

function runVersion()
{
   console.log(`MailerJS v${package.version}`);
}

module.exports = runVersion;