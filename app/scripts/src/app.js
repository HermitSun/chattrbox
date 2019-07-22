import socket from './ws-client';
import {UserStore} from "./storage";
import {ChatForm, ChatList, promptForUsername} from "./dom";

const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';
const LIST_SELECTOR = '[data-chat="message-list"]';

const userStore = new UserStore('x-chattrbox/u');
let username = userStore.get();
if (!username) {
  username = promptForUsername();
  userStore.set(username);
}

class ChatApp {
  constructor() {
    this.chatForm = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR);
    this.chatList = new ChatList(LIST_SELECTOR, username);
    socket.init('ws://localhost:3001');
    socket.registerOpenHandler(() => {
      this.chatForm.init((text) => {
        const message = new ChatMessage({message: text});
        socket.sendMessage(message.serialize());
      });
      this.chatList.init();
    });
    socket.registerMessageHandler((data) => {
      console.log(data);
      const message = new ChatMessage(data);
      this.chatList.drawMessage(message.serialize());
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
                user: u = username,
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
