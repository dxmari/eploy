// import WebSocketServer from './../server/index'
import WebSocketClient from './../client/index'

import path from 'path';
import { EployConfig,ServerMessage } from './../interfaces'

import { chooseCloudType } from './../utils/prompts'

export default async (args: any) => {
    let filePath = path.resolve('./eploy.config.js')
    let config: EployConfig = require(filePath);

    let type: number = 0;
    if ('staging' in (config.cloud_config || {})) {
        type = 1
    }
    if ('production' in (config.cloud_config || {})) {
        type = 2
    }
    if (('staging' in (config.cloud_config || {})) && ('production' in (config.cloud_config || {}))) {
        type = 3
    }
    if (type === 0) {
        console.error('Please add the cloud configs in eploy.config.js');
        process.exit();
        return;
    }

    let cloudTypeResp = await chooseCloudType(type);
    if (Object.keys(cloudTypeResp).length === 0) {
        console.error('Deployment was aborted.');
        return;
    }
    let cloudConfig;
    if(cloudTypeResp.cloudType === 'staging'){
        cloudConfig = config.cloud_config?.staging || {}
    }else{
        cloudConfig = config.cloud_config?.production || {}
    }

    try {
        await WebSocketClient.onInit(cloudConfig.host);
        WebSocketClient.onReceive((message:any) =>{
            console.log(message);
        });
        var params :ServerMessage = {
            type : 'deploy',
            config : config,
            configType : cloudTypeResp.cloudType
        };
        WebSocketClient.sendParamsToServer(JSON.stringify(params))
    } catch (error) {
        console.error('\ncould not connect to a host ' + cloudConfig.host + '\n')
        process.exit();
    }
}