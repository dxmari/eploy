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
exports.deleteService = exports.stop = exports.restart = exports.start = exports.run = void 0;
var exec_1 = __importDefault(require("../utils/exec"));
var prompts_1 = require("../utils/prompts");
var text_colors_1 = require("../utils/text-colors");
var symbols_1 = require("../utils/symbols");
/*.................EPLOY SERVICE START COMMANDS STARTS.................*/
exports.run = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        require('./../start-daemon');
        return [2 /*return*/];
    });
}); };
/*.................EPLOY SERVICE START COMMANDS STARTS.................*/
exports.start = function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var osDetail, servicePath, error_1, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, getOSName()];
            case 1:
                osDetail = _c.sent();
                if (!osDetail)
                    return [2 /*return*/];
                if (!(osDetail === 'mac')) return [3 /*break*/, 7];
                if (!(args._[1] === 'daemon')) return [3 /*break*/, 2];
                createMacDaemonService();
                return [3 /*break*/, 6];
            case 2:
                _c.trys.push([2, 4, , 6]);
                servicePath = '/Library/LaunchDaemons/www.eploy.service.plist';
                return [4 /*yield*/, exec_1.default("launchctl load " + servicePath + " && launchctl start www.eploy.service")];
            case 3:
                _c.sent();
                console.log('\n     eploy daemon service started\n');
                return [3 /*break*/, 6];
            case 4:
                error_1 = _c.sent();
                console.log('Error:', error_1);
                _b = (_a = console).log;
                return [4 /*yield*/, exec_1.default("echo \"" + symbols_1.symWarning + " $(" + text_colors_1.YELLOW + ")Make sure run the command $(" + text_colors_1.BOLD + ")$(" + text_colors_1.BLUE + ")'eploy start daemon'$(" + text_colors_1.RESET + ")$(" + text_colors_1.YELLOW + ") before execute a $(" + text_colors_1.BOLD + ")$(" + text_colors_1.BLUE + ")'eploy start'$(" + text_colors_1.RESET + ")\"")];
            case 5:
                _b.apply(_a, [_c.sent()]);
                process.exit();
                return [3 /*break*/, 6];
            case 6: return [3 /*break*/, 12];
            case 7:
                if (!(osDetail === 'ubuntu-linux')) return [3 /*break*/, 11];
                if (!(args._[1] === 'daemon')) return [3 /*break*/, 8];
                createUbuntuDaemonService();
                return [3 /*break*/, 10];
            case 8: return [4 /*yield*/, exec_1.default("sudo systemctl daemon-reload && sudo systemctl start eploy")];
            case 9:
                _c.sent();
                console.log('\n     eploy daemon service started\n');
                _c.label = 10;
            case 10: return [3 /*break*/, 12];
            case 11:
                process.exit();
                _c.label = 12;
            case 12: return [2 /*return*/];
        }
    });
}); };
var getOSName = function () { return __awaiter(void 0, void 0, void 0, function () {
    var kernalName, osDetail, osDetail, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, exec_1.default('uname')];
            case 1:
                kernalName = _a.sent();
                if (!(kernalName.toLowerCase().indexOf('darwin') >= 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, exec_1.default('sw_vers')];
            case 2:
                osDetail = _a.sent();
                if (osDetail.indexOf('Mac') >= 0 || osDetail.indexOf('mac') >= 0) {
                    return [2 /*return*/, 'mac'];
                }
                return [3 /*break*/, 5];
            case 3:
                if (!(kernalName.toLowerCase().indexOf('linux') >= 0)) return [3 /*break*/, 5];
                return [4 /*yield*/, exec_1.default('hostnamectl')];
            case 4:
                osDetail = _a.sent();
                if (osDetail.indexOf('Ubuntu') >= 0 || osDetail.indexOf('ubuntu') >= 0) {
                    return [2 /*return*/, 'ubuntu-linux'];
                }
                _a.label = 5;
            case 5: return [2 /*return*/, false];
            case 6:
                error_2 = _a.sent();
                console.log("Ooops, can't find a OS details, please contact us via github issues regading this." + error_2);
                return [2 /*return*/, false];
            case 7: return [2 /*return*/];
        }
    });
}); };
var createMacDaemonService = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exec_1.default('sudo rm -rf /Library/LaunchDaemons/www.eploy.service.plist && sudo cp /usr/local/lib/node_modules/eploy/.eploy/.config/.files/.plist/www.eploy.service.plist /Library/LaunchDaemons/')];
            case 1:
                _a.sent();
                setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, exec_1.default('launchctl load /Library/LaunchDaemons/www.eploy.service.plist && launchctl start www.eploy.service')];
                            case 1:
                                _a.sent();
                                console.log('\n     eploy daemon service started\n');
                                process.exit();
                                return [2 /*return*/];
                        }
                    });
                }); }, 1000);
                return [2 /*return*/];
        }
    });
}); };
var createUbuntuDaemonService = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exec_1.default('sudo rm -rf /etc/systemd/system/eploy.service && sudo cp /usr/lib/node_modules/eploy/.eploy/.config/.files/.service/eploy.service /etc/systemd/system/')];
            case 1:
                _a.sent();
                setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, exec_1.default('sudo systemctl daemon-reload && sudo systemctl start eploy && sudo systemctl enable eploy')];
                            case 1:
                                _a.sent();
                                console.log('\n     eploy daemon service started\n');
                                process.exit();
                                return [2 /*return*/];
                        }
                    });
                }); }, 1000);
                return [2 /*return*/];
        }
    });
}); };
/*.................EPLOY SERVICE RESTART COMMANDS STARTS.................*/
exports.restart = function () { return __awaiter(void 0, void 0, void 0, function () {
    var osDetail, serviceName, servicePath, logs, _a, _b, error_3;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, getOSName()];
            case 1:
                osDetail = _c.sent();
                if (!osDetail)
                    return [2 /*return*/];
                _c.label = 2;
            case 2:
                _c.trys.push([2, 11, , 12]);
                if (!(osDetail === 'mac')) return [3 /*break*/, 7];
                serviceName = 'www.eploy.service';
                servicePath = "/Library/LaunchDaemons/" + serviceName + ".plist";
                return [4 /*yield*/, exec_1.default("launchctl unload " + servicePath + " && launchctl load " + servicePath)];
            case 3:
                logs = _c.sent();
                if (!(logs.indexOf('No such file or directory') === -1)) return [3 /*break*/, 4];
                console.log('\n     eploy daemon service restarted\n');
                return [3 /*break*/, 6];
            case 4:
                console.log(servicePath + ": No such file or directory");
                _b = (_a = console).log;
                return [4 /*yield*/, exec_1.default("echo \"" + symbols_1.symWarning + " $(" + text_colors_1.YELLOW + ")Make sure run the command $(" + text_colors_1.BOLD + ")$(" + text_colors_1.BLUE + ")'eploy start daemon'$(" + text_colors_1.RESET + ")$(" + text_colors_1.YELLOW + ") before execute a $(" + text_colors_1.BOLD + ")$(" + text_colors_1.BLUE + ")'eploy restart'$(" + text_colors_1.RESET + ")\"")];
            case 5:
                _b.apply(_a, [_c.sent()]);
                process.exit();
                _c.label = 6;
            case 6: return [3 /*break*/, 10];
            case 7:
                if (!(osDetail === 'ubuntu-linux')) return [3 /*break*/, 9];
                return [4 /*yield*/, exec_1.default("sudo systemctl daemon-reload && sudo systemctl restart eploy")];
            case 8:
                _c.sent();
                console.log('\n     eploy daemon service restarted\n');
                return [3 /*break*/, 10];
            case 9:
                process.exit();
                _c.label = 10;
            case 10: return [3 /*break*/, 12];
            case 11:
                error_3 = _c.sent();
                console.log(error_3);
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); };
/*.................EPLOY SERVICE STOP COMMANDS STARTS.................*/
exports.stop = function () { return __awaiter(void 0, void 0, void 0, function () {
    var osDetail, servicePath, logs, _a, _b, error_4;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, getOSName()];
            case 1:
                osDetail = _c.sent();
                if (!osDetail)
                    return [2 /*return*/];
                _c.label = 2;
            case 2:
                _c.trys.push([2, 11, , 12]);
                if (!(osDetail === 'mac')) return [3 /*break*/, 7];
                servicePath = '/Library/LaunchDaemons/www.eploy.service.plist';
                return [4 /*yield*/, exec_1.default("launchctl unload " + servicePath)];
            case 3:
                logs = _c.sent();
                if (!(logs.indexOf('No such file or directory') === -1)) return [3 /*break*/, 4];
                console.log('\n     eploy daemon service stopped\n');
                return [3 /*break*/, 6];
            case 4:
                console.log(servicePath + ": No such file or directory");
                _b = (_a = console).log;
                return [4 /*yield*/, exec_1.default("echo \"" + symbols_1.symWarning + " $(" + text_colors_1.YELLOW + ")Make sure run the command $(" + text_colors_1.BOLD + ")$(" + text_colors_1.BLUE + ")'eploy start daemon'$(" + text_colors_1.RESET + ")$(" + text_colors_1.YELLOW + ") before execute a $(" + text_colors_1.BOLD + ")$(" + text_colors_1.BLUE + ")'eploy stop'$(" + text_colors_1.RESET + ")\"")];
            case 5:
                _b.apply(_a, [_c.sent()]);
                process.exit();
                _c.label = 6;
            case 6: return [3 /*break*/, 10];
            case 7:
                if (!(osDetail === 'ubuntu-linux')) return [3 /*break*/, 9];
                return [4 /*yield*/, exec_1.default("sudo systemctl daemon-reload && sudo systemctl stop eploy")];
            case 8:
                _c.sent();
                console.log('\n     eploy daemon service stopped\n');
                return [3 /*break*/, 10];
            case 9:
                process.exit();
                _c.label = 10;
            case 10: return [3 /*break*/, 12];
            case 11:
                error_4 = _c.sent();
                console.log(error_4);
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); };
/*.................EPLOY SERVICE DELETE COMMANDS STARTS.................*/
exports.deleteService = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, osDetail, servicePath, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prompts_1.confirmDeleteService()];
            case 1:
                response = _a.sent();
                console.log(response);
                if (!response.confirm_delete) return [3 /*break*/, 10];
                return [4 /*yield*/, getOSName()];
            case 2:
                osDetail = _a.sent();
                if (!osDetail)
                    return [2 /*return*/];
                _a.label = 3;
            case 3:
                _a.trys.push([3, 9, , 10]);
                if (!(osDetail === 'mac')) return [3 /*break*/, 5];
                servicePath = '/Library/LaunchDaemons/www.eploy.service.plist';
                return [4 /*yield*/, exec_1.default("launchctl unload " + servicePath + " && sudo rm -rf /Library/LaunchDaemons/www.eploy.service.plist")];
            case 4:
                _a.sent();
                console.log('\n     eploy daemon service deleted permanently\n');
                return [3 /*break*/, 8];
            case 5:
                if (!(osDetail === 'ubuntu-linux')) return [3 /*break*/, 7];
                return [4 /*yield*/, exec_1.default("sudo systemctl daemon-reload && sudo systemctl stop eploy && sudo rm -rf /etc/systemd/system/eploy.service")];
            case 6:
                _a.sent();
                console.log('\n     eploy daemon service deleted permanently\n');
                return [3 /*break*/, 8];
            case 7:
                process.exit();
                _a.label = 8;
            case 8: return [3 /*break*/, 10];
            case 9:
                error_5 = _a.sent();
                console.log(error_5);
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=manage-server.js.map