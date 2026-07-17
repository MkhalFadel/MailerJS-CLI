const path = require("path")
const os = require("os");
const fs = require("fs/promises");
const { config } = require("dotenv");

function getConfigDirectory()
{
   const homeDir = os.homedir();
   const joinedDirPath = path.join(homeDir, '.mailerjs')

   return joinedDirPath;
}

async function configDirectoryExists()
{
   const configPath = getConfigDirectory();
   
   try {
      const stats = await fs.stat(configPath);
      return stats.isDirectory();
   
   } catch (error) {
      if(error.code === 'ENOENT')
         return false;

      throw error;
   }
}

async function createConfigDirectory()
{
   try { 
      const joinedDirPath = getConfigDirectory();
      
      const configPath = await fs.mkdir(joinedDirPath , { recursive: true });

      return configPath;
   
   } catch (error) {
      throw error;
   }
}

async function ensureDirectoryExists()
{
      const direcotryExists = await configDirectoryExists();

      if(!direcotryExists)
      {
         const direcotryPath = await createConfigDirectory();
         if(!direcotryPath)
         {
            console.log("Failed to create the Configuration directory");
            return false;
         }
      }
      
      return true;
}

function getConfigFilePath()
{
   const configDirPath = getConfigDirectory();
   const configFilePath = path.join(configDirPath, 'config.json');

   return configFilePath;
}

async function configFileExists()
{
   const configPath = getConfigFilePath();
   try {
      const stats = await fs.stat(configPath);
      return stats.isFile();
   
   } catch (error) {
      if(error.code === 'ENOENT')
         return false;
      
      throw error;
   }
}

async function saveConfig(config)
{
   await ensureDirectoryExists();
   
   const convertedConfig = JSON.stringify(config, null, 2);
   const configFilepath = getConfigFilePath();

   try {
      await fs.writeFile(configFilepath, convertedConfig, 'utf-8')
   } catch (error) {
      throw error;
   }
}

async function loadConfig()
{
   const configFilePath = getConfigFilePath();
   
   try {
      const fileContent = await fs.readFile(configFilePath, 'utf-8');

      const configData = JSON.parse(fileContent)

      return configData;
   } catch (error) {
      throw error;
   }
}

module.exports = { 
   getConfigDirectory, 
   configDirectoryExists, 
   createConfigDirectory, 
   ensureDirectoryExists,
   getConfigFilePath,
   configFileExists,
   saveConfig,
   loadConfig
};