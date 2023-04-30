const {describe, it} = require("node:test");
const {deepStrictEqual} = require("assert");
const {run} = require("../lib/apna-bash.js");
const {expandWildCard} = require("../lib/path-handler.js");

describe("run()", function() {
  describe("ls", function() {
    const actual = run("ls");
    const expected = {
      environment: {pwd: "/Users/gourabporey/projects/js/april/apna-bash"},
      log: [{
        command: { command: "ls", argument: []},
        output: { message: "lib src test", code: 0}
      }]
    };

    it("Should return list of files and directories when ls is being run", function() {
      deepStrictEqual(actual, expected);
    });
  });

  describe("pwd", function() {
    const actual = run("pwd");
    const expected = {
      environment: {pwd: "/Users/gourabporey/projects/js/april/apna-bash"},
      log: [{
        command: {command: "pwd", argument: []},
        output: {message: "/Users/gourabporey/projects/js/april/apna-bash", code:0}
      }]
    };

    it("Should give the present working directory", function() {
      deepStrictEqual(actual, expected);
    });
  });

  describe("cd", function() {
    let actual = run("cd lib");
    let expected = {
      environment: {pwd: "/Users/gourabporey/projects/js/april/apna-bash/lib"},
      log: [{
        command: {command: "cd", argument: ["lib"]},
        output: {code:0}
      }]
    };

    it("Should give a new environment", function() {
      deepStrictEqual(actual, expected);
    });

    actual = run("cd lib\npwd");
    expected = {
      environment: {pwd: "/Users/gourabporey/projects/js/april/apna-bash/lib"},
      log: [{
        command: {command: "cd", argument: ["lib"]},
        output: {code: 0}
      }, {
        command: {command: "pwd", argument: []},
        output: {code: 0, message: "/Users/gourabporey/projects/js/april/apna-bash/lib"}
      }]
    };

    it("Should give a new environment and show the present working directory", function() {
      deepStrictEqual(actual, expected);
    });
  });
});

describe("expandWildCard()", function() {
  it("Should give the path back when there is no wildCard expansion", function() {
    deepStrictEqual(expandWildCard("apna-bash"), ["apna-bash"]);
  });

  it("Should give all files back in the pwd", function() {
    let wildCard = "/Users/gourabporey/projects/js/april/apna-bash/*"
    let expected = ["lib", "src", "test"];
    deepStrictEqual(expandWildCard(wildCard), expected); 
  });
});
