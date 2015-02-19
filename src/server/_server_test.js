/* global before, done, after, describe, it, require */
"use strict";

var assert = require("chai").assert,
    expect = require("chai").expect,
    server = require("./server"),
    fs = require("fs"),
    http = require("http");

describe("server", function() {
  before(function() {
    server.start(8080);
  });

  after(function() {
    server.stop();
  });

  it("should return 200 to get request", function(done) {
    http.get("http://localhost:8080/", function(res) {
      expect(res.statusCode).to.eq(200);
      done();
    });
  });

  // integration test
  it("should serve a file", function(done) {
    var testDir = "generated/test";
    var testFile = testDir + "/test.html";
    fs.writeFileSync(testFile, "Hello World");
    done();
  });

  it("should return Hello World in response", function(done) {
    http.get("http://localhost:8080/", function(res) {
      res.setEncoding("utf8");
      res.on("data", function(chunk) {
        expect(chunk).contains("Hello World");
      });
      res.on("end", function() {
        done();
      });
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
});
