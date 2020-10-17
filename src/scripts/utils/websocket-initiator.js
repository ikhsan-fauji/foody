import NotificationHelper from '../helper/notification-helper';

const WebSocketInitiator = {
  init(url) {
    const webSocket = new WebSocket(url);
    webSocket.onopen = this._onOpen;
    webSocket.onmessage = this._onMessageHandler;
  },

  _onOpen(event) {
    console.log('CONNECTED');
  },

  _onMessageHandler(message) {
    const data = JSON.parse(message.data);
    console.debug('New Message: ', data.title);
    // const { title, overview, poster_path } = JSON.parse(message.data);
    // NotificationHelper.sendNotification({
    //   title: `${title} is on cinema!`,
    //   options: {
    //     body: overview
    //     // image: `${CONFIG.BASE_IMAGE_URL + movie.poster_path}`
    //   }
    // });
  }
};
export default WebSocketInitiator;
