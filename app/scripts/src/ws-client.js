let socket;

function init(url) {
  socket = new WebSocket(url);
  console.log('connecting...');
}

function registerOpenHandler(handlerFunction) {
  socket.onopen = () => {
    console.log('open');
    handlerFunction();
  };
}

function registerMessageHandler(handlerFunction) {
  socket.onmessage = (e) => {
    console.log('message', e.data);
    let data = JSON.parse(e.data);
    handlerFunction(data);
  };
}

function registerCloseHandler(handlerFunction) {
  socket.onclose = () => {
    console.log('close');
  };
}

function sendMessage(payload) {
  socket.send(JSON.stringify(payload));
}

function closeSocket() {
  socket.close();
}

export default {
  init,
  registerOpenHandler,
  registerMessageHandler,
  registerCloseHandler,
  closeSocket,
  sendMessage
};
