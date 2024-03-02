const fs = require("fs");
const { ApnaBash } = require("./src/apna-bash.js");
const { PathHandler } = require("./src/path-handler.js");
const { CommandHandler } = require("./src/apna-commands.js");
const { Parser } = require("./src/parser.js");

const display = function (log) {
   log.forEach(function (result) {
      const printStream = result.output.code === 0 ? console.log : console.error;

      if (result.output.message !== undefined) {
         printStream(`\n${result.output.message}`);
      }
   });
};

const main = function () {
   const scriptFile = process.argv[2];
   const sourceCode = fs.readFileSync(scriptFile, "utf-8");

   const pathHandler = new PathHandler();
   const commandHandler = new CommandHandler(pathHandler, { pwd: process.env.PWD }, fs);
   const parser = new Parser();
   const bashRunner = new ApnaBash(sourceCode, { pwd: process.env.PWD }, parser, commandHandler);
   const { log } = bashRunner.run();
   display(log);
};

main();
