import shell from 'shelljs';

export default (command: string, timeout = (10 * (60 * 1000))) => {
    return new Promise(resolve => {
        let t = setTimeout(() => {
            resolve("timeout");
        }, timeout);
        let result = shell.exec(command);
        if (result.stdout) {
            clearTimeout(t);
            resolve(result.stdout);
        } else {
            clearTimeout(t);
            resolve(result.stderr);
        }
    })
}