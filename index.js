const http = require('http');
const fs = require('fs');
const mime = require('mime');
const extract = require('./extract');
const wss = require('./websockets-server');

const handleError = function (err, res) {
  res.writeHead(404);
  fs.readFile('app/404.html', function (err, data) {
    if (err) {
      res.end();
    }
    res.end(data);
  });
};

const server = http.createServer(function (req, res) {
  console.log('Responding to a request.');
  const filePath = extract(req.url);

  fs.readFile(filePath, function (err, data) {
    if (err) {
      handleError(err, res);
    } else {
      res.setHeader('Content-Type', mime.getType(filePath));
      res.end(data);
    }
  });
});

server.listen(3000);
