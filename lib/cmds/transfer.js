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
var path_1 = __importDefault(require("path"));
var shell_exec_1 = __importDefault(require("../utils/shell_exec"));
var index_1 = __importDefault(require("./../client/index"));
var prompts_1 = require("./../utils/prompts");
var error_helper_1 = require("./../helpers/error.helper");
var shell_messages_helper_1 = require("./../helpers/shell-messages.helper");
exports.default = (function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var filePath, config, type, transferTypeResp, transferConfig, dataError, errorMsg, source_path, dest_path, logs, error_1, logs, error_2, error_3, params;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                filePath = path_1.default.resolve('./eploy.config.js');
                config = require(filePath);
                type = 0;
                if ('staging' in (config.transfer_config || {})) {
                    type = 1;
                }
                if ('production' in (config.transfer_config || {})) {
                    type = 2;
                }
                if (('staging' in (config.transfer_config || {})) && ('production' in (config.transfer_config || {}))) {
                    type = 3;
                }
                if (!(type === 0)) return [3 /*break*/, 2];
                return [4 /*yield*/, shell_messages_helper_1.runBeforeError('\nPlease add the transfer configs in eploy.config.js\n')];
            case 1:
                _c.sent();
                return [2 /*return*/, process.exit()];
            case 2: return [4 /*yield*/, prompts_1.chooseTransferType(type)];
            case 3:
                transferTypeResp = _c.sent();
                if (!(Object.keys(transferTypeResp).length === 0)) return [3 /*break*/, 5];
                return [4 /*yield*/, shell_messages_helper_1.runBeforeError('\nTransfering the file was aborted.\n')];
            case 4:
                _c.sent();
                return [2 /*return*/, process.exit()];
            case 5:
                if (transferTypeResp.transferType === 'staging') {
                    transferConfig = ((_a = config.transfer_config) === null || _a === void 0 ? void 0 : _a.staging) || {};
                }
                else {
                    transferConfig = ((_b = config.transfer_config) === null || _b === void 0 ? void 0 : _b.production) || {};
                }
                dataError = error_helper_1.handleTransferConfig(transferConfig);
                if (!dataError) return [3 /*break*/, 8];
                errorMsg = '\n  Transfering files having errors:\n';
                return [4 /*yield*/, shell_messages_helper_1.runBeforeError(errorMsg)];
            case 6:
                _c.sent();
                return [4 /*yield*/, shell_messages_helper_1.runShellError(dataError)];
            case 7:
                _c.sent();
                return [2 /*return*/, process.exit()];
            case 8:
                source_path = (transferConfig === null || transferConfig === void 0 ? void 0 : transferConfig.source_path) || '';
                dest_path = (transferConfig === null || transferConfig === void 0 ? void 0 : transferConfig.destination_path) || '';
                if (!transferConfig.pre_transfer_script) return [3 /*break*/, 14];
                return [4 /*yield*/, shell_messages_helper_1.runBeforeError('\nRunning pre transfer scripts\n')];
            case 9:
                _c.sent();
                _c.label = 10;
            case 10:
                _c.trys.push([10, 12, , 14]);
                return [4 /*yield*/, shell_exec_1.default("" + transferConfig.pre_transfer_script)];
            case 11:
                logs = _c.sent();
                console.log(logs);
                return [3 /*break*/, 14];
            case 12:
                error_1 = _c.sent();
                return [4 /*yield*/, shell_messages_helper_1.runShellError('Pre transfer script error : ' + error_1, true)];
            case 13:
                _c.sent();
                return [2 /*return*/, process.exit()];
            case 14:
                _c.trys.push([14, 16, , 18]);
                return [4 /*yield*/, shell_exec_1.default("echo '\n' && tar -czvf /tmp/" + (source_path + '.zip') + " " + source_path)];
            case 15:
                logs = _c.sent();
                console.log(logs);
                shell_messages_helper_1.runShellSuccess('Folder zipping completed..\n', true);
                return [3 /*break*/, 18];
            case 16:
                error_2 = _c.sent();
                return [4 /*yield*/, shell_messages_helper_1.runShellError('Folder zipping error : ' + error_2, true)];
            case 17:
                _c.sent();
                return [2 /*return*/, process.exit()];
            case 18:
                _c.trys.push([18, 20, , 21]);
                return [4 /*yield*/, shell_exec_1.default("scp -rp /tmp/" + source_path.split('/').pop() + ".zip " + transferConfig.user + "@" + transferConfig.host + ":" + dest_path)];
            case 19:
                _c.sent();
                shell_messages_helper_1.runShellSuccess('The zip file was transfered to a server..\n', true);
                return [3 /*break*/, 21];
            case 20:
                error_3 = _c.sent();
                shell_messages_helper_1.runShellError('zipped Folder transfer error : ' + error_3, true);
                return [2 /*return*/, process.exit()];
            case 21: return [4 /*yield*/, index_1.default.onInit(transferConfig.host)];
            case 22:
                _c.sent();
                params = {
                    type: 'transfer',
                    config: config,
                    configType: transferTypeResp.transferType
                };
                index_1.default.sendParamsToServer(JSON.stringify(params));
                index_1.default.onReceive(function (message) {
                    if (message === 'unzip_complete') {
                        shell_messages_helper_1.runShellSuccess('Folder unzipping was completed..\n', true);
                        process.exit();
                    }
                });
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=transfer.js.map