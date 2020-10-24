'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = __importDefault(require("ws"));
var ws = new ws_1.default("ws://127.0.0.1:10001");
var WebSocketClient = /** @class */ (function () {
    function WebSocketClient() {
        this.ws = ws;
    }
    WebSocketClient.prototype.onInit = function () {
        ws.onopen = function (event) {
            console.log('Connection is established');
        };
        ws.onclose = function () {
            console.log("Connection is closed...");
        };
    };
    WebSocketClient.prototype.onError = function (cb) {
        ws.onerror = function (err) {
            console.log('err: ', err);
            return cb(err);
        };
    };
    WebSocketClient.prototype.sendParamsToServer = function (message) {
        ws.send(message);
    };
    WebSocketClient.prototype.onReceive = function (cb) {
        ws.onmessage = function (event) {
            console.log(event.data);
            return cb(event.data);
        };
    };
    return WebSocketClient;
}());
exports.default = new WebSocketClient();
//# sourceMappingURL=index.js.map