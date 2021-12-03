import fs from 'fs';
import path from 'path';

export default class ManipulateJSON {
    public static isModified: boolean = false;
    public static json: any = null;
    public static filepath: any = "";
    public static orginalFilepath: any = "";
    constructor() { }

    static path(filepath: string) {
        try {
            this.isModified = false;
            if (!filepath) {
                this.json = null;
                this.filepath = null;
                return;
            }
            this.orginalFilepath = filepath;
            this.filepath = path.resolve(__dirname, '../../', filepath);
            this.json = fs.readFileSync(this.filepath, {
                encoding: 'utf8'
            });
            this.json = JSON.parse(this.json);
            return this;
        } catch (error) {
            this.json = null;
            console.log('File not found in a given path')
            return this;
        }
    }
    static get(param?: string | any) {
        if (!param) return this.json;

        if (typeof param === 'string') {
            if (this.json) {
                return this.json[param];
            }
        } else {
            if (Array.isArray(this.json[param.key])) {
                let condition = false;
                var $or = param.cond.$or || [];
                var $and = param.cond.$and || [];
                let idx = this.json[param.key].findIndex((e: any) => {
                    $or.forEach((or: any) => {
                        for (let key in or) {
                            if (key in e) {
                                condition = condition || e[key] === or[key];
                            }
                        }
                    })
                    $and.forEach((and: any) => {
                        for (let key in and) {
                            if (key in e) {
                                condition = condition && e[key] === and[key];
                            }
                        }
                    })
                    return condition;
                });
                if (idx >= 0) {
                    return this.json[param.key][idx];
                }
                return null;
            }
        }
        return null;
    }
    static set(a: any, b: any) {
        if (arguments.length == 2) {
            if (this.json) {
                this.json[a] = b;
                this.isModified = true;
            } else {
                console.error("Error : Please give a path")
            }
        } else {
            if (a.type == 'remove') {
                if (a.cond) {
                    if (Array.isArray(this.json[a.key])) {
                        let condition = false;
                        var $or = a.cond.$or || [];
                        var $and = a.cond.$and || [];
                        let idx = this.json[a.key].findIndex((e: any) => {
                            $or.forEach((or: any) => {
                                for (let key in or) {
                                    if (key in e) {
                                        condition = condition || e[key] === or[key];
                                    }
                                }
                            })
                            $and.forEach((or: any) => {
                                for (let key in or) {
                                    if (key in e) {
                                        condition = condition && e[key] === or[key];
                                    }
                                }
                            })
                            return condition;
                        });
                        if (idx >= 0) {
                            this.isModified = true;
                            this.json[a.key].splice(idx, 1);
                        }
                    }
                } else {
                    if (a.key in this.json) {
                        this.isModified = true;
                        delete this.json[a.key];
                    }
                }
            } else if (a.type == 'modify') {
                if (a.cond) {
                    if (Array.isArray(this.json[a.key]) && Object.keys(a.data).length > 0) {
                        let condition = false;
                        var $or = a.cond.$or || [];
                        var $and = a.cond.$and || [];
                        let idx = this.json[a.key].findIndex((e: any) => {
                            $or.forEach((or: any) => {
                                for (let key in or) {
                                    if (key in e) {
                                        condition = condition || e[key] === or[key];
                                    }
                                }
                            })
                            $and.forEach((or: any) => {
                                for (let key in or) {
                                    if (key in e) {
                                        condition = condition && e[key] === or[key];
                                    }
                                }
                            })
                            return condition;
                        });
                        if (idx >= 0) {
                            this.isModified = true;
                            for (let param in a.data) {
                                this.json[a.key][idx][param] = a.data[param];
                            }
                        }
                    }
                } else {
                    if (a.key in this.json) {
                        this.isModified = true;
                        for (let param in a.data) {
                            this.json[a.key][param] = a.data[param];
                        }
                    }
                }
            }
        }
        return this;
    }
    static save() {
        if (this.json) {
            if (this.isModified) {
                fs.writeFileSync(this.filepath, JSON.stringify(this.json), {
                    encoding: 'utf8'
                });
                var tempFilepath = path.resolve(__dirname, '../../lib/', this.orginalFilepath);
                fs.writeFileSync(tempFilepath, JSON.stringify(this.json), {
                    encoding: 'utf8'
                });
            }
            this.json = null;
            this.filepath = null;
            this.isModified = false;
            return true;
        }
        return false;
    }
}