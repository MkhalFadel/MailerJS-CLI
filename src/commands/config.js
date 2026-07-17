const { getProvider } = require("../utils/utils") 
const { saveConfig, loadConfig } = require("../services/configService")
const { success } = require("../utils/logger")
const { getSmtpUsername,
      getSmtpProvider,
      getSmtpPassword,
      getDisplayName,
      getCustomSmtpSecure,
      getCustomSmtpPort,
      getCustomSmtpHost } = require("../prompts/configPrompts")

async function runConfig()
{
   let host;
   let port;
   let secure;

   const providerKey = await getSmtpProvider();
   
   const provider = getProvider(providerKey);

   if(providerKey === 'custom')
   {
      host = await getCustomSmtpHost();
      port = await getCustomSmtpPort();
      secure = await getCustomSmtpSecure();
   }
   else{
      host = provider.smtp.host;
      port = provider.smtp.port
      secure = provider.smtp.secure
   }

   const userName = await getSmtpUsername();
   const password = await getSmtpPassword();
   const name = await getDisplayName();

   const userConfig = {
      provider: providerKey,   
      smtp: {
         host: host,
         port: port,
         secure: secure,
         username: userName,
         password: password,
      },
      sender: {
         name: name,
         email: userName
      }
   }
   
   try {
      await saveConfig(userConfig);
      success("Configuration saved successfully");
   } catch (error) {
      throw error;
   }

   await loadConfig()
}

module.exports = runConfig;