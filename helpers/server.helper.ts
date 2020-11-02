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
        
        ws.send('start_spinner');
        setTimeout(async () =>{
            var logs = await shellJS(`
                    echo "\n1)Redirect to '${cloudConfig.application_path}'\n\n2)Run pre launch scripts '${cloudConfig.pre_launch_script}'\n\n" && cd ${cloudConfig.application_path} && ${cloudConfig.pre_launch_script}
            `);
            ws.send(logs)
            console.log('\nDeployed Success...\n')
            ws.send('stop_spinner');
            setTimeout(() =>{
                process.exit();
            },2000);
        },5000);
    }

}

export default new ServerHelper();