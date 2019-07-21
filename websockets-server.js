const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;
const port = 3001;
const ws = new WebSocketServer({
  port
});
const messages = [];
let isAuthorized = false;

console.log('WebSockets server started');

// 监听连接事件
ws.on('connection', function (socket) {
  console.log('client connection established');
  messages.forEach(function (msg) {
    socket.send(msg);
  });

  // 监听消息事件
  socket.on('message', function (data) {
    console.log('message received: ' + data);
    messages.push(data);
    if (isAuthorized) {
      ws.clients.forEach(function (clientSocket) {
        clientSocket.send(data);
        // clientSocket.send(data);
      });
    }
    if (data === 'Swordfish' && !isAuthorized) {
      ws.clients.forEach(function (clientSocket) {
        messages.forEach(function (msg) {
          clientSocket.send(msg);
        });
      });
      isAuthorized = true;
    }
  });
});
