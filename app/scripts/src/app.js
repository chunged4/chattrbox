import socket from './ws-client';
import { UserStore } from './storage';
import {ChatForm, ChatList, promptForUsername} from './dom';
import { prototype } from 'ws';

const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';
const LIST_SELECTOR = '[data-chat="message-list"]';

let userStore = new UserStore('x-chattrbox/u');
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
    socket.registerOpenHandler( () => {
      this.chatForm.init((data) => {
        console.log('in chatForm.init... data is:', data);
        let message = new ChatMessage(data);
        socket.sendMessage(message.toObj());
      });
      this.chatList.init();
    });
    socket.registerMessageHandler((data) => {
      console.log("ChatApp data: ", data);
      let message = new ChatMessage(data);
      this.chatList.drawMessage(message.toObj());
    });
  }
}

class ChatMessage {
  constructor(data) {
    if (typeof data === 'string') {
      data = {
        message: data
      };
    }
    this.username = data.user || username;
    this.message = data.message;
    this.timestamp = data.timestamp || (new Date()).getTime();

    console.log('ChatMessage constructed', this);
    console.log('ChatMessage constructed object', this.toObj());
  }
  toObj() {
    return {
      user: this.username,
      message: this.message,
      timestamp: this.timestamp
    };
  }
}

export default ChatApp;