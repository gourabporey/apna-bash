const {describe, it} = require("node:test");
const {deepStrictEqual} = require("assert");
const {execute} = require("./main.js");

describe("Execute()", function() {
  it("Should return list of files and directories when ls is being run", function() {
    deepStrictEqual(execute("ls"), "apna-bash-test.js apna-script.ab demo-dir main.js");
  });

  it("Should give the present working directory", function() {
    deepStrictEqual(execute("pwd"), "/Users/gourabporey/projects/js/april/apna-bash");
  });
});


