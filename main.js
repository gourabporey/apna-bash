const fs = require("fs");
const commands = fs.readFileSync(process.argv[2], "utf-8");

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

const ls = function({pwd}) {
  console.log(fs.readdirSync(pwd).join(" "));
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

const execute = function(commands) {
  const parsedText = parse(commands);

  let environment = {
    pwd: process.env.PWD
  };

  parsedText.forEach(function(args) {
    environment = instructions[args.command](environment, args.argument);
  });

  return environment;
};

execute(commands);
