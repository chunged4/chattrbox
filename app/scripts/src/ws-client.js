let socket;

function init(url) {
    socket = new WebSocket(url);
    console.log("connecting...");
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
        try {
            let data = JSON.parse(e.data);
            handlerFunction(data);
        } catch(error){
            console.error("Error parsing json: ", error);
        }
    };
}

function sendMessage(payload) {
    let str = JSON.stringify(payload);
    console.log("ws-client sending stringified message", str);
    socket.send(JSON.stringify(payload));
}

export default {
    init,
    registerOpenHandler,
    registerMessageHandler,
    sendMessage
}