const providers = {
   gmail: {
      name: "Gmail",
      smtp: {
         host: "smtp.gmail.com",
         port: 587,
         secure: false,
      },
   },

   outlook: {
      name: "Outlook",
      smtp: {
         host: "smtp.office365.com",
         port: 587,
         secure: false,
      },
   },

   yahoo: {
      name: "Yahoo",
      smtp: {
         host: "smtp.mail.yahoo.com",
         port: 587,
         secure: false,
      },
   },

   zoho: {
      name: "Zoho",
      smtp: {
         host: "smtp.zoho.com",
         port: 587,
         secure: false,
      },
   },

   icloud: {
      name: "iCloud",
      smtp: {
         host: "smtp.mail.me.com",
         port: 587,
         secure: false,
      },
   },

   custom: {
      name: "Custom SMTP",
      smtp: {
         host: "",
         port: 587,
         secure: false,
      },
   },
};

module.exports = providers;