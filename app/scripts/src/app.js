import socket from './ws-client';

class ChatApp {
  constructor() {
    socket.init('ws://localhost:3001');
    socket.registerOpenHandler(() => {
      const message = new ChatMessage({message: 'pow!'});
      socket.sendMessage(message.serialize());
    });
    socket.registerMessageHandler((data) => {
      console.log(data);
    });
    // socket.registerCloseHandler(setTimeout(() => {
    //   console.log('Will close. Please restart manually in console.');
    //   socket.closeSocket();
    //   setTimeout(() => {
    //     socket.init('ws://localhost:3001');
    //   }, 5000);
    // }, 1000));
  }

  // restart() {
  //   socket.init('ws://localhost:3001');
  // }
}

class ChatMessage {
  constructor({
                message: m,
                user: u = 'batman',
                timestamp: t = (new Date()).getTime()
              }) {
    this.message = m;
    this.user = u;
    this.timestamp = t;
  }

  serialize() {
    return {
      user: this.user,
      message: this.message,
      timestamp: this.timestamp
    };
  }
}

export default ChatApp;
