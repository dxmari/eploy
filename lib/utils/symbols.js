"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.symError = exports.symWarning = exports.symSuccess = exports.symInfo = void 0;
var text_colors_1 = require("./text-colors");
exports.symInfo = '$(' + text_colors_1.MAGENTA + ')' + 'ℹ '; //+ '$(' + RESET + ') '
exports.symSuccess = '$(' + text_colors_1.GREEN + ')' + '✔ '; //+ '$(' + RESET + ') '
exports.symWarning = '$(' + text_colors_1.YELLOW + ')' + '⚠ '; //+ '$(' + RESET + ') '
exports.symError = '$(' + text_colors_1.RED + ')' + '✖ '; //+ '$(' + RESET + ') '
//# sourceMappingURL=symbols.js.map