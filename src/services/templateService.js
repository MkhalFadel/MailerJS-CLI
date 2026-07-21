const path = require("path");
const fs = require("fs").promises;
const { getConfigDirectory } = require("./configService");
const inquirer = require("inquirer")

const prompt = inquirer.createPromptModule();

function getTemplatesDirectory()
{
   const configDir = getConfigDirectory();
   const templatesDir = path.join(configDir, 'templates');

   return templatesDir;
}

async function templatesDirExists()
{
   const templatesDirPath = getTemplatesDirectory();

   try {
      const stats = await fs.stat(templatesDirPath);
      return stats.isDirectory();
   } catch (error) {
      if(error.code === 'ENOENT')
         return false;

      throw error;
   }
}

async function createTemplatesDirectory()
{
   try {
      const templatesDirPath = getTemplatesDirectory();
   
      const templatesDir = await fs.mkdir(templatesDirPath, {recursive: true});
   
      return templatesDir;
   } catch (error) {
      throw error;
   }
}

async function ensureTemplatesDirExists()
{
   const templateDirExists = await templatesDirExists();

   if(!templateDirExists)
   {
      try {
         const templatesDirPath = await createTemplatesDirectory();
         return true;
      } catch (error) {
         throw error;
      }
   }

   return true;
}

async function getTemplates()
{
   await ensureTemplatesDirExists()

   const templatesDir = getTemplatesDirectory();

   const data = await fs.readdir(templatesDir);

   return data.filter(file => path.extname(file) === '.html');
}

function extractPlaceholders(data)
{
   // Matches {{key}} or {{ key }} with optional spaces
   const regex = /\{\{\s*([a-zA-Z0-9_-]+)\s*\}\}/g;

   // Extract clean names using the capture group (match[1])
   const placeholders = [...data.matchAll(regex)].map(match => match[1]);

   // Remove duplicates
   const uniqueList = [...new Set(placeholders)];

   return uniqueList
}

async function readTemplate(template)
{
   const data = await fs.readFile(template, 'utf8');

   const placeholders = extractPlaceholders(data);

   return {placeholders, data}
}

async function replacePlaceholders(placeholders, data)
{
   const placeholdersObj = placeholders.reduce((accumulator, key) => {
      accumulator[key] = "";
      return accumulator;
   }, {});
   
   
   for(const key in placeholdersObj)
   {
      const { text } = await prompt({
         type: 'input',
         name: 'text',
         message: `${key} >`
      });     

      placeholdersObj[key] = text;
   }

   for(const key in placeholdersObj)
   {
      // Replace both {{key}} and {{ key }} formats
      const regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g');
      data = data.replace(regex, placeholdersObj[key]);
   }

   return data;
}

module.exports = { getTemplates, readTemplate, replacePlaceholders, getTemplatesDirectory };