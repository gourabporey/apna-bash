class CommandHandler {
   constructor(pathHandler, environment, fileSystem) {
      this.pathHandler = pathHandler;
      this.environment = environment;
      this.fileSystem = fileSystem;
   }

   ls() {
      const contents = this.fileSystem.readdirSync(this.environment.pwd);
      const visibleContents = contents.filter(this.pathHandler.isVisible).join(' ');

      return { environment: this.environment, output: { message: visibleContents, code: 0 } };
   }

   pwd() {
      return { environment: this.environment, output: { message: this.environment.pwd, code: 0 } }
   }

   throwError(path) {
      return `cd: ${path}: No such file or directory`;
   };

   cd(target) {
      const path = this.pathHandler.isAbsolute(target) ?
         target : this.pathHandler.normalizePath(`${this.environment.pwd}/${target}`);

      if (this.fileSystem.existsSync(path)) {
         this.environment.pwd = path;
         return { environment: { pwd: path }, output: { code: 0 } };
      };

      return { environment: this.environment, output: { code: 1, message: this.throwError(path) } };
   }

   isValidCommand(command) {
      return command in this;
   }
}

exports.CommandHandler = CommandHandler;