"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var exec_1 = __importDefault(require("./../utils/exec"));
var ServerHelper = /** @class */ (function () {
    function ServerHelper() {
    }
    ServerHelper.prototype.handleMessage = function (serverMessage, ws) {
        var _a, _b, _c, _d;
        if (serverMessage.type === 'deploy') {
            if (serverMessage.configType === 'staging') {
                this.navigateToAppPathAndLaunchScript(ws, (_a = serverMessage.config.cloud_config) === null || _a === void 0 ? void 0 : _a.staging);
            }
            else {
                this.navigateToAppPathAndLaunchScript(ws, (_b = serverMessage.config.cloud_config) === null || _b === void 0 ? void 0 : _b.production);
            }
        }
        else if (serverMessage.type === 'transfer') {
            if (serverMessage.configType === 'staging') {
                this.runFilesExtract(ws, (_c = serverMessage.config.transfer_config) === null || _c === void 0 ? void 0 : _c.staging);
            }
            else {
                this.runFilesExtract(ws, (_d = serverMessage.config.transfer_config) === null || _d === void 0 ? void 0 : _d.production);
            }
        }
    };
    ServerHelper.prototype.navigateToAppPathAndLaunchScript = function (ws, cloudConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var logs, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ws.send(JSON.stringify({
                            code: 2,
                            message: "1)Redirect to " + (cloudConfig === null || cloudConfig === void 0 ? void 0 : cloudConfig.application_path) + "\n\n2)Update the files from git repo(" + (cloudConfig === null || cloudConfig === void 0 ? void 0 : cloudConfig.ref) + ")\n\n3)Run pre launch scripts " + "'" + (cloudConfig === null || cloudConfig === void 0 ? void 0 : cloudConfig.pre_launch_script) + "'" + "\n\n"
                        }));
                        ws.send('start_spinner');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, exec_1.default("\n                   cd " + (cloudConfig === null || cloudConfig === void 0 ? void 0 : cloudConfig.application_path) + " && echo '\n-------------GIT Details------------\n' " + ((cloudConfig === null || cloudConfig === void 0 ? void 0 : cloudConfig.ref) ? (' &&  git pull ' + (cloudConfig === null || cloudConfig === void 0 ? void 0 : cloudConfig.ref.replace('/', ' '))) : '') + " && echo '\n------------------------------------\n' && " + (cloudConfig === null || cloudConfig === void 0 ? void 0 : cloudConfig.pre_launch_script) + "\n            ")];
                    case 2:
                        logs = _a.sent();
                        ws.send(logs);
                        ws.send('stop_spinner');
                        ws.send(JSON.stringify({
                            code: 0,
                            message: 'Deployed Success...\n'
                        }));
                        ws.send('exit');
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        ws.send('stop_spinner');
                        ws.send(JSON.stringify({
                            code: 1,
                            message: 'Deployment failed due to below reason:\n',
                            error: error_1
                        }));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ServerHelper.prototype.runFilesExtract = function (ws, transferConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var filename, logs, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filename = transferConfig === null || transferConfig === void 0 ? void 0 : transferConfig.source_path.split('/').pop();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, exec_1.default("cd " + (transferConfig === null || transferConfig === void 0 ? void 0 : transferConfig.destination_path) + " && rm -rf " + filename + " && tar -xvf " + filename + ".zip && rm " + filename + ".zip")];
                    case 2:
                        logs = _a.sent();
                        ws.send(logs);
                        ws.send('unzip_complete');
                        ws.send('exit');
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        ws.send(JSON.stringify({
                            code: 1,
                            message: 'Transfering files failed due to below reason:\n',
                            error: error_2
                        }));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ServerHelper;
}());
exports.default = new ServerHelper();
//# sourceMappingURL=server.helper.js.map