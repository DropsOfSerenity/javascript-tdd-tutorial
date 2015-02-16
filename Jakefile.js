desc("Build and test");
task("default", ["lint"], function() {
  console.log("default");
});

desc("Lint the code");
task("lint", [], function() {
  console.log("Lint code goes here");
  var lint = require("./build/lint/lint.js");
  lint.validateFile("Jakefile.js", {}, {});
});
