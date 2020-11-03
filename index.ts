import minimist from 'minimist'

import error from './utils/error'
import { deploy, version, help, start, transfer } from './cmds'

const integrateCmds = () => {
    const args = minimist(process.argv.slice(2))

    let cmd = args._[0] || 'help'

    if (args.version || args.v) {
        cmd = 'version'
    }

    if (args.help || args.h) {
        cmd = 'help'
    }

    switch (cmd) {
        case 'version':
            version(args)
            break

        case 'help':
            help(args)
            break

        case 'deploy':
            deploy(args)
            break

        case 'start':
            start()
            break

        case 'transfer':
            transfer(args)
            break

        default:
            error(`"${cmd}" is not a valid command!`, true)
            break
    }
}

export const init = async () => {
    integrateCmds();
} 
