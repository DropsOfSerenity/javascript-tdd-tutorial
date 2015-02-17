"use strict";

var http = require("http");
var server;

exports.start = function(portNumber) {
  server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Hello World");
  });
  server.listen(portNumber); // TODO: remove duplication of port number
};

exports.stop = function(callback) {
  server.close(callback);
};
