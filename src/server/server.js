"use strict";

var http = require("http"),
    fs = require("fs"),
    server;

exports.start = function(htmlFileToServe, portNumber) {
  if (!portNumber) throw new Error("start requires port number");
  if (!htmlFileToServe) throw new Error("requires a file to server");

  server = http.createServer();
  server.on("request", function(req, res) {
    if (req.url === "/" || req.url === "/index.html") {
      fs.readFile(htmlFileToServe, function(err, data) {
        if (err) throw err;
        res.end(data);
      });
    } else {
      res.statusCode = 404;
      res.end();
    }
  });

  server.listen(portNumber);
};

exports.stop = function(callback) {
  server.close(callback);
};
