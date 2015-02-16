"use strict";

var http = require("http");
var server;

exports.start = function() {
  server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Hello\n");
  });
  server.listen(8080); // TODO: remove duplication of port number
};

exports.stop = function(callback) {
  server.close(callback);
};
