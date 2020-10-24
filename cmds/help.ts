const menus: any = {
  main: `
      eploy [command] <options>
      
      version ........... show package version.
      help .............. show help menu for a command.`,
}


export default (args: any) => {
  const subCmd: any = args._[0] === 'help'
    ? args._[1]
    : args._[0]

  console.log(menus[subCmd] || menus.main)
}