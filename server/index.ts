'use strict';

import ws, { Server as WebSocketServer } from 'ws'
import http from 'http'
import express from 'express'

const app = express();

const port: number = 8000;
const host = 'localhost'; //"0.0.0.0"

app.get('/',(req,res) =>{
    res.json([{
        id : 1
    }]);
})
const httpServer = http.createServer(app);

httpServer.listen(port, function () {
    console.log("Server: Listening on " + host + ':' + port);
});

const wss = new WebSocketServer({ server: httpServer });

type ExtWebSocket = ws & {
    isAlive: boolean
}


class WebSocketServerSide {
    socket: any;
    async onInit() {
        this.socket = await this.connect();
    }

    connect(): Promise<ExtWebSocket> {
        return new Promise(resolve => {
            wss.on('connection', ((ws: ExtWebSocket) => {
                this.socket = ws;
                ws.isAlive = true;

                ws.on('pong', (args: any) => {
                    ws.isAlive = true;
                    console.log('pong', args);
                })

                ws.on('message', (message: any) => {
                    console.log(`received: ${message}`);
                    ws.send(`Hello, you sent -> ${message}`);
                });

                ws.on('end', () => {
                    console.log('Connection ended...');
                    ws.isAlive = false;
                });
                resolve(ws);
            }));
        })
    }

    sendParamsToClient(params: any) {
        this.socket.send(params);
    }
}



export default new WebSocketServerSide();