/* global beforeEach, done, afterEach, describe, it, require */

// launch the server
// get a page

(function () {
  "use strict";

  var assert = require("chai").assert,
      child_process = require("child_process"),
      expect = require("chai").expect,
      server = require("./server/server"),
      fs = require("fs"),
      http = require("http");

  describe("server", function() {
    it("not blow up in smoke", function(done) {
      var command = "node weewikipaint 8080";
      child_process.exec(command, function(err, stdout, stderr) {
        if (err !== null) {
          console.log(stdout);
          console.log(stderr);
          throw err;
        }
        done();
      });
    });
  });

}());
