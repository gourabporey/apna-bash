const fs = require("fs");

const ls = function({pwd}) {
  const contents = fs.readdirSync(pwd);
  const isVisible = /^[^.]/;

  const visibleContents = contents.filter(function(content) {
    return isVisible.test(content);
  }).join(" ");

  const output = {
    message: visibleContents,
    code: 0,
  };

  return {pwd, output};
};

const pwd = function({pwd}) {
  const output = {
    message: pwd,
    code: 0,
  };

  return {pwd, output};
};

const cd = function({pwd}, target) {
  const path = `${pwd}/${target}`;
  const output = {};

  if(fs.existsSync(path)) {
    output.message = path;
    output.code = 0;
    pwd = path;
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
