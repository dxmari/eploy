import {exec} from 'child_process'
export default (cmd:any) => {
    return new Promise((resolve, reject) => {
        exec(cmd, (err:any, stdout:any, stderr:any) => {
            if (stdout) {
                return resolve(stdout);
            }
            console.log(stderr);
            resolve(false);
        })
    })
}