import socket from './ws-client';
import {ChatRoomStore, CurrentChatRoomStore, UserStore} from "./storage";
import {ChatForm, ChatList, ChatRoom, promptForChatRoomName, promptForUsername} from "./dom";

const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';
const LIST_SELECTOR = '[data-chat="message-list"]';
const MENU_BUTTON_SELECTOR = '[data-chat="menu-button"]';
const CURRENT_CHAT_ROOM_SELECTOR = '[data-chat="current-chat-room"]';
const CHAT_ROOM_LIST_SELECTOR = '[data-chat="chat-room-list"]';

const userStore = new UserStore('x-chattrbox/u');
const chatRoomStore = new ChatRoomStore('x-chattrbox/rn');
const currentChatRoomStore = new CurrentChatRoomStore('x-chattrbox/crn');

let username = userStore.get();
let chatRoomList = chatRoomStore.get();
let currentChatRoom = currentChatRoomStore.get();

if (!username) {
  username = promptForUsername();
  userStore.set(username);
}
if (!currentChatRoom) {
  currentChatRoom = promptForChatRoomName();
  currentChatRoomStore.set(currentChatRoom);
}
if (!chatRoomList) { // 初始化时是null
  chatRoomStore.set(currentChatRoom);
} else {
  chatRoomList = chatRoomList.split(',');
}
console.log(chatRoomList);

class ChatApp {
  constructor() {
    this.chatForm = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR);
    this.chatList = new ChatList(LIST_SELECTOR, username);
    this.chatRoom = new ChatRoom(MENU_BUTTON_SELECTOR, CURRENT_CHAT_ROOM_SELECTOR, CHAT_ROOM_LIST_SELECTOR);
    socket.init('ws://localhost:3001');
    socket.registerOpenHandler(() => {
      socket.sendMessage({targetChatRoom: currentChatRoom}); // 初始化的时候告诉服务器现在在哪个聊天室
      this.chatForm.init((text) => {
        const message = new ChatMessage({message: text});
        socket.sendMessage(message.serialize());
      });
      this.chatList.init();
      this.chatRoom.init(currentChatRoom, chatRoomList, (targetChatRoom) => {
        this.chatList.clear();
        socket.sendMessage({targetChatRoom});
      });
    });
    socket.registerMessageHandler((data) => {
      console.log(data);
      if (data.chatRooms) {
        chatRoomList = data.chatRooms.toString();
        chatRoomStore.set(data.chatRooms.toString());
        currentChatRoom = data.currentChatRoom;
        return;
      }
      const message = new ChatMessage(data);
      this.chatList.drawMessage(message.serialize());
    });
  }
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
