// import WebSocketServer from './../server/index'
import WebSocketClient from './../client/index'

import path from 'path';
import { EployConfig } from './../interfaces'

export default async (args: any) => {
    // await WebSocketServer.onInit()
    let filePath = path.resolve('./eploy.config.js')
    let config :EployConfig = require(filePath);
    
    // try {
    //     await WebSocketClient.onInit(config.cloud_config.host);
    //     WebSocketClient.onReceive((message:any) =>{
    //         console.log(message);
    //     });
    
    //     WebSocketClient.sendParamsToServer(JSON.stringify({
    //         type : 'deploy',
    //         config : config
    //     }))
    // } catch (error) {
    //     console.error('\ncould not connect to a host ' + config.cloud_config.host + '\n')
    //     process.exit();
    // }
}