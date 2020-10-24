"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var shelljs_1 = __importDefault(require("shelljs"));
exports.default = (function (command, timeout) {
    if (timeout === void 0) { timeout = (10 * (60 * 1000)); }
    return new Promise(function (resolve) {
        var t = setTimeout(function () {
            resolve("timeout");
        }, timeout);
        var result = shelljs_1.default.exec(command);
        if (result.stdout) {
            clearTimeout(t);
            resolve(result.stdout);
        }
        else {
            clearTimeout(t);
            resolve(result.stderr);
        }
    });
});
//# sourceMappingURL=shell.js.map