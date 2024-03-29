import path from 'path'

import { OSDetails } from '../interfaces';
import shellJS from '../utils/exec'
import { confirmDeleteService } from '../utils/prompts';
import { BLUE, BOLD, RESET, YELLOW } from '../utils/text-colors';
import { symWarning } from '../utils/symbols';
import { listApplications, serviceStatus } from './../utils/table'
import { runBeforeError, runShellError } from '../helpers/shell-messages.helper';
import config from './../.eploy/config.json'
import ManipulateJSON from '../utils/manipulate-json';

/*.................EPLOY SERVICE START COMMANDS STARTS.................*/

export const run = async () => {
    require('./../start-daemon');
}

/*.................EPLOY SERVICE START COMMANDS STARTS.................*/

export const start = async (args: any) => {
    let osDetail: OSDetails = await getOSName();
    if (!osDetail) return;

    if (osDetail === 'mac') {
        if (args._[1] === 'daemon') {
            createMacDaemonService()
        } else {
            try {
                var servicePath = '/Library/LaunchDaemons/www.eploy.service.plist'
                await shellJS(`launchctl load ${servicePath} && launchctl start www.eploy.service`);
                console.log('\n     eploy daemon service started\n');
            } catch (error) {
                console.log('Error:', error);
                console.log(await shellJS(`echo "${symWarning} $(${YELLOW})Make sure run the command $(${BOLD})$(${BLUE})'eploy start daemon'$(${RESET})$(${YELLOW}) before execute a $(${BOLD})$(${BLUE})'eploy start'$(${RESET})"`))
                process.exit();
            }
        }
    } else if (osDetail === 'ubuntu-linux') {
        if (args._[1] === 'daemon') {
            createUbuntuDaemonService()
        } else {
            try {
                await shellJS(`sudo systemctl daemon-reload && sudo systemctl start eploy`);
                console.log('\n     eploy daemon service started\n');
            } catch (error) {
                console.log(error);
                console.log(await shellJS(`echo "${symWarning} $(${YELLOW})Make sure run the command $(${BOLD})$(${BLUE})'eploy start daemon'$(${RESET})$(${YELLOW}) before execute a $(${BOLD})$(${BLUE})'eploy start'$(${RESET})"`))
                process.exit()
            }
        }
    } else {
        process.exit()
    }
}

const getOSName = async (): Promise<OSDetails> => {
    try {
        let kernalName: any = await shellJS('uname');
        if (kernalName.toLowerCase().indexOf('darwin') >= 0) {
            let osDetail: any = await shellJS('sw_vers');
            if (osDetail.indexOf('Mac') >= 0 || osDetail.indexOf('mac') >= 0) {
                return 'mac'
            }
        } else if (kernalName.toLowerCase().indexOf('linux') >= 0) {
            let osDetail: any = await shellJS('hostnamectl');
            if (osDetail.indexOf('Ubuntu') >= 0 || osDetail.indexOf('ubuntu') >= 0) {
                return 'ubuntu-linux'
            }
        }
        return false;
    } catch (error) {
        console.log("Ooops, can't find a OS details, please contact us via github issues regading this." + error);
        return false;
    }
}

const createMacDaemonService = async () => {
    await shellJS('sudo rm -rf /Library/LaunchDaemons/www.eploy.service.plist && sudo cp /usr/local/lib/node_modules/eploy2/.eploy/.config/.files/.plist/www.eploy.service.plist /Library/LaunchDaemons/');
    setTimeout(async () => {
        await shellJS('launchctl load /Library/LaunchDaemons/www.eploy.service.plist && launchctl start www.eploy.service')
        console.log('\n     eploy daemon service started\n');
        if (!config.is_daemon_started) {
            ManipulateJSON
                .path('./.eploy/config.json')
                ?.set('is_daemon_started', true)
                ?.set('starts_at', new Date().toJSON())
                .save();
        }
        process.exit();
    }, 1000);
}

const createUbuntuDaemonService = async () => {
    await shellJS('sudo rm -rf /etc/systemd/system/eploy.service && sudo cp /usr/lib/node_modules/eploy2/.eploy/.config/.files/.service/eploy.service /etc/systemd/system/')
    setTimeout(async () => {
        await shellJS('sudo systemctl daemon-reload && sudo systemctl start eploy && sudo systemctl enable eploy');
        console.log('\n     eploy daemon service started\n');
        if (!config.is_daemon_started) {
            ManipulateJSON
                .path('./.eploy/config.json')
                ?.set('is_daemon_started', true)
                .save();
        }
        process.exit();
    }, 1000);
}

/*.................EPLOY SERVICE RESTART COMMANDS STARTS.................*/

export const restart = async () => {
    let osDetail: OSDetails = await getOSName();
    if (!osDetail) return;
    try {
        if (osDetail === 'mac') {
            var serviceName = 'www.eploy.service'
            var servicePath = `/Library/LaunchDaemons/${serviceName}.plist`
            let logs: any = await shellJS(`launchctl unload ${servicePath} && launchctl load ${servicePath}`);
            if (logs.indexOf('No such file or directory') === -1) {
                console.log('\n     eploy daemon service restarted\n');
                ManipulateJSON
                    .path('./.eploy/config.json')
                    ?.set('last_restarts_at', new Date().toJSON())
                    .save();
            } else {
                console.log(`${servicePath}: No such file or directory`)
                console.log(await shellJS(`echo "${symWarning} $(${YELLOW})Make sure run the command $(${BOLD})$(${BLUE})'eploy start daemon'$(${RESET})$(${YELLOW}) before execute a $(${BOLD})$(${BLUE})'eploy restart'$(${RESET})"`))
                process.exit()
            }
        } else if (osDetail === 'ubuntu-linux') {
            try {
                await shellJS(`sudo systemctl daemon-reload && sudo systemctl restart eploy`);
                console.log('\n     eploy daemon service restarted\n');
            } catch (error) {
                console.log(error);
                console.log(await shellJS(`echo "${symWarning} $(${YELLOW})Make sure run the command $(${BOLD})$(${BLUE})'eploy start daemon'$(${RESET})$(${YELLOW}) before execute a $(${BOLD})$(${BLUE})'eploy restart'$(${RESET})"`))
                process.exit()
            }
        } else {
            process.exit()
        }
    } catch (error) {
        console.log(error);
    }
}

/*.................EPLOY SERVICE STOP COMMANDS STARTS.................*/

export const stop = async () => {
    let osDetail: OSDetails = await getOSName();
    if (!osDetail) return;
    try {
        if (osDetail === 'mac') {
            var servicePath = '/Library/LaunchDaemons/www.eploy.service.plist'
            let logs: any = await shellJS(`launchctl unload ${servicePath}`);

            if (logs.indexOf('No such file or directory') === -1) {
                console.log('\n     eploy daemon service stopped\n');
            } else {
                console.log(`${servicePath}: No such file or directory`)
                console.log(await shellJS(`echo "${symWarning} $(${YELLOW})Make sure run the command $(${BOLD})$(${BLUE})'eploy start daemon'$(${RESET})$(${YELLOW}) before execute a $(${BOLD})$(${BLUE})'eploy stop'$(${RESET})"`))
                process.exit()
            }
        } else if (osDetail === 'ubuntu-linux') {
            try {
                await shellJS(`sudo systemctl daemon-reload && sudo systemctl stop eploy`);
                console.log('\n     eploy daemon service stopped\n');
            } catch (error) {
                console.log(error);
                console.log(await shellJS(`echo "${symWarning} $(${YELLOW})Make sure run the command $(${BOLD})$(${BLUE})'eploy start daemon'$(${RESET})$(${YELLOW}) before execute a $(${BOLD})$(${BLUE})'eploy stop'$(${RESET})"`))
                process.exit()
            }
        } else {
            process.exit()
        }
    } catch (error) {
        console.log(error);
    }
}

/*.................EPLOY SERVICE STATUS COMMANDS STARTS.................*/

export const status = async (args: any) => {
    if (!config.is_daemon_started) {
        console.log(await shellJS(`echo "${symWarning} $(${YELLOW})Make sure run the command $(${BOLD})$(${BLUE})'eploy start daemon'$(${RESET})$(${YELLOW}) before execute a $(${BOLD})$(${BLUE})'eploy status'$(${RESET})"`))
        return;
    }
    let statusArr = ['Eploy Service', '/Library/LaunchDaemons/www.eploy.service.plist', config.starts_at, config.last_restarts_at]
    try {
        let osName = await getOSName();
        if (osName === 'mac') {
            let fullStatus: any = await shellJS('launchctl list www.eploy.service')
            fullStatus = fullStatus.replace(/;/g, ',').replace(/=/g, ':').replace('(', '[').replace('),', ']').replace(/\s+/g, '').replace(/(^[,\s]+)|([,\s]+$)/g, '')
            fullStatus = eval('(' + fullStatus + ')')
            statusArr.push('🟢 running');
            const out = serviceStatus([fullStatus.PID].concat(statusArr));
            console.log(out);
        } else if (osName === 'ubuntu-linux') {

        }
    } catch (error) {
        statusArr.push('🔴 stopped');
        const out = serviceStatus(['-'].concat(statusArr));
        console.log(out);
    }
}

/*.................EPLOY SERVICE LIST COMMANDS STARTS.................*/

export const list = async (args: any) => {
    try {
        let osName = await getOSName();
        if (osName === 'mac') {
            const out = listApplications(config.application_list);
            console.log(out);
        } else if (osName === 'ubuntu-linux') {

        }
    } catch (error) {
        runShellError(error, true)
    }
}

/*.................EPLOY SERVICE DELETE COMMANDS STARTS.................*/

export const deleteService = async () => {
    let response = await confirmDeleteService()
    if (response.confirm_delete) {
        confirmDelete();
    }
}

const confirmDelete = async () => {
    let osDetail: OSDetails = await getOSName()
    if (!osDetail) return;
    try {
        if (osDetail === 'mac') {
            var servicePath = '/Library/LaunchDaemons/www.eploy.service.plist'
            await shellJS(`launchctl unload ${servicePath} && sudo rm -rf /Library/LaunchDaemons/www.eploy.service.plist`);
            console.log('\n     eploy daemon service deleted permanently\n');
        } else if (osDetail === 'ubuntu-linux') {
            await shellJS(`sudo systemctl daemon-reload && sudo systemctl stop eploy && sudo rm -rf /etc/systemd/system/eploy.service`);
            console.log('\n     eploy daemon service deleted permanently\n');
        } else {
            process.exit()
        }
    } catch (error) {
        console.log(error);
    }
}

export { confirmDelete };