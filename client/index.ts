import WebSocket from 'ws'
import {start_spinner, stop_spinner} from './../utils/spinner'
import { runBeforeError } from './../helpers/shell-messages.helper'
import { isJson } from '../utils/common';

class WebSocketClient {
  ws: WebSocket | any;
  constructor() {
    this.ws = '';
  }
  onInit(domain: string = 'localhost:10101') {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(`ws://${domain}`)
        
        this.ws.onopen = function (ev:any) {
          runBeforeError('\nConnecting to a Server...\n')
          resolve(ev);
        }
  
        this.ws.onclose = function (ev:any) {
          // console.log("Connection is closed...");
          reject(ev);
        }
        this.ws.onerror = (error:any) =>{
          reject(error);
        }
      } catch (error) {
        reject(error);
      }
    })
  }

  onError(cb: any) {
    this.ws.onerror = function (err:any) {
      console.log('err: ', err);
      return cb(err)
    }
  }

  sendParamsToServer(message: any) {
    this.ws.send(message);
  }

  onReceive(cb?: any) {
    this.ws.onmessage =  (event :any) =>{
      var message = event.data;
      if(isJson(event.data)){
        message = isJson(event.data);
      }
      if(message === 'start_spinner'){
        start_spinner('Running the scripts...\n')
      }else if(message === 'stop_spinner'){
        stop_spinner();
      }else if(message === 'exit'){
        process.exit();
      }else{
        if(cb){
          return cb(message)
        }
      }
    };
  }
}

export default new WebSocketClient()