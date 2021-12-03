import { ApplicationList, EployConfig } from '../interfaces'
import config from './../.eploy/config.json'
import ManipulateJSON from './manipulate-json'

export const isJson = (params: string) => {
    try {
        return JSON.parse(params)
    } catch (e: any) {
        return false
    }
}

export const generatePID = () => {
    let appList: Array<ApplicationList> = config.application_list;
    let pid = 1;
    if (appList.length > 0) {
        pid = appList[appList.length - 1].pid + 1;
    }
    function checkIfExists(pid: any) {
        if (config.application_list.findIndex(e => e.pid === pid) >= 0) {
            checkIfExists(++pid)
        } else {
            return
        }
    }
    checkIfExists(pid);
    return pid
}

export const addApplications = (eployConfig: EployConfig, isDeploySuccess: boolean): boolean => {
    let appList: Array<ApplicationList> = config.application_list;
    if (appList.findIndex((e: any) => e.app_name === eployConfig.apps[0].name) === -1) {
        let newApp: ApplicationList = {
            pid: generatePID(),
            app_name: eployConfig.apps[0].name,
            success_count: isDeploySuccess ? 1 : 0,
            fail_count: isDeploySuccess ? 0 : 1,
            last_run_status: isDeploySuccess ? 'success' : 'failure',
            last_run_at: new Date().toJSON()
        }
        appList.push(newApp);

        ManipulateJSON
            .path('./.eploy/config.json')
            ?.set('application_list', appList)
            .save()
        return true;
    }
    return false;
}