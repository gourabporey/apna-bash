const fs = require("fs");
const {execute} = require("./apna-bash.js");

const display = function(outputs) {
  outputs.forEach(function(output) {
    const print = output.code === 1 ? console.error : console.log;
    print(`\n${output.message}`);
  });
};

const main = function(script) {
  const program = fs.readFileSync(script, "utf-8");
  const outputs = execute(program);
  display(outputs);
};

main(process.argv[2]);
