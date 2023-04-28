const {instructions, isValidInstruction} = require("./instructions.js");

const tokenize = function(commands) {
  return commands.replace(/\n*$/, "").split("\n").map(function(token) {
    return token.split(" ");
  });
};

const parse = function(commands) {
  const tokens = tokenize(commands);

  return tokens.reduce(function(instructions, token) {
    if(token.length === 1) {
      return [...instructions, {command: token[0]}];
    }

    return [...instructions, {command: token[0], argument: token[1]}];
  }, []);
};

const execute = function(commands) {
  const parsedText = parse(commands);

  let environment = {
    pwd: process.env.PWD
  };

  parsedText.forEach(function(args) {
    environment = isValidInstruction(args.command) ? 
      instructions[args.command](environment, args.argument) :
      environment;
  });

  return environment;
};

exports.execute = execute;
