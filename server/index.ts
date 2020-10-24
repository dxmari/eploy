'use strict';

import ws, { Server as WebSocketServer } from 'ws'

const wss = new WebSocketServer({ port: 10001 });

type ExtWebSocket = ws & {
    isAlive: boolean
}


class WebSocketServerSide {
    socket: any;
    async onInit(){
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