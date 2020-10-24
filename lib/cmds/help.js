"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var menus = {
    main: "\n      eploy [command] <options>\n      \n      version ........... show package version.\n      help .............. show help menu for a command.",
};
exports.default = (function (args) {
    var subCmd = args._[0] === 'help'
        ? args._[1]
        : args._[0];
    console.log(menus[subCmd] || menus.main);
});
//# sourceMappingURL=help.js.map