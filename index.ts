import minimist from 'minimist'

import error from './utils/error'
import { deploy, version, help, transfer, run, start, restart, stop, deleteService, } from './cmds'

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

        case 'run':
            run()
            break

        case 'start':
            start(args)
            break

        case 'restart':
            restart()
            break

        case 'stop':
            stop()
            break

        case 'delete':
            deleteService()
            break

        case 'deploy':
            deploy(args)
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
