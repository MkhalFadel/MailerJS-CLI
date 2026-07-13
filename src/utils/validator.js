const fs = require("fs");
const validator = require("validator");

function isValidEmail(email) {
   return validator.isEmail(email);
}

function attachmentExists(path) {
   if (!path) return true;

   return fs.existsSync(path);
}

module.exports = {
   isValidEmail,
   attachmentExists,
};