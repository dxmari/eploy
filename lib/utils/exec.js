"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
exports.default = (function (cmd) {
    return new Promise(function (resolve, reject) {
        child_process_1.exec(cmd, function (err, stdout, stderr) {
            if (stdout) {
                return resolve(stdout);
            }
            console.log(stderr);
            resolve(false);
        });
    });
});
//# sourceMappingURL=exec.js.map