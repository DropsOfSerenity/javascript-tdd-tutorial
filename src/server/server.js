"use strict";

var http = require("http");
var server;

exports.start = function(portNumber) {
  if (!portNumber) throw new Error("start requires port number");
  server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Hello World");
  });
  server.listen(portNumber);
};

exports.stop = function(callback) {
  server.close(callback);
};
