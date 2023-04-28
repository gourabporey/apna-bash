const fs = require("fs");

const commands = fs.readFileSync(process.argv[2], "utf-8").split("\n");

const run = function(commands) {
  let pc = 0;
  let pwd = process.env.PWD;

  while(pc < commands.length) {
    if(commands[pc] === "ls") {
      let fileAndDirs = fs.readdirSync(pwd);
      console.log(fileAndDirs.join(" "));
    }

    if(commands[pc] === "pwd") {
      console.log(process.env.PWD);
    }

    const cdRegex = /^cd/;
    if(cdRegex.test(commands[pc])) {
      const dir = commands[pc].split(" ")[1];
      const dirPath = `${pwd}/${dir}`;

      if(fs.existsSync(dirPath)) {
        console.log(dirPath);
        pwd = dirPath;
      }
    }

    pc++;
  }
};

run(commands);
