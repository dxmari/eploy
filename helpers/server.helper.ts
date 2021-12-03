import ManipulateJSON from '../utils/manipulate-json';
import { ServerMessage, EployConfig, CloudConfig, ExtWebSocket, TransferConfig } from './../interfaces'
import execShell from './../utils/exec'
import config from './../.eploy/config.json'

class ServerHelper {

    handleMessage(serverMessage: ServerMessage, ws: ExtWebSocket) {
        if (serverMessage.type === 'deploy') {
            if (serverMessage.configType === 'staging') {
                this.navigateToAppPathAndLaunchScript(ws, serverMessage.config.cloud_config?.staging)
            } else {
                this.navigateToAppPathAndLaunchScript(ws, serverMessage.config.cloud_config?.production)
            }
        } else if (serverMessage.type === 'transfer') {
            if (serverMessage.configType === 'staging') {
                this.runFilesExtract(ws, serverMessage.config.transfer_config?.staging);
            } else {
                this.runFilesExtract(ws, serverMessage.config.transfer_config?.production);
            }
        }
    }

    async navigateToAppPathAndLaunchScript(ws: ExtWebSocket, cloudConfig?: CloudConfig) {

        ws.send(JSON.stringify({
            code: 2,
            message: "1)Redirect to " + cloudConfig?.application_path + "\n\n2)Update the files from git repo(" + cloudConfig?.ref + ")\n\n3)Run pre launch scripts " + "'" + cloudConfig?.pre_launch_script + "'" + "\n\n"
        }));
        ws.send('start_spinner');
        
        try {
            let gitCmd = `cd ${cloudConfig?.application_path} && echo '\n-------------GIT Details------------\n ' ${cloudConfig?.ref ? (' &&  git pull ' + cloudConfig?.ref.replace('/', ' ')) : ''} && echo '\n------------------------------------\n'`
            var gitLogs = await execShell(gitCmd);

            console.log('gitCmd', gitCmd)
            ws.send(gitLogs)

            var scriptCmd = `cd ${cloudConfig?.application_path} && ${cloudConfig?.pre_launch_script}`;
            var scriptLogs = await execShell(scriptCmd);

            console.log('scriptCmd', scriptCmd)

            ws.send(scriptLogs)
            ws.send('stop_spinner')
            ws.send(JSON.stringify({
                code: 0,
                message: 'Deployed Success...\n'
            }))
            ws.send('exit')
        } catch (error) {
            ws.send('stop_spinner')
            ws.send(JSON.stringify({
                code: 1,
                message: 'Deployment failed due to below reason:\n',
                error: error
            }))
        }
    }

    async runFilesExtract(ws: ExtWebSocket, transferConfig?: TransferConfig) {
        var filename = transferConfig?.source_path.split('/').pop()
        try {
            var logs = await execShell(`cd ${transferConfig?.destination_path} && rm -rf ${filename} && tar -xvf ${filename}.zip && rm ${filename}.zip`)
            ws.send(logs);
            ws.send('unzip_complete')
            ws.send('exit')
        } catch (error) {
            ws.send(JSON.stringify({
                code: 1,
                message: 'Transfering files failed due to below reason:\n',
                error: error
            }))
        }
    }

}

export default new ServerHelper();