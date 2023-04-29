const fs = require("fs");

const isVisible = function(path) {
  return /^[^.]/.test(path);
};

const ls = function({pwd}) {
  const contents = fs.readdirSync(pwd);
  const visibleContents = contents.filter(isVisible).join(" ");

  return {pwd, output: {message: visibleContents, code: 0}};
};

const pwd = function({pwd}) {
  return {pwd, output: {message: pwd, code: 0}};
};

const normalizePath = function(path) {
  const pathTokens = path.split("/");
  const normalizePathTokens = [];

  pathTokens.forEach(function(token) {
    if(token === "..") {
      normalizePathTokens.pop();
    } else if(token != ".") {
      normalizePathTokens.push(token);
    }
  });

  return normalizePathTokens.join("/");
};

const isAbsolute = function(path) {
  return `${path}`.startsWith("/");
};

const cdError = function(path) {
  return `cd: ${path}: No such file or directory`;
};

const cd = function({pwd}, target, ...rest) {
  const path = isAbsolute(target) ? target : normalizePath(`${pwd}/${target}`);
  const output = {};

  [pwd, output.code, output.message] = fs.existsSync(path) ? [path, 0] : [pwd, 1, cdError(path)];

  return {pwd, output};
};

const instructions = {ls, pwd, cd};

const isValidInstruction = function(instruction) {
  return instructions[instruction] !== undefined;
};

exports.instructions = instructions;
exports.isValidInstruction = isValidInstruction;
