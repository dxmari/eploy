"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stop_spinner = exports.start_spinner = void 0;
var ora_1 = __importDefault(require("ora"));
var spinner = ora_1.default();
exports.start_spinner = function (args) {
    if (args === void 0) { args = ''; }
    spinner.start(args);
};
exports.stop_spinner = function () {
    spinner.stop();
};
//# sourceMappingURL=spinner.js.map