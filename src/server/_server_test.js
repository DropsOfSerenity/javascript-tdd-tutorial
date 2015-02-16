/* global before, done, after, describe, it, require */
"use strict";

var assert = require("chai").assert,
    expect = require("chai").expect,
    server = require("./server"),
    http = require("http");

describe("server", function() {
  before(function() {
    console.log("starting server");
    server.start();
  });

  after(function() {
    server.stop(function() {
      console.log("stopping server");
    });
  });

  it("should return 200", function(done) {
    http.get("http://localhost:8080/", function(res) {
      expect(res.statusCode).to.eq(200);
      done();
    });
  });
});
