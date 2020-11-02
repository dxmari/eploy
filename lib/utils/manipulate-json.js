"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var ManipulateJSON = /** @class */ (function () {
    function ManipulateJSON() {
    }
    ManipulateJSON.path = function (filepath) {
        try {
            this.isModified = false;
            if (!filepath) {
                this.json = null;
                this.filepath = null;
                return;
            }
            this.filepath = path_1.default.resolve(filepath);
            this.json = fs_1.default.readFileSync(this.filepath, {
                encoding: 'utf8'
            });
            this.json = JSON.parse(this.json);
            return this;
        }
        catch (error) {
            this.json = null;
            console.log('File not found in a given path');
            return this;
        }
    };
    ManipulateJSON.get = function (param) {
        if (!param)
            return this.json;
        if (typeof param === 'string') {
            if (this.json) {
                return this.json[param];
            }
        }
        else {
            if (Array.isArray(this.json[param.key])) {
                var condition_1 = false;
                var $or = param.cond.$or || [];
                var $and = param.cond.$and || [];
                var idx = this.json[param.key].findIndex(function (e) {
                    $or.forEach(function (or) {
                        for (var key in or) {
                            if (key in e) {
                                condition_1 = condition_1 || e[key] === or[key];
                            }
                        }
                    });
                    $and.forEach(function (and) {
                        for (var key in and) {
                            if (key in e) {
                                condition_1 = condition_1 && e[key] === and[key];
                            }
                        }
                    });
                    return condition_1;
                });
                if (idx >= 0) {
                    return this.json[param.key][idx];
                }
                return null;
            }
        }
        return null;
    };
    ManipulateJSON.set = function (a, b) {
        if (arguments.length == 2) {
            if (this.json) {
                this.json[a] = b;
                this.isModified = true;
            }
            else {
                console.error("Error : Please give a path");
            }
        }
        else {
            if (a.type == 'remove') {
                if (a.cond) {
                    if (Array.isArray(this.json[a.key])) {
                        var condition_2 = false;
                        var $or = a.cond.$or || [];
                        var $and = a.cond.$and || [];
                        var idx = this.json[a.key].findIndex(function (e) {
                            $or.forEach(function (or) {
                                for (var key in or) {
                                    if (key in e) {
                                        condition_2 = condition_2 || e[key] === or[key];
                                    }
                                }
                            });
                            $and.forEach(function (or) {
                                for (var key in or) {
                                    if (key in e) {
                                        condition_2 = condition_2 && e[key] === or[key];
                                    }
                                }
                            });
                            return condition_2;
                        });
                        if (idx >= 0) {
                            this.isModified = true;
                            this.json[a.key].splice(idx, 1);
                        }
                    }
                }
                else {
                    if (a.key in this.json) {
                        this.isModified = true;
                        delete this.json[a.key];
                    }
                }
            }
            else if (a.type == 'modify') {
                if (a.cond) {
                    if (Array.isArray(this.json[a.key]) && Object.keys(a.data).length > 0) {
                        var condition_3 = false;
                        var $or = a.cond.$or || [];
                        var $and = a.cond.$and || [];
                        var idx = this.json[a.key].findIndex(function (e) {
                            $or.forEach(function (or) {
                                for (var key in or) {
                                    if (key in e) {
                                        condition_3 = condition_3 || e[key] === or[key];
                                    }
                                }
                            });
                            $and.forEach(function (or) {
                                for (var key in or) {
                                    if (key in e) {
                                        condition_3 = condition_3 && e[key] === or[key];
                                    }
                                }
                            });
                            return condition_3;
                        });
                        if (idx >= 0) {
                            this.isModified = true;
                            for (var param in a.data) {
                                this.json[a.key][idx][param] = a.data[param];
                            }
                        }
                    }
                }
                else {
                    if (a.key in this.json) {
                        this.isModified = true;
                        for (var param in a.data) {
                            this.json[a.key][param] = a.data[param];
                        }
                    }
                }
            }
        }
        return this;
    };
    ManipulateJSON.save = function () {
        console.log(this.json);
        if (this.json) {
            if (this.isModified) {
                fs_1.default.writeFileSync(this.filepath, JSON.stringify(this.json), {
                    encoding: 'utf8'
                });
            }
            this.json = null;
            this.filepath = null;
            this.isModified = false;
            return true;
        }
        return false;
    };
    ManipulateJSON.isModified = false;
    ManipulateJSON.json = null;
    ManipulateJSON.filepath = "";
    return ManipulateJSON;
}());
exports.default = ManipulateJSON;
//# sourceMappingURL=manipulate-json.js.map