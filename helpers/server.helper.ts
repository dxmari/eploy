import { ServerMessage, EployConfig, CloudConfig, ExtWebSocket } from './../interfaces'
// import shellJS from './../utils/shell'
import execShell from './../utils/exec'

class ServerHelper {

    handleMessage(serverMessage: ServerMessage, ws: ExtWebSocket) {
        if (serverMessage.type === 'deploy') {
            this.runDeploy(serverMessage.config, ws)
        }
    }

    runDeploy(config: EployConfig, ws: ExtWebSocket) {
        this.navigateToAppPathAndLaunchScript(config.cloud_config, ws);
    }

    async navigateToAppPathAndLaunchScript(cloudConfig: CloudConfig, ws: ExtWebSocket) {
        
        ws.send("\n☢Redirect to " + cloudConfig.application_path + "\n\n☢Update the files from git repo(" + cloudConfig.ref + ")\n\n☢Run pre launch scripts " + cloudConfig.pre_launch_script + "\n\n");
        ws.send('start_spinner');
        var logs = await execShell(`
                cd ${cloudConfig.application_path} && ${'git pull ' + cloudConfig.ref} && ${cloudConfig.pre_launch_script}
        `);
        ws.send(logs)
        ws.send('stop_spinner')
        ws.send('\nDeployed Success...\n')
        ws.send('exit')
    }

}

export default new ServerHelper();