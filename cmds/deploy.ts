// import WebSocketServer from './../server/index'
import WebSocketClient from './../client/index'

import path from 'path';
import { EployConfig } from './../interfaces'

export default async (args: any) => {
    // await WebSocketServer.onInit()
    await WebSocketClient.onInit()
    WebSocketClient.onReceive();
    // WebSocketServer.sendParamsToClient(await shelljs('cd /Users/mariselvam/Documents/Official/React/cm-v4-testing && gatsby develop'))

    let filePath = path.resolve('./eploy.config.js')
    let config :EployConfig = require(filePath);
    WebSocketClient.sendParamsToServer(JSON.stringify({
        type : 'deploy',
        config : config
    }))
}