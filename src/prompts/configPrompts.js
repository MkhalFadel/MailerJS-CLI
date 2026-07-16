const providers = require("../config/providers")
const inquirer = require("inquirer");
const confirm = require("@inquirer/confirm").default;
const select = require("@inquirer/select").default;  
const { default: chalk } = require("chalk");
const { section } = require("./prompts");
const { isValidEmail } = require("../utils/validator");

const prompt = inquirer.createPromptModule();

const providersList = Object.entries(providers).map((p) => {return {name: p[1].name, value: p[0]}})

async function getSmtpProvider()
{
   section('SMTP Host')

   const smtpProvider = await select({
      message: chalk.cyan("Select SMTP Provider:"),
      choices: providersList
   })
   
   return smtpProvider;
}

async function getSmtpUsername()
{
   section("Email Address");

   const { username } = await prompt({
      type: 'input',
      name: 'username',
      message: ">",
      validate(input) {
         return (input.trim() != "" && isValidEmail(input.trim())) || "Email address Invalid"
      }
   })

   return isValidEmail(username) && username.trim();
}

async function getSmtpPassword()
{
   section("Password");

   const { password } = await prompt({
      type: 'password',
      name: "password",
      message: ">",
      mask: true,
      validate(input) {
         return input.length >= 8 || "Password is required"
      }
   })

   return password.trim();
}

async function getDisplayName()
{
   section("Display Name");

   const { name } = await prompt({
      type: 'input',
      name: 'name',
      message: ">",
      validate(input) {
         return input.trim() != "" || 'Display name is required'
      }
   })

   return name.trim();
}

async function getCustomSmtpHost()
{
   section("SMTP Host");

   const { host } = await prompt({
      type: 'input',
      name: 'host',
      message: ">",
      validate(input) {
         return input.trim() != "" || "Host is required"
      }
   })

   return host.trim();
}

async function getCustomSmtpPort()
{
   section("SMTP Port");

   const { port } = await prompt({
      type: "number",
      name: 'port',
      message: ">",
      validate(input) {
         return (input >= 1 && input <= 65535) || "Port Invalid should be in the (1-65535) range" 
      }
   })

   return port == undefined ? 587 : port;
}

async function getCustomSmtpSecure()
{
   section("Secure");

   const secure = await confirm({
      message: "Use SSL/TLS?",
      default: true
   });

   return secure;
}

module.exports = {
   getSmtpProvider,
   getSmtpUsername,
   getSmtpPassword,
   getDisplayName,
   getCustomSmtpHost,
   getCustomSmtpPort,
   getCustomSmtpSecure,
}