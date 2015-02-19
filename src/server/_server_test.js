/* global beforeEach, done, afterEach, describe, it, require */
"use strict";

var assert = require("chai").assert,
    expect = require("chai").expect,
    server = require("./server"),
    fs = require("fs"),
    http = require("http");

var TEST_FILE = "generated/test/test.html";

describe("server", function() {
  beforeEach(function() {
    server.start(TEST_FILE, 8080);
  });

  afterEach(function() {
    if (fs.existsSync(TEST_FILE)) {
      fs.unlinkSync(TEST_FILE);
    }
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

  it("should return 404 for everything but /", function(done) {
    httpGet("http://localhost:8080/anotherurl/", function(res, resData) {
      expect(res.statusCode).to.eq(404);
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

});
