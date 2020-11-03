import path from 'path';
import { EployConfig } from './../interfaces'
import shellJS from './../utils/shell'
import WebSocketClient from './../client/index'

export default async (args: any) => {
    if (args._.length === 1) {
        console.log('run')
        let filePath = path.resolve('./eploy.config.js')
        let config: EployConfig = require(filePath);

        let source_path = config.transfer_config?.source_path || "";
        let dest_path = config.transfer_config?.destination_path;
        await shellJS(`tar -czvf /tmp/${source_path + '.zip'} ${source_path}`)
        console.log('\n\Folder zipping completed..')

        await shellJS(`scp -rp /tmp/${source_path.split('/').pop()}.zip ${config.transfer_config?.user}@${config.transfer_config?.host}:${dest_path}`);
        console.log('\n\nThe zip file was transfered to a server..');

        await WebSocketClient.onInit(config.transfer_config?.host);
        WebSocketClient.sendParamsToServer(JSON.stringify({
            type : 'transfer',
            config : config
        }));
        WebSocketClient.onReceive((message: any) => {
            if (message === 'unzip_complete'){
                console.log('Folder unzipping was completed..');
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