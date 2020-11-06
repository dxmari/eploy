"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCloudConfig = exports.handleTransferConfig = void 0;
var text_colors_1 = require("./../utils/text-colors");
exports.handleTransferConfig = function (transferConfig) {
    var error = "";
    var configs = ['host', 'user', 'source_path', 'destination_path'];
    for (var key in transferConfig) {
        if (configs.indexOf(key) >= 0) {
            //@ts-ignore
            if (!transferConfig[key]) {
                error += '    $(' + text_colors_1.RED + ')' + '$(' + text_colors_1.BOLD + ')' + key + '$(' + text_colors_1.RESET + ')' + '$(' + text_colors_1.RED + ')' + " can't be blank & must be a string\n";
            }
            configs.splice(configs.indexOf(key), 1);
        }
    }
    configs.forEach(function (key) {
        error += '    $(' + text_colors_1.RED + ')' + '$(' + text_colors_1.BOLD + ')' + key + '$(' + text_colors_1.RESET + ')' + '$(' + text_colors_1.RED + ')' + ' does not exist and must be a string\n';
    });
    return error;
};
exports.handleCloudConfig = function (cloudConfig) {
    var error = "";
    var configs = ['host', 'repo', 'ref', 'application_path'];
    for (var key in cloudConfig) {
        if (configs.indexOf(key) >= 0) {
            //@ts-ignore
            if (!cloudConfig[key]) {
                error += '    $(' + text_colors_1.RED + ')' + '$(' + text_colors_1.BOLD + ')' + key + '$(' + text_colors_1.RESET + ')' + '$(' + text_colors_1.RED + ')' + " can't be blank & must be a string\n";
            }
            configs.splice(configs.indexOf(key), 1);
        }
    }
    configs.forEach(function (key) {
        error += '    $(' + text_colors_1.RED + ')' + '$(' + text_colors_1.BOLD + ')' + key + '$(' + text_colors_1.RESET + ')' + '$(' + text_colors_1.RED + ')' + ' does not exist and must be a string\n';
    });
    return error;
};
//# sourceMappingURL=error.helper.js.map