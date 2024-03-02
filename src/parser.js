class Parser {
   #tokenize(rawText) {
      return rawText.replace(/\n*$/, '').split('\n').map(token => token.split(' '));
   }

   parse(rawText) {
      const tokens = this.#tokenize(rawText);
      return tokens.map(token => ({ command: token[0], argument: token.slice(1) }));
   }
}

exports.Parser = Parser;