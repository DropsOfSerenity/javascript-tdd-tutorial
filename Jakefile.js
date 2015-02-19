/* global directory, desc, task, jake, fail, complete */
(function() {
  "use strict";

  var GENERATED_DIR = "generated";
  var TEMP_TESTFILE_DIR = GENERATED_DIR + "/test";
  directory(TEMP_TESTFILE_DIR);

  desc("Delete all generated files");
  task("clean", [], function() {
    jake.rmRf(GENERATED_DIR);
  });

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
  task("test", ["node", TEMP_TESTFILE_DIR], function() {
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

    var expected = parseNodeVersion("expected", NODE_VERSION);
    var actual = parseNodeVersion("actual", process.version);

    if (actual < expected)
      fail("Node version too low, expect >=" + NODE_VERSION);

    complete();
  }, {async: true});

  function parseNodeVersion(description, versionString) {
    var NODE_VERSION_MATCHER = /^v(\d+)\.(\d+)\.(\d+)$/;
    var regexedVersion = versionString.match(NODE_VERSION_MATCHER);

    var major = regexedVersion[1];
    var minor = regexedVersion[2];
    var bugfix = regexedVersion[3];
    return [major, minor, bugfix];
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
