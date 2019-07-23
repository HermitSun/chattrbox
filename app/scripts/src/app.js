import socket from './ws-client';
import {MessageStore, UserStore} from "./storage";
import {ChatForm, ChatList, promptForUsername} from "./dom";

const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';
const LIST_SELECTOR = '[data-chat="message-list"]';

const userStore = new UserStore('x-chattrbox/u');
const messageStore = new MessageStore('x-chattrbox/m');

let username = userStore.get();
if (!username) {
  username = promptForUsername();
  userStore.set(username);
  // 重启的时候清空缓存
  messageStore.clear();
}

// 随便找个啥分割一下，反正出现的概率小就行；考虑初始值为null的情况
// 不想弄得整个localStorage很臃肿，就只能引入这些潜在的bug了
// 你说搞个数据库多好，非得本地存储；前端又没有什么特别好的持久化措施
let messages = [];
const localMessages = messageStore.get();
if (localMessages) {
  localMessages.split('~').forEach((message) => {
    if (message) {
      messages.push(JSON.parse(message));
    }
  });
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
      // 有本地缓存的时候读本地缓存
      if (messages.length > 0) {
        messages.forEach((message) => {
          const messageToSend = new ChatMessage(message);
          this.chatList.drawMessage(messageToSend.serialize());
        });
      }
    });
    socket.registerMessageHandler((data) => {
      console.log(data);
      const message = new ChatMessage(data);
      this.chatList.drawMessage(message.serialize());
      // 去重；而且需要考虑到localStorage初始化的时候里面是null
      // 去重的标准是时间戳。总不能1ms内连发几条消息吧……
      const localMessages = messageStore.get();
      if (!localMessages) {
        messageStore.set(JSON.stringify(message));
      } else if (!localMessages.includes(message.timestamp)) {
        messageStore.set(localMessages + '~' + JSON.stringify(message));
      }
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
