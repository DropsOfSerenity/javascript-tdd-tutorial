"use strict";

var http = require("http");
var server = http.createServer();

server.on("request", function(request, response) {
  console.log("Received request");
  var body = "<html><head><title>Node Server</title></head><body>Node Body</body></html>";
  response.end(body);
});

server.listen(8080);
console.log("Server running at http://127.0.0.1:8080/");
