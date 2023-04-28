const fs = require("fs");

const ls = function({pwd}) {
  const contents = fs.readdirSync(pwd);
  const visibleContents = contents.filter(function(content) {
    return /^[^.]/.test(content);
  }).join(" ");

  console.log(visibleContents);

  return {pwd};
};

const pwd = function({pwd}) {
  console.log(pwd);
  return {pwd};
};

const cd = function({pwd}, target) {
  const path = `${pwd}/${target}`;

  if(fs.existsSync(path)) {
    console.log(path);
    pwd = path;
  } else {
    console.error(`cd: ${target}: No such file or directory`);
  }

  return {pwd};
};

const instructions = {ls, pwd, cd};

const isValidInstruction = function(instruction) {
  return instructions[instruction] !== undefined;
};

exports.instructions = instructions;
exports.isValidInstruction = isValidInstruction;
