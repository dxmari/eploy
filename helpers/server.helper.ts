import { ServerMessage, EployConfig, CloudConfig, ExtWebSocket } from './../interfaces'
import shellJS from './../utils/shell'

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
        
        ws.send("\n1)Redirect to " + cloudConfig.application_path + "\n\n2)Run pre launch scripts " + cloudConfig.pre_launch_script + "\n\n");
        ws.send('start_spinner');
        var logs = await shellJS(`
                cd ${cloudConfig.application_path} && ${cloudConfig.pre_launch_script}
        `);
        ws.send(logs)
        console.log('\nDeployed Success...\n')
        ws.send('stop_spinner');
        setTimeout(() =>{
            process.exit();
        },2000);
    }

}

export default new ServerHelper();