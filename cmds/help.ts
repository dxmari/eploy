import shellJS from "../utils/shell"
import { BLUE, BOLD, MAGENTA, RESET, YELLOW } from "../utils/text-colors"

const menus: any = {
  main: `
    $(${YELLOW})$(${BOLD})eploy [command] <options>$(${RESET})
      
      $(${BLUE})$(${BOLD})start$(${MAGENTA})$(${BOLD}) ............. to start the eploy service in background process

      $(${BLUE})$(${BOLD})deploy$(${MAGENTA}) ............ to run the server deployment for staging or production
      $(${BLUE})$(${BOLD})transfer$(${MAGENTA}) .......... to transfer the files to the staging or production server
      $(${BLUE})$(${BOLD})version$(${MAGENTA}) ........... show package version.
      $(${BLUE})$(${BOLD})help$(${MAGENTA}) .............. show help menu for a command.
      
      `,
}


export default async (args: any) => {
  const subCmd: any = args._[0] === 'help'
    ? args._[1]
    : args._[0]

  // console.log(menus[subCmd] || menus.main)
  try {
    await shellJS('echo "' + (menus[subCmd] || menus.main) + '"');
  } catch (error) {
    
  }
}