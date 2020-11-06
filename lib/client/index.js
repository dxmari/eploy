"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = __importDefault(require("ws"));
var spinner_1 = require("./../utils/spinner");
var shell_messages_helper_1 = require("./../helpers/shell-messages.helper");
var common_1 = require("../utils/common");
var WebSocketClient = /** @class */ (function () {
    function WebSocketClient() {
        this.ws = '';
    }
    WebSocketClient.prototype.onInit = function (domain) {
        var _this = this;
        if (domain === void 0) { domain = 'localhost:10101'; }
        return new Promise(function (resolve, reject) {
            try {
                _this.ws = new ws_1.default("ws://" + domain);
                _this.ws.onopen = function (ev) {
                    shell_messages_helper_1.runBeforeError('\nConnecting to a Server...\n');
                    resolve(ev);
                };
                _this.ws.onclose = function (ev) {
                    // console.log("Connection is closed...");
                    reject(ev);
                };
                _this.ws.onerror = function (error) {
                    reject(error);
                };
            }
            catch (error) {
                reject(error);
            }
        });
    };
    WebSocketClient.prototype.onError = function (cb) {
        this.ws.onerror = function (err) {
            console.log('err: ', err);
            return cb(err);
        };
    };
    WebSocketClient.prototype.sendParamsToServer = function (message) {
        this.ws.send(message);
    };
    WebSocketClient.prototype.onReceive = function (cb) {
        this.ws.onmessage = function (event) {
            var message = event.data;
            if (common_1.isJson(event.data)) {
                message = common_1.isJson(event.data);
            }
            if (message === 'start_spinner') {
                spinner_1.start_spinner('Running the scripts...\n');
            }
            else if (message === 'stop_spinner') {
                spinner_1.stop_spinner();
            }
            else if (message === 'exit') {
                process.exit();
            }
            else {
                if (cb) {
                    return cb(message);
                }
            }
        };
    };
    return WebSocketClient;
}());
exports.default = new WebSocketClient();
//# sourceMappingURL=index.js.map