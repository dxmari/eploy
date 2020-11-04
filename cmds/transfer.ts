import path from 'path';
import { EployConfig, ServerMessage } from './../interfaces'
import shellJS from './../utils/shell'
import WebSocketClient from './../client/index'
import { chooseTransferType } from './../utils/prompts'

export default async (args: any) => {
    if (args._.length === 1) {
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
            console.error('Please add the transfer configs in eploy.config.js');
            process.exit();
            return;
        }
        let transferTypeResp = await chooseTransferType(type);
        if (Object.keys(transferTypeResp).length === 0) {
            console.error('Transfering the file was aborted.');
            return;
        }
        let transferConfig;
        if(transferTypeResp.transferType === 'staging'){
            transferConfig = config.transfer_config?.staging || {}
        }else{
            transferConfig = config.transfer_config?.production || {}
        }
        let source_path: any = transferConfig?.source_path || ''
        let dest_path = transferConfig?.destination_path || ''

        await shellJS(`tar -czvf /tmp/${source_path + '.zip'} ${source_path}`)
        console.log('\n\Folder zipping completed..')

        await shellJS(`scp -rp /tmp/${source_path.split('/').pop()}.zip ${transferConfig.user}@${transferConfig.host}:${dest_path}`);
        console.log('\nThe zip file was transfered to a server..\n');

        await WebSocketClient.onInit(transferConfig.host);
        let params : ServerMessage = {
            type : 'transfer',
            config : config,
            configType : transferTypeResp.transferType
        }
        WebSocketClient.sendParamsToServer(JSON.stringify(params));
        WebSocketClient.onReceive((message: any) => {
            if (message === 'unzip_complete'){
                console.log('Folder unzipping was completed..\n');
            }
        })

    } else if (args._.length === 3) {
        let source_path = args._1[1];
        let dest_path = args._1[2];
        // console.log('Zipping the folder or file..')
        // await shellJS(`tar -czvf ${source_path} /tmp`);

        // console.log('\nTransfer the zip file to a server..')
        // await shellJS(`scp -rp public.zip deployer@134.209.147.68:/home/deployer/cm-v4/current`);

    } else {
        console.error('Expected 3 arguments.');
    }
}