'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = __importDefault(require("ws"));
var spinner_1 = require("./../utils/spinner");
var WebSocketClient = /** @class */ (function () {
    function WebSocketClient(domain) {
        if (domain === void 0) { domain = 'localhost:8080'; }
        this.ws = new ws_1.default("ws://" + domain);
    }
    WebSocketClient.prototype.onInit = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.ws.onopen = function (ev) {
                console.log('\nPreparing Server deployment...\n');
                resolve(ev);
            };
            _this.ws.onclose = function (ev) {
                console.log("Connection is closed...");
                reject(ev);
            };
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
            if (message === 'start_spinner') {
                spinner_1.start_spinner('Running the scripts...\n');
            }
            else if (message === 'stop_spinner') {
                spinner_1.stop_spinner();
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