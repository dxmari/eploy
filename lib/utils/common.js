"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isJson = void 0;
exports.isJson = function (params) {
    try {
        return JSON.parse(params);
    }
    catch (e) {
        return false;
    }
};
//# sourceMappingURL=common.js.map