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
var index_1 = __importDefault(require("./../client/index"));
var path_1 = __importDefault(require("path"));
var error_helper_1 = require("./../helpers/error.helper");
var shell_messages_helper_1 = require("./../helpers/shell-messages.helper");
var prompts_1 = require("./../utils/prompts");
exports.default = (function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var filePath, config, type, cloudTypeResp, cloudConfig, dataError, errorMsg, params, error_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                filePath = path_1.default.resolve('./eploy.config.js');
                config = require(filePath);
                type = 0;
                if ('staging' in (config.cloud_config || {})) {
                    type = 1;
                }
                if ('production' in (config.cloud_config || {})) {
                    type = 2;
                }
                if (('staging' in (config.cloud_config || {})) && ('production' in (config.cloud_config || {}))) {
                    type = 3;
                }
                if (type === 0) {
                    console.error('Please add the cloud configs in eploy.config.js');
                    process.exit();
                    return [2 /*return*/];
                }
                return [4 /*yield*/, prompts_1.chooseCloudType(type)];
            case 1:
                cloudTypeResp = _c.sent();
                if (Object.keys(cloudTypeResp).length === 0) {
                    console.error('Deployment was aborted.');
                    return [2 /*return*/];
                }
                if (cloudTypeResp.cloudType === 'staging') {
                    cloudConfig = ((_a = config.cloud_config) === null || _a === void 0 ? void 0 : _a.staging) || {};
                }
                else {
                    cloudConfig = ((_b = config.cloud_config) === null || _b === void 0 ? void 0 : _b.production) || {};
                }
                dataError = error_helper_1.handleCloudConfig(cloudConfig);
                if (!dataError) return [3 /*break*/, 4];
                errorMsg = '\n  Transfering files having errors:\n';
                return [4 /*yield*/, shell_messages_helper_1.runBeforeError(errorMsg)];
            case 2:
                _c.sent();
                return [4 /*yield*/, shell_messages_helper_1.runShellError(dataError)];
            case 3:
                _c.sent();
                return [2 /*return*/, process.exit()];
            case 4:
                _c.trys.push([4, 6, , 7]);
                return [4 /*yield*/, index_1.default.onInit(cloudConfig.host)];
            case 5:
                _c.sent();
                index_1.default.onReceive(function (message) {
                    if (typeof message === 'string') {
                        console.log(message);
                    }
                    else {
                        if (message.code === 0) {
                            shell_messages_helper_1.runShellSuccess(message.message, true);
                        }
                        else if (message.code === 2) {
                            shell_messages_helper_1.runInfoMsg(message.message);
                        }
                        else {
                            shell_messages_helper_1.runBeforeError(message.message);
                            shell_messages_helper_1.runShellError(message.error, true);
                        }
                    }
                });
                params = {
                    type: 'deploy',
                    config: config,
                    configType: cloudTypeResp.cloudType
                };
                index_1.default.sendParamsToServer(JSON.stringify(params));
                return [3 /*break*/, 7];
            case 6:
                error_1 = _c.sent();
                console.error('\n');
                shell_messages_helper_1.runBeforeError('could not connect to a host ' + cloudConfig.host + ' due to below reason:\n');
                shell_messages_helper_1.runShellError(error_1, true);
                console.error('\n');
                process.exit();
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=deploy.js.map