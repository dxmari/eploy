import shellJS from './../utils/shell'

export default async () => {
    try {
        let kernalName :any = await shellJS('uname');
        if(kernalName.toLowerCase().indexOf('darwin') >=0){
            let osDetail : any = await shellJS('sw_vers');
            if(osDetail.indexOf('Mac') >= 0){
                createMacDaemonService();
            }
        }else if(kernalName.toLowerCase().indexOf('linux') >=0){
            
        }
    } catch (error) {
        
    }
}

const createMacDaemonService = async () =>{
    await shellJS('sudo rm -rf /Library/LaunchDaemons/www.eploy.service.plist && sudo cp /usr/local/lib/node_modules/eploy/.eploy/.config/.files/.plist/www.eploy.service.plist /Library/LaunchDaemons/');
    setTimeout(async () => {
        await shellJS('launchctl load /Library/LaunchDaemons/www.eploy.service.plist && launchctl start /Library/LaunchDaemons/www.eploy.service.plist')
        console.log('\n     eploy daemon service started\n');
        process.exit();
    }, 1000);
}