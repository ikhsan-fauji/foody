import NotificationHelper from '../helper/notification-helper';

let webSocket;
const WebSocketInitiator = {
  init(url) {
    webSocket = new WebSocket(url);
    webSocket.onopen = () => this._onOpen();
    webSocket.onmessage = this._onMessageHandler;
    webSocket.onclose = this._onClose;
  },

  _onOpen() {
    console.log('CONNECTED');
    NotificationHelper.sendNotification({
      title: `websocket.org`,
      options: {
        body:
          'WebSocket was connected. 3 sample message would be send in 5 seconds'
      }
    });
    setTimeout(() => {
      this._sendMessage();
    }, 5000);
  },

  _sendMessage(counter = 1) {
    const messsage = `Message ${counter}`;
    console.log('SEND: ', messsage);
    webSocket.send(messsage);
    if (counter > 3) {
      webSocket.close();
    } else {
      setTimeout(() => {
        this._sendMessage(counter + 1);
      }, 10000);
    }
  },

  _onMessageHandler(event) {
    console.log('RECEIVED: ', event.data);
    NotificationHelper.sendNotification({
      title: `websocket.org`,
      options: {
        body: event.data
      }
    });
  },

  _onClose() {
    console.log('DISCONNECTED');
    NotificationHelper.sendNotification({
      title: `websocket.org`,
      options: {
        body: 'WebSocket was disconnected'
      }
    });
  }
};
export default WebSocketInitiator;
