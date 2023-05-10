const {commands, isValidCommand} = require("./apna-commands.js");

const tokenize = function(commands) {
  return commands.replace(/\n*$/, "").split("\n").map(function(token) {
    return token.split(" ");
  });
};

const parse = function(commands) {
  const tokens = tokenize(commands);

  return tokens.map(function(token) {
    return {command: token[0], argument: token.slice(1)};
  });
};

const getFailureOutput = function(command) {
  return {message: `apna-bash: ${args.command} : No such command`, code: 1};
};

const execute = function(args, environment) {
  if(!isValidCommand(args.command)) {
    return {environment, output: {command: args, output: getFailureOutput(args.command)}};
  }

  const command = commands[args.command];
  return command(environment, args.argument);
};

const updateLog = function(log, instruction, result) {
  return [...log, {command: instruction, output: result.output}];
};

const run = function(script) {
  const parsedText = parse(script);
  let log = [];
  let environment = {
    pwd: process.env.PWD
  };

  parsedText.forEach(function(instruction) {
    const result = execute(instruction, environment);
    environment = result.environment;
    log = updateLog(log, instruction, result);
  });

  return {environment, log};
};

exports.run = run;
