'use strict';

import WebSocket from 'ws'

// const domain = '147.139.41.95';
const domain = 'localhost';

const ws = new WebSocket(`ws://${domain}:8000`);

class WebSocketClient {
  ws: WebSocket;
  constructor() {
    this.ws = ws
  }
  onInit() {
    ws.onopen = function (event) {
      console.log('Connection is established');
    }

    ws.onclose = function () {
      console.log("Connection is closed...");
    }
  }

  onError(cb: any) {
    ws.onerror = function (err) {
      console.log('err: ', err);
      return cb(err)
    }
  }

  sendParamsToServer(message: any) {
    ws.send(message);
  }

  onReceive(cb: any) {
    ws.onmessage = function (event) {
      console.log(event.data);
      return cb(event.data)
    };
  }
}

export default new WebSocketClient()