const inquirer = require("inquirer");
const chalk = require('chalk');
const { section, readFile } = require("../utils/utils");
const fs = require("fs").promises;
const readline = require("readline");

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
                  }
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

module.exports = { getMessageFormat, acceptHTMLMessages, acceptPlainMessages }