"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESET = exports.UNDERLINE = exports.BOLD = exports.CLEAR_LINE = exports.MOVE_UP = exports.WHITE = exports.MAGENTA = exports.BLUE = exports.YELLOW = exports.GREEN = exports.RED = exports.BLACK = void 0;
exports.BLACK = 'tput setaf 0';
exports.RED = 'tput setaf 1';
exports.GREEN = 'tput setaf 2';
exports.YELLOW = 'tput setaf 3';
exports.BLUE = 'tput setaf 4';
exports.MAGENTA = 'tput setaf 5';
exports.WHITE = 'tput setaf 6';
exports.MOVE_UP = "tput cuu 1";
exports.CLEAR_LINE = "tput el 1";
exports.BOLD = "tput bold";
exports.UNDERLINE = "tput smul";
exports.RESET = "tput sgr0";
//# sourceMappingURL=text-colors.js.map