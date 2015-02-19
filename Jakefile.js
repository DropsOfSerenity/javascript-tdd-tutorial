/* global desc, task, jake, fail, complete */
(function() {
  "use strict";

  desc("Lint and Test the code");
  task("default", ["lint", "test"]);

  desc("Lint the code");
  task("lint", ["node"], function() {
    var lint = require("./build/lint/lint.js");
    var files = new jake.FileList();
    files.include("**/*.js");
    files.exclude("node_modules");

    var passed = lint.validateFileList(files.toArray(), nodeLintOptions(), {});
    if (!passed) fail("Lint failed");
  });

  desc("Test the code");
  task("test", ["node"], function() {
    var Mocha = require("mocha");
    var mocha = new Mocha({reporter: "spec", ui: "bdd"});

    mocha.addFile("./src/server/_server_test.js");
    mocha.run(function(failures) {
      if (failures)
        fail("Tests have failed");
      else
        complete();
    });
  }, {async: true});

  desc("Integrate");
  task("integrate", ["default"], function() {
    console.log("do the integration");
  });

  task("node", [], function() {
    var NODE_VERSION = "v0.12.0";

    sh("node --version", function(stdout) {
      if (stdout !== NODE_VERSION)
        fail("Incorrect node version, expected: " + NODE_VERSION);
      complete();
    });
  }, {async: true});

  function sh(command, callback) {
    console.log("> " + command);

    var stdout = "";
    var process = jake.createExec(command, {printStdout: true, printStderr: true});
    process.on("stdout", function(chunk) {
      stdout += chunk;
    });
    process.on("cmdEnd", function() {
      stdout = stdout.replace(/^\s+|\s+$/g, '');
      console.log(stdout);
      console.log();
      callback(stdout);
    });
    process.run();
  }

  function nodeLintOptions() {
    return {
      bitwise: true,
      curly: false,
      eqeqeq: true,
      forin: true,
      immed: true,
      latedef: true,
      newcap: true,
      noarg: true,
      noempty: true,
      nonew: true,
      regexp: true,
      undef: true,
      strict: true,
      trailing: true,
      node: true
    };
  }
})();
