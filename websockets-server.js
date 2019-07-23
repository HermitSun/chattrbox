const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;
const port = 3001;
const ws = new WebSocketServer({
  port
});
const messages = [];

console.log('WebSockets server started');

// 监听连接事件
ws.on('connection', function (socket) {
  console.log('client connection established');
  // 按照书上的要求，去掉了服务器的存储
  // 如果不去掉会出现消息重复两次的情况……本地一次服务器一次
  // messages.forEach(function (msg) {
  //   socket.send(msg);
  // });

  // 监听消息事件
  socket.on('message', function (data) {
    console.log('message received: ' + data);
    messages.push(data);
    ws.clients.forEach(function (clientSocket) {
      clientSocket.send(data);
    });
  });
});
