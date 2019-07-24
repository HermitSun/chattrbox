const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;
const port = 3001;
const MAX_PAYLOAD = 100;
const ws = new WebSocketServer({
  port,
  maxPayload: MAX_PAYLOAD
});

const chatRoomToMessageMap = {}; // [roomName: string]: Message[]
const chatRoomToClientMap = {}; // [roomName: string]: WebSocket[]

let currentChatRoom;

console.log('WebSockets server started');

// 监听连接事件
ws.on('connection', function (socket, request) {
  console.log('client connection established');

  // 监听消息事件
  socket.on('message', function (data) {
    console.log('message received: ' + data);
    if (JSON.parse(data).targetChatRoom) { // 这种消息是专门用来建立聊天室的，不应该push进消息数组
      currentChatRoom = JSON.parse(data).targetChatRoom;
      chatRoomToClientMap[currentChatRoom] = chatRoomToClientMap[currentChatRoom] || []; // 如果没有就新建一个
      if (chatRoomToClientMap[currentChatRoom].length > MAX_PAYLOAD) {
        chatRoomToClientMap[currentChatRoom].shift(); // TODO:去重
      }
      chatRoomToClientMap[currentChatRoom].push(socket);
      // 事实上，我并没有什么好办法去重，因为每次刷新都会建立一个新的连接对象。
      // 可以设置最大连接数，超过最大值的时候让一开始的连接出队。但是这样的实现存在判断连接是否alive的问题，其实也不合适。
      // 而且如果维护一个连接是否活跃的Map，开销又有点大了。头疼啊。
      // 就先这样了，设置一个最大连接数让ws自己操心去。显然，现在的实现会有明显的性能瓶颈。
      chatRoomToMessageMap[currentChatRoom] = chatRoomToMessageMap[currentChatRoom] || []; // 如果没有就新建一个
      chatRoomToMessageMap[currentChatRoom].forEach((msg) => {
        socket.send(msg); // 建立连接后把当前聊天室的消息发过去
      });
      socket.send(JSON.stringify({
        chatRooms: Object.keys(chatRoomToMessageMap), // 顺便告诉他还有哪些可选的聊天室
        currentChatRoom                    // 以及现在是哪个聊天室（类似于握手的实现，双重确认）
      }));
    } else { // 正常的消息就正常添加和发送
      chatRoomToMessageMap[currentChatRoom].push(data);
      chatRoomToClientMap[currentChatRoom].forEach(socket => {
        socket.send(data);
      });
    }
    console.log(chatRoomToMessageMap);
    // console.log(chatRoomToClientMap);
  });
});
