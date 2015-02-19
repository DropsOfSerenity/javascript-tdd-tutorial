"use strict";

// serving a static file in node
var http = require("http");
var fs = require("fs");

var server = http.createServer();

server.on("request", function(req, res) {
  fs.readFile("index.html", function(err, data) {
    res.end(data);
  });
});

console.log("listening on http://localhost:8080/");
server.listen(8080);
