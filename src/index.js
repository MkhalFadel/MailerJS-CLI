#!/usr/bin/env node
const  runConfig  = require("./commands/config.js")
const  runTest = require("./commands/test.js")
const runSend = require("./commands/send.js");
const runVersion = require("./commands/version.js");
const runHelp = require("./commands/help.js")

function main()
{
      const command = process.argv[2];

      if(command === 'config')
            runConfig();
      else if(command === 'test')
            runTest();
      else if(command === 'version')
            runVersion();
      else if(command === 'help')
            runHelp();
      else
            runSend();
}

main()