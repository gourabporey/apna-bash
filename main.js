const fs = require("fs");
const {run} = require("./apna-bash.js");

const display = function(log) {
  log.forEach(function(result) {
    const print = result.output.code === 0 ? console.log : console.error;

    if(result.output.message !== undefined) {
      print(`\n${result.output.message}`);
    }
  });
};

const main = function() {
  const scriptFile = process.argv[2]; 
  const sourceCode = fs.readFileSync(scriptFile, "utf-8");
  const {environment, log} = run(sourceCode);
  display(log);
};

main();
