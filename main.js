const fs = require("fs");
const {execute} = require("./apna-bash.js");

const display = function(outputs) {
  outputs.forEach(function(output) {
    const print = output.code === 1 ? console.error : console.log;
    if(output.message !== undefined) {
      print(`\n${output.message}`);
    }
  });
};

const main = function() {
  const script = process.argv[2]; 
  const program = fs.readFileSync(script, "utf-8");
  const outputs = execute(program);
  display(outputs);
};

main();
