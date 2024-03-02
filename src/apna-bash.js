class ApnaBash {
   constructor(script, environment, parser, commandHandler) {
      this.script = script;
      this.environment = environment;
      this.parser = parser;
      this.commandHandler = commandHandler;
      this.log = [];
   }

   getFailureOutput(command) {
      return { message: `apna-bash: ${command} : No such command`, code: 1 };
   }

   execute(args) {
      if (!this.commandHandler.isValidCommand(args.command)) {
         this.log.push({
            output: { command: args, output: this.getFailureOutput(args.command) }
         });
      }

      const result = this.commandHandler[args.command](...args.argument);
      this.log.push({ command: args, output: result.output });
   }

   run() {
      const parsedText = this.parser.parse(this.script);

      parsedText.forEach(instruction => {
         this.execute(instruction)
      });

      return { environment: this.environment, log: this.log };
   }
}

/*
const getFailureOutput = function (command) {
   return { message: `apna-bash: ${command} : No such command`, code: 1 };
};

const execute = function (commandHandler, args, environment) {
   if (!commandHandler.isValidCommand(args.command)) {
      return { environment, output: { command: args, output: getFailureOutput(args.command) } };
   }

   return commandHandler[args.command](...args.argument);
};

const updateLog = function (log, instruction, result) {
   return [...log, { command: instruction, output: result.output }];
};

const run = function (script) {
   let environment = {
      pwd: process.env.PWD
   };
   const parser = new Parser(script);
   const commandHandler = new CommandHandler(new PathHandler(), environment, fs);
   const parsedText = parser.parse();
   let log = [];

   parsedText.forEach((instruction) => {
      const result = execute(commandHandler, instruction, environment);
      environment = result.environment;
      log = updateLog(log, instruction, result);
   });

   return { environment, log };
};

exports.run = run;
*/

exports.ApnaBash = ApnaBash;