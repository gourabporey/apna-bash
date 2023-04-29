const {describe, it} = require("node:test");
const {deepStrictEqual} = require("assert");
const {execute} = require("./apna-bash.js");

describe("Execute()", function() {
  describe("ls", function() {
    it("Should return list of files and directories when ls is being run", function() {
      deepStrictEqual(execute("ls"), [{ message: "apna-bash-test.js apna-bash.js apna-script.ab demo-dir instructions.js main.js", code: 0}]);
    });
  });

  describe("pwd", function() {
    it("Should give the present working directory", function() {
      deepStrictEqual(execute("pwd"), [{message: "/Users/gourabporey/projects/js/april/apna-bash", code: 0}]);
    });
  });

  describe("cd", function() {
    it("Should give the present working directory", function() {
      deepStrictEqual(execute("cd ."), [{environment: {pwd: ""}, outputs: [{code: 0}]}]);
    });
  });
});


