(function() {
  "use strict";

  var http = require("http"),
      fs = require("fs"),
      server;

  exports.start = function(homepageToServe, missingPageToServe, portNumber) {
    if (!portNumber) throw new Error("start requires port number");
    if (!homepageToServe) throw new Error("requires a file to server");

    server = http.createServer();
    server.on("request", function(req, res) {
      if (req.url === "/" || req.url === "/index.html") {
        res.statusCode = 200;
        serveFile(res, homepageToServe);
      } else {
        res.statusCode = 404;
        serveFile(res, missingPageToServe);
      }
    });

    server.listen(portNumber);
  };

  function serveFile(res, file) {
    fs.readFile(file, function(err, data) {
      if (err) throw err;
      res.end(data);
    });
  }

  exports.stop = function(callback) {
    server.close(callback);
  };
}());
