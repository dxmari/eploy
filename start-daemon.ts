#!/usr/bin/env node

import WebSocketServer from './server/index'

export default async () =>{
    await WebSocketServer.onInit();
    console.log("Server running at a port 10101");
}