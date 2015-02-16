/* global desc, task, jake, fail, complete */
(function() {
  "use strict";

  task("default", ["lint", "test"]);

  desc("Lint the code");
  task("lint", [], function() {
    var lint = require("./build/lint/lint.js");
    var files = new jake.FileList();
    files.include("**/*.js");
    files.exclude("node_modules");

    var passed = lint.validateFileList(files.toArray(), nodeLintOptions(), {});
    if (!passed) fail("Lint failed");
  });

  desc("Test the code");
  task("test", [], function() {
    var Mocha = require("mocha");
    var mocha = new Mocha({reporter: "spec", ui: "bdd"});

    mocha.addFile("./src/server/_server_test.js");
    mocha.run(function(failures) {
      if (failures) fail("Tests have failed");
    });
  });

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
