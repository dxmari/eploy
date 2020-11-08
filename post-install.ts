import shell from "./utils/shell";
import { BLUE, BOLD, RESET, YELLOW } from "./utils/text-colors";

(async ()=>{
    await shell(`echo "

$(${YELLOW}) Thanks for installing $(${BOLD})eploy$(${RESET})$(${YELLOW}) - Easy Deployment 🙏 🙏 🙏 🙏 🙏 

$(${BLUE}) Please execute a $(${BOLD})'eploy start daemon'$(${RESET}) $(${BLUE})to run eploy service in a background process.

$(${BLUE}) Please refer the documentation https://github.com/dxmari/eploy/blob/master/README.md $(${RESET})

    "`);
})();