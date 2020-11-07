"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transfer = exports.deploy = exports.deleteService = exports.stop = exports.restart = exports.start = exports.run = exports.version = exports.help = void 0;
var deploy_1 = __importDefault(require("./deploy"));
exports.deploy = deploy_1.default;
var help_1 = __importDefault(require("./help"));
exports.help = help_1.default;
var manage_server_1 = require("./manage-server");
Object.defineProperty(exports, "run", { enumerable: true, get: function () { return manage_server_1.run; } });
Object.defineProperty(exports, "start", { enumerable: true, get: function () { return manage_server_1.start; } });
Object.defineProperty(exports, "restart", { enumerable: true, get: function () { return manage_server_1.restart; } });
Object.defineProperty(exports, "stop", { enumerable: true, get: function () { return manage_server_1.stop; } });
Object.defineProperty(exports, "deleteService", { enumerable: true, get: function () { return manage_server_1.deleteService; } });
var transfer_1 = __importDefault(require("./transfer"));
exports.transfer = transfer_1.default;
var version_1 = __importDefault(require("./version"));
exports.version = version_1.default;
//# sourceMappingURL=index.js.map