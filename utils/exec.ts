import {exec} from 'child_process'
export default (cmd:any) => {
    return new Promise((resolve, reject) => {
        exec(cmd, (err:any, stdout:any, stderr:any) => {
            // if (stdout) {
            //     return resolve(stdout);
            // }
            // console.log(stderr);
            // resolve(false);
            
            // console.log(err);
            // console.log('stdout', stdout);
            // console.log('stdout', stderr);
            if (err && err.code !== 0) {
                reject(stderr);
            } else {
                resolve(stdout || stderr);
            }
        })
    })
}