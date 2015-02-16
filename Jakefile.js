/* global desc, task, jake, file, complete */

"use strict";

desc("Build and test");
task("default", ["lint"], function() {
  console.log("default");
});

desc("Lint the code");
task("lint", [], function() {
  console.log("Lint code goes here");
  var lint = require("./build/lint/lint.js");
  var files = new jake.FileList();
  files.include("**/*.js");
  files.exclude("node_modules");
  files.exclude("build");

  var options = {
    node: true
  };

  lint.validateFileList(files.toArray(), options, {});
});
