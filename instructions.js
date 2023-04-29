const fs = require("fs");

const ls = function({pwd}) {
  const contents = fs.readdirSync(pwd);
  const isVisible = /^[^.]/;

  const visibleContents = contents.filter(function(content) {
    return isVisible.test(content);
  }).join(" ");

  return {pwd, output: {message: visibleContents, code: 0}};
};

const pwd = function({pwd}) {
  return {pwd, output: {message: pwd, code: 0}};
};

const cd = function({pwd}, target) {
  const path = `${pwd}/${target}`;
  const output = {};

  if(fs.existsSync(path)) {
    output.code = 0;
    pwd = `${path}`;
  } else {
    output.message = `cd: ${target}: No such file or directory`;
    output.code = 1;
  }

  return {pwd, output};
};

const instructions = {ls, pwd, cd};

const isValidInstruction = function(instruction) {
  return instructions[instruction] !== undefined;
};

exports.instructions = instructions;
exports.isValidInstruction = isValidInstruction;
