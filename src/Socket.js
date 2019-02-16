import {
  noop,
  WEBSOCKET_ADDRESS,
  WEBSOCKET_RECONNECT_INTERVAL
} from "./constants";

let websocket = null;
const eventCallbacks = {};
const sendQueue = [];
let onSocketConnected = noop;
let onSocketDisconnected = noop;
let onSocketError = noop;

function onMessage({ data }) {
  const messageObject = JSON.parse(JSON.parse(data));
  eventCallbacks[messageObject.event](messageObject.data);
}

function connectWebSocket() {
  websocket = new WebSocket(WEBSOCKET_ADDRESS);
  websocket.onopen = onSocketConnected;
  websocket.onclose = () => {
    onSocketDisconnected();
    const reconnect = setInterval(() => {
      clearInterval(reconnect);
      connectWebSocket();
    }, WEBSOCKET_RECONNECT_INTERVAL);
  };
  websocket.onerror = onSocketError;
  websocket.onmessage = onMessage;
}

export default {
  onResponse(event, callback) {
    eventCallbacks[event] = callback;
  },

  setOnSocketConnected(callback) {
    onSocketConnected = () => {
      callback();
      sendQueue.forEach(message => websocket.send(message));
      sendQueue.length = 0;
    };
  },

  setOnSocketDisconnected(callback) {
    onSocketDisconnected = callback;
  },

  setOnSocketError(callback) {
    onSocketDisconnected = callback;
  },

  send(event, data) {
    const message = { event, data: JSON.stringify(JSON.stringify(data)) };
    websocket.readyState === WebSocket.OPEN
      ? websocket.send(message)
      : sendQueue.push(message);
  },

  connectWebSocket
};
