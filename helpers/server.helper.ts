import { ServerMessage, EployConfig, CloudConfig, ExtWebSocket, TransferConfig } from './../interfaces'
// import shellJS from './../utils/shell'
import execShell from './../utils/exec'

class ServerHelper {

    handleMessage(serverMessage: ServerMessage, ws: ExtWebSocket) {
        if (serverMessage.type === 'deploy') {
            this.runDeploy(serverMessage.config, ws)
        } else if (serverMessage.type === 'transfer') {
            this.runFilesExtract(ws, serverMessage.config.transfer_config);
        }
    }

    runDeploy(config: EployConfig, ws: ExtWebSocket) {
        this.navigateToAppPathAndLaunchScript(config.cloud_config, ws);
    }

    async navigateToAppPathAndLaunchScript(cloudConfig: CloudConfig, ws: ExtWebSocket) {

        ws.send("\n1)Redirect to " + cloudConfig.application_path + "\n\n2)Update the files from git repo(" + cloudConfig.ref + ")\n\n3)Run pre launch scripts " + cloudConfig.pre_launch_script + "\n\n");
        ws.send('start_spinner');
        var logs = await execShell(`
               cd ${cloudConfig.application_path} && echo '\n-------------GIT Details------------\n' ${cloudConfig.ref ? (' &&  git pull ' + cloudConfig.ref.replace('/', ' ')) : ''} && echo '\n------------------------------------\n' && ${cloudConfig.pre_launch_script}
        `);
        ws.send(logs)
        ws.send('stop_spinner')
        ws.send('\nDeployed Success...\n')
        ws.send('exit')
    }

    async runFilesExtract(ws: ExtWebSocket, transferConfig?: TransferConfig) {
        var filename = transferConfig?.source_path.split('/').pop() + '.zip'
        var logs = await execShell(`cd ${transferConfig?.destination_path} && tar -xvf ${filename} && rm ${filename}`)
        ws.send(logs);
        ws.send('unzip_complete')
        ws.send('exit')
    }

}

export default new ServerHelper();