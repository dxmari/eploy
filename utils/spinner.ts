import ora from 'ora'
const spinner = ora();

export const start_spinner = (args = '') =>{
    spinner.start(args)
}

export const stop_spinner = () =>{
    spinner.stop()
}