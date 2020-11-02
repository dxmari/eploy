export default class ManipulateJSON {
    static isModified: boolean;
    static json: any;
    static filepath: any;
    constructor();
    static path(filepath: string): typeof ManipulateJSON | undefined;
    static get(param?: string | any): any;
    static set(a: any, b: any): typeof ManipulateJSON;
    static save(): boolean;
}
//# sourceMappingURL=manipulate-json.d.ts.map