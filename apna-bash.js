const {instructions, isValidInstruction} = require("./instructions.js");

const tokenize = function(commands) {
  return commands.replace(/\n*$/, "").split("\n").map(function(token) {
    return token.split(" ");
  });
};

const parse = function(commands) {
  const tokens = tokenize(commands);

  return tokens.reduce(function(instructions, token) {
    return [...instructions, {command: token[0], argument: token.slice(1)}];
  }, []);
};

const getFailureOutput = function(command) {
  return {message: `apna-bash: ${args.command} : No such command`, code: 1};
};

const execute = function({environment, log}, args) {
  if(!isValidInstruction(args.command)) {
    return {environment, log: [...log, {command: args, output: getFailureOutput(args.command)}]};
  }

  const command = instructions[args.command];
  const {pwd, output} = command(environment, args.argument);
  environment.pwd = pwd;
  return {environment, log: [...log, {command: args, output}]};
};

const run = function(script) {
  const parsedText = parse(script);
  const log = [];
  let environment = {
    pwd: process.env.PWD
  };

  return parsedText.reduce(execute, {environment, log});
};

exports.run = run;
