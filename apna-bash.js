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

const execute = function(commands) {
  const parsedText = parse(commands);

  let environment = {
    pwd: process.env.PWD
  };

  const outputs = [];

  parsedText.forEach(function(args) {
    if(!isValidInstruction(args.command)) {
      outputs.push({
        message: `apna-bash: ${args.command} : No such command`,
        code: 1
      });
    } else {
      const {pwd, output} = instructions[args.command](environment, args.argument);
      environment.pwd = pwd;
      outputs.push(output);
    }
  });

  return outputs;
};

exports.execute = execute;
