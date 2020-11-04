import { ServerMessage, EployConfig, CloudConfig, ExtWebSocket, TransferConfig } from './../interfaces'
import execShell from './../utils/exec'

class ServerHelper {

    handleMessage(serverMessage: ServerMessage, ws: ExtWebSocket) {
        if (serverMessage.type === 'deploy') {
            if (serverMessage.configType === 'staging') {
                this.runDeploy(ws, serverMessage.config.cloud_config?.staging)
            } else {
                this.runDeploy(ws, serverMessage.config.cloud_config?.production)
            }
        } else if (serverMessage.type === 'transfer') {
            if (serverMessage.configType === 'staging') {
                this.runFilesExtract(ws, serverMessage.config.transfer_config?.staging);
            } else {
                this.runFilesExtract(ws, serverMessage.config.transfer_config?.production);
            }
        }
    }

    runDeploy(ws: ExtWebSocket, cloudConfig?: CloudConfig) {
        this.navigateToAppPathAndLaunchScript(ws, cloudConfig);
    }

    async navigateToAppPathAndLaunchScript(ws: ExtWebSocket, cloudConfig?: CloudConfig) {
        ws.send("\n1)Redirect to " + cloudConfig?.application_path + "\n\n2)Update the files from git repo(" + cloudConfig?.ref + ")\n\n3)Run pre launch scripts " + cloudConfig?.pre_launch_script + "\n\n");
        ws.send('start_spinner');
        var logs = await execShell(`
               cd ${cloudConfig?.application_path} && echo '\n-------------GIT Details------------\n' ${cloudConfig?.ref ? (' &&  git pull ' + cloudConfig?.ref.replace('/', ' ')) : ''} && echo '\n------------------------------------\n' && ${cloudConfig?.pre_launch_script}
        `);
        ws.send(logs)
        ws.send('stop_spinner')
        ws.send('\nDeployed Success...\n')
        ws.send('exit')
    }

    async runFilesExtract(ws: ExtWebSocket, transferConfig?: TransferConfig) {
        var filename = transferConfig?.source_path.split('/').pop()
        var logs = await execShell(`cd ${transferConfig?.destination_path} && rm -rf ${filename} && tar -xvf ${filename}.zip && rm ${filename}.zip`)
        ws.send(logs);
        ws.send('unzip_complete')
        ws.send('exit')
    }

}

export default new ServerHelper();