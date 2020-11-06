import WebSocketClient from './../client/index'

import path from 'path';
import { EployConfig, ServerMessage } from './../interfaces'
import { handleCloudConfig } from './../helpers/error.helper'
import { runShellError, runBeforeError, runShellSuccess, runInfoMsg } from './../helpers/shell-messages.helper'
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
    let cloudConfig: any;
    if (cloudTypeResp.cloudType === 'staging') {
        cloudConfig = config.cloud_config?.staging || {}
    } else {
        cloudConfig = config.cloud_config?.production || {}
    }

    let dataError = handleCloudConfig(cloudConfig);
    if (dataError) {
        var errorMsg = '\n  Transfering files having errors:\n';
        await runBeforeError(errorMsg);
        await runShellError(dataError)
        return process.exit();
    }

    try {
        await WebSocketClient.onInit(cloudConfig.host);
        WebSocketClient.onReceive((message: any) => {
            if (typeof message === 'string') {
                console.log(message);
            } else {
                if (message.code === 0) {
                    runShellSuccess(message.message, true);
                } else if (message.code === 2) {
                    runInfoMsg(message.message);
                } else {
                    runBeforeError(message.message);
                    runShellError(typeof message.error === 'string' ? message.error : (message.error.message || ''), true);
                }
            }
        });
        var params: ServerMessage = {
            type: 'deploy',
            config: config,
            configType: cloudTypeResp.cloudType
        };
        WebSocketClient.sendParamsToServer(JSON.stringify(params))
    } catch (error) {
        console.error('\n')
        runBeforeError('could not connect to a host ' + cloudConfig.host + ' due to below reason:\n')
        runShellError(typeof error === 'string' ? error : (error.message || ''), true);
        console.error('\n')
        process.exit();
    }
}