const fs = require("fs");

const isVisible = function(path) {
  return /^[^.]/.test(path);
};

const ls = function(environment) {
  const contents = fs.readdirSync(environment.pwd);
  const visibleContents = contents.filter(isVisible).join(" ");

  return {environment, output: {message: visibleContents, code: 0}};
};

const pwd = function(environment) {
  return {environment, output: {message: environment.pwd, code: 0}};
};

const normalizePath = function(path) {
  const pathTokens = path.split("/");
  const normalizePathTokens = [];

  pathTokens.forEach(function(token) {
    if(token === "..") {
      normalizePathTokens.pop();
      return;
    } 

    if(token != ".") {
      normalizePathTokens.push(token);
    }
  });

  return normalizePathTokens.join("/");
};

const isAbsolute = function(path) {
  return `${path}`.startsWith("/");
};

const throwError = function(path) {
  return `cd: ${path}: No such file or directory`;
};

const cd = function(environment, target) {
  const path = isAbsolute(target) ? target : normalizePath(`${environment.pwd}/${target}`);
  const output = {};

  if(fs.existsSync(path)) {
    return {environment: {pwd: path}, output: {code: 0}};
  };

  return {environment, output: {code: 1, message: throwError(path)}};
};

const commands = {ls, pwd, cd};

const isValidCommand = function(instruction) {
  return commands[instruction] !== undefined;
};

exports.commands = commands;
exports.isValidCommand = isValidCommand;
