import { CloudConfig, TransferConfig } from './../interfaces/index'
import { BOLD, RED, RESET } from './../utils/text-colors'


export const handleTransferConfig = (transferConfig: TransferConfig) => {
    let error = "";
    const configs = ['host', 'user', 'source_path', 'destination_path']
    for (let key in transferConfig) {
        if (configs.indexOf(key) >= 0) {
            //@ts-ignore
            if (!transferConfig[key]) {
                error += '    $(' + RED + ')' + '$(' + BOLD + ')' + key + '$(' + RESET + ')' + '$(' + RED + ')' +  " can't be blank & must be a string\n"
            }
            configs.splice(configs.indexOf(key), 1);
        }
    }
    configs.forEach(key => {
        error += '    $(' + RED + ')' + '$(' + BOLD + ')' + key + '$(' + RESET + ')' + '$(' + RED + ')' + ' does not exist and must be a string\n'
    })
    return error;
}

export const handleCloudConfig = (cloudConfig: CloudConfig) => {
    let error = "";
    const configs = ['host', 'repo', 'ref', 'application_path']
    for (let key in cloudConfig) {
        if (configs.indexOf(key) >= 0) {
            //@ts-ignore
            if (!cloudConfig[key]) {
                error += '    $(' + RED + ')' + '$(' + BOLD + ')' + key + '$(' + RESET + ')' + '$(' + RED + ')' + " can't be blank & must be a string\n"
            }
            configs.splice(configs.indexOf(key), 1);
        }
    }
    configs.forEach(key => {
        error += '    $(' + RED + ')' + '$(' + BOLD + ')' + key + '$(' + RESET + ')' + '$(' + RED + ')' + ' does not exist and must be a string\n'
    })
    return error;
}