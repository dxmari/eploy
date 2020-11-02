'use strict';

import WebSocket from 'ws'
import {start_spinner, stop_spinner} from './../utils/spinner'

class WebSocketClient {
  ws: WebSocket;
  constructor(domain: string = 'localhost:8080') {
    this.ws = new WebSocket(`ws://${domain}`)
  }
  onInit() {
    return new Promise((resolve, reject) => {
      this.ws.onopen = function (ev) {
        console.log('\nPreparing Server deployment...\n');
        resolve(ev);
      }

      this.ws.onclose = function (ev) {
        console.log("Connection is closed...");
        reject(ev);
      }
    })
  }

  onError(cb: any) {
    this.ws.onerror = function (err) {
      console.log('err: ', err);
      return cb(err)
    }
  }

  sendParamsToServer(message: any) {
    this.ws.send(message);
  }

  onReceive(cb?: any) {
    this.ws.onmessage =  (event) =>{
      var message = event.data;
      if(message === 'start_spinner'){
        start_spinner('Running the scripts...\n')
      }else if(message === 'stop_spinner'){
        stop_spinner();
      }else{
        if(cb){
          return cb(message)
        }
      }
    };
  }
}

export default new WebSocketClient()