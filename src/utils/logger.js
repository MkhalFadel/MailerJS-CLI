function success(message) {
   console.log(`✔ ${message}`);
}

function error(message) {
   console.log(`✖ ${message}`);
}

function info(message) {
   console.log(`ℹ ${message}`);
}

module.exports = {
   success,
   error,
   info,
};