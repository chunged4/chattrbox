import socket from './ws-client';

class ChatApp {
    constructor() {
        socket.init('ws://localhost:3001');
        socket.registerOpenHandler(() => {
            let message = new ChatMessage({ message: 'pow!' });
            socket.sendMessage(message.serialize());
        });
        socket.registerMessageHandler((data) => {
            console.log(data);
        });
    }
}

class ChatMessage {
    constructor({
        message: m,
        user: u='batman',
        timestamp: t=(new Date()).getTime()
    }) {
        this.user = user;
        this.message = message;
        this.timestamp = timestamp;
    }
    toObject() {
        return {
            user: this.user,
            message: this.message,
            timestamp: this.timestamp
        };
    }
}
export default ChatApp;