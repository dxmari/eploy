'use strict';

import ws, { Server as WebSocketServer } from 'ws'
import ServerHelper from './../helpers/server.helper'
import { ExtWebSocket } from './../interfaces'
import { isJson } from './../utils/common'

const port: number = 8080;

const wss = new WebSocketServer({ noServer: true, port: port });

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

                ws.on('message', async (message: any) => {
                    if (isJson(message)) {
                        ServerHelper.handleMessage(isJson(message), ws);
                    } else {
                        ServerHelper.handleMessage(message, ws);
                    }
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