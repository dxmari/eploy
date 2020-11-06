import path from 'path';
import { EployConfig, ServerMessage, TransferConfig } from './../interfaces'
import shellExec from '../utils/shell_exec'
import WebSocketClient from './../client/index'
import { chooseTransferType } from './../utils/prompts'
import { handleTransferConfig } from './../helpers/error.helper'
import { runShellError, runBeforeError, runShellSuccess } from './../helpers/shell-messages.helper'
export default async (args: any) => {

    let filePath = path.resolve('./eploy.config.js')
    let config: EployConfig = require(filePath);

    let type: number = 0;
    if ('staging' in (config.transfer_config || {})) {
        type = 1
    }
    if ('production' in (config.transfer_config || {})) {
        type = 2
    }
    if (('staging' in (config.transfer_config || {})) && ('production' in (config.transfer_config || {}))) {
        type = 3
    }
    if (type === 0) {
        await runBeforeError('\nPlease add the transfer configs in eploy.config.js\n')
        return process.exit();
    }
    let transferTypeResp = await chooseTransferType(type);
    if (Object.keys(transferTypeResp).length === 0) {
        await runBeforeError('\nTransfering the file was aborted.\n')
        return process.exit();
    }
    let transferConfig: any;
    if (transferTypeResp.transferType === 'staging') {
        transferConfig = config.transfer_config?.staging || {}
    } else {
        transferConfig = config.transfer_config?.production || {}
    }
    let dataError = handleTransferConfig(transferConfig);
    if (dataError) {
        var errorMsg = '\n  Transfering files having errors:\n';
        await runBeforeError(errorMsg);
        await runShellError(dataError)
        return process.exit();
    }
    let source_path: any = transferConfig?.source_path || ''
    let dest_path = transferConfig?.destination_path || ''

    if (transferConfig.pre_transfer_script) {
        await runBeforeError('\nRunning pre transfer scripts\n');
        try {
            let logs = await shellExec(`${transferConfig.pre_transfer_script}`);
            console.log(logs);
        } catch (error) {
            await runShellError('Pre transfer script error : ' + error, true)
            return process.exit();
        }
    }

    try {
        let logs = await shellExec(`echo '\n' && tar -czvf /tmp/${source_path + '.zip'} ${source_path}`)
        console.log(logs);
        runShellSuccess('Folder zipping completed..\n', true)
    } catch (error) {
        await runShellError('Folder zipping error : ' + error, true)
        return process.exit();
    }

    try {
        await shellExec(`scp -rp /tmp/${source_path.split('/').pop()}.zip ${transferConfig.user}@${transferConfig.host}:${dest_path}`);
        runShellSuccess('The zip file was transfered to a server..\n', true)
    } catch (error) {
        runShellError('zipped Folder transfer error : ' + error, true)
        return process.exit();
    }

    await WebSocketClient.onInit(transferConfig.host);
    let params: ServerMessage = {
        type: 'transfer',
        config: config,
        configType: transferTypeResp.transferType
    }
    WebSocketClient.sendParamsToServer(JSON.stringify(params));
    WebSocketClient.onReceive((message: any) => {
        if (message === 'unzip_complete') {
            runShellSuccess('Folder unzipping was completed..\n', true);
            process.exit();
        }
    })
}