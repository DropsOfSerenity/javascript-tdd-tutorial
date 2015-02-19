/* global beforeEach, done, afterEach, describe, it, require */
(function() {
  "use strict";

  var assert = require("chai").assert,
  expect = require("chai").expect,
    server = require("./server"),
    fs = require("fs"),
      http = require("http");

  var TEST_FILE = "generated/test/home.html";
  var TEST_404_FILE = "generated/test/404.html";

  describe("server", function() {
    beforeEach(function() {
      server.start(TEST_FILE, TEST_404_FILE, 8080);
    });

    afterEach(function() {
      cleanUpFile(TEST_FILE);
      cleanUpFile(TEST_404_FILE);
      server.stop();
    });

    it("requires a file to serve", function(done) {
      server.stop();
      expect(function() {
        server.start(null, 8080);
      }).to.throw(Error);
      done();
    });

    // integration test
    it("should serve a file", function(done) {
      var testData = "This is text from a file";
      fs.writeFileSync(TEST_FILE, testData);

      httpGet("http://localhost:8080/", function(res, resData) {
        expect(res.statusCode).to.eq(200);
        expect(resData).to.eq(testData);
        done();
      });
    });

    it("should serve a custom 404 file for everything but /", function(done) {
      var test404Data = "This is a 404 Page";
      fs.writeFileSync(TEST_404_FILE, test404Data);
      httpGet("http://localhost:8080/anotherurl/", function(res, resData) {
        expect(res.statusCode).to.eq(404);
        expect(resData).to.eq(test404Data);
        done();
      });
    });

    it("returns homepage when asked for index", function(done) {
      var testData = "This is text from a file";
      fs.writeFileSync(TEST_FILE, testData);
      httpGet("http://localhost:8080/index.html", function(res, resData) {
        expect(res.statusCode).to.eq(200);
        expect(resData).to.eq(testData);
        done();
      });
    });

    it("should run callback when stop completes", function(done) {
      server.stop(function() {
        done();
      });
    });

    it("should throw exception when server is called without port number", function(done) {
      server.stop();
      expect(function() {
        server.start();
      }).to.throw(Error);
      done();
    });

    function httpGet(url, callback) {
      http.get(url, function(res) {
        res.setEncoding("utf8");
        var data = "";
        res.on("data", function(chunk) {
          data += chunk;
        });
        res.on("end", function() {
          return callback(res, data);
        });
      });
    }

    function cleanUpFile(file) {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
        assert(!fs.existsSync(file), "unable to clean up test file: [" + file + "]");
      }
    }

  });
}());
