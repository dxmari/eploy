import shellJS from "../utils/shell"
import { BLUE, BOLD, GREEN, MAGENTA, RESET, YELLOW } from "../utils/text-colors"

const menus: any = {
  main: `
    $(${YELLOW})$(${BOLD})eploy [command] <options>$(${RESET})
      
      $(${BLUE})$(${BOLD})version$(${MAGENTA}) ........... show package version.
      $(${BLUE})$(${BOLD})help$(${MAGENTA}) .............. show help menu for a command.
      
      $(${GREEN})$(${BOLD})#FOR SERVER

      $(${BLUE})$(${BOLD})run daemon$(${MAGENTA})$(${BOLD}) ............... to run the eploy service as a daemon and kept alive forever
      $(${BLUE})$(${BOLD})run$(${MAGENTA})$(${BOLD}) ...................... to run the eploy service temporarily
      $(${BLUE})$(${BOLD})start$(${MAGENTA})$(${BOLD}) .................... to start the eploy service as background process
      $(${BLUE})$(${BOLD})restart$(${MAGENTA})$(${BOLD}) .................. to restart the eploy service as background process
      $(${BLUE})$(${BOLD})stop$(${MAGENTA})$(${BOLD}) ..................... to stop the eploy service as background process
      $(${BLUE})$(${BOLD})delete$(${MAGENTA})$(${BOLD}) ................... to delete the eploy service as background process


      $(${GREEN})$(${BOLD})#FOR CLIENT

      $(${BLUE})$(${BOLD})deploy$(${MAGENTA}) ............ to run the server deployment for staging or production
      $(${BLUE})$(${BOLD})transfer$(${MAGENTA}) .......... to transfer the files to the staging or production server
      
      `,
}


export default async (args: any) => {
  const subCmd: any = args._[0] === 'help'
    ? args._[1]
    : args._[0]

  await shellJS('echo "' + (menus[subCmd] || menus.main) + '"');
}