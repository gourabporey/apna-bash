const fs = require("fs");
const {execute} = require("./interpreter.js");

const main = function() {
  const commands = fs.readFileSync(process.argv[2], "utf-8");
  return execute(commands);
};

main();
