const {describe, it} = require("node:test");
const {deepStrictEqual} = require("assert");
const {run} = require("./apna-bash.js");

describe("Execute()", function() {
  describe("ls", function() {
    const actual = run("ls");
    const expected = {
      environment: {pwd: "/Users/gourabporey/projects/js/april/apna-bash"},
      log: [{
        command: { command: "ls", argument: []},
        output: { message: "apna-bash-test.js apna-bash.js apna-script.ab demo-dir instructions.js main.js", code: 0}
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
      log: [
        {
          command: {command: "pwd", argument: []},
          output: {message: "/Users/gourabporey/projects/js/april/apna-bash", code:0}
        }]
    };

    it("Should give the present working directory", function() {
      deepStrictEqual(actual, expected);
    });
  });

  describe("cd", function() {
    let actual = run("cd demo-dir");
    let expected = {
      environment: {pwd: "/Users/gourabporey/projects/js/april/apna-bash/demo-dir"},
      log: [
        {
          command: {command: "cd", argument: ["demo-dir"]},
          output: {code:0, message: undefined}
        }]
    };

    it("Should give a new environment", function() {
      deepStrictEqual(actual, expected);
    });

    actual = run("cd demo-dir\npwd");
    expected = {
      environment: {pwd: "/Users/gourabporey/projects/js/april/apna-bash/demo-dir"},
      log: [
        {
          command: {command: "cd", argument: ["demo-dir"]},
          output: {code: 0, message: undefined}
        }, 
        {
          command: {command: "pwd", argument: []},
          output: {code: 0, message: "/Users/gourabporey/projects/js/april/apna-bash/demo-dir"}
        }]
    };

    it("Should give a new environment", function() {
      deepStrictEqual(actual, expected);
    });
  });
});


