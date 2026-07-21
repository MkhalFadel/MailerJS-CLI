const inquirer = require("inquirer");
const chalk = require('chalk');
const { section, readFile, createDataList } = require("../utils/utils");
const fs = require("fs").promises;
const readline = require("readline");
const { getTemplates, readTemplate, replacePlaceholders, getTemplatesDirectory } = require("../services/templateService");
const path = require("path");
const { error, info } = require("../utils/logger");

const prompt = inquirer.createPromptModule();

async function getMessageFormat()
{
      const {format } = await prompt({
            type: 'list',
            name: 'format',
            message: "Choose format type:",
            choices: [
                  {
                        name: "Plain text",
                        value: 'text'
                  },
                  {
                        name: 'HTML File',
                        value: 'html'
                  },
                  {
                        name: 'HTML template',
                        value: 'template'
                  },
            ] 
      })

      return format;
}

async function acceptPlainMessages()
{
      console.log(chalk.gray('Type "END" on a new line when finished.\n'));

      const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
      });

      const lines = [];
      let line = 1;

      const text = await new Promise((resolve) => {
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
            
      })

      return {message: text, type: 'text'}
}

async function acceptHTMLMessages()
{
      section("Enter HTML file path")

      const data = await readFile('.html');
      return {message: data, type: 'html'};
}

async function acceptHTMLTemplate()
{
      const templatesData = await getTemplates();

      if(templatesData.length === 0)
      {
            error("No Templates found!")
            info('Place HTML templates inside: "~/.mailer/templates"')
            return false
      }

      const templates = createDataList(templatesData);

      const { selectedTemplate } = await prompt({
            type: 'list',
            name: 'selectedTemplate',
            message: "Choose the template",
            choices: templates
      });

      const templatePath = path.join(getTemplatesDirectory(), selectedTemplate);
      const { placeholders, data } = await readTemplate(templatePath);

      if(placeholders.length === 0)
            return {message: data, type: 'html'}

      const newHtml = await replacePlaceholders(placeholders, data);

      return {message: newHtml, type: 'html'};
}

module.exports = { getMessageFormat, acceptHTMLMessages, acceptPlainMessages, acceptHTMLTemplate }