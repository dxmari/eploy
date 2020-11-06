import { exec } from 'child_process'
export default async (cmd: string) => {
    let result: string = '';
    const cmds = cmd.split('&&');
    try {
        for (let key in cmds) {
            result += await execCMD(cmds[key].trim())
        }
        return result;
    } catch (error) {
        return Promise.reject(error);
    }
}

const execCMD = (cmd: string) : Promise<string> => {
    return new Promise((resolve, reject) => {
        exec(cmd, (err, stdout: string, stderr: string) => {
            if (err && err.code !== 0) {
                reject(stderr);
            } else {
                resolve(stdout || stderr);
            }
        })
    })
}