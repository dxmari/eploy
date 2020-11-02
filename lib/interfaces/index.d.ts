import ws from 'ws';
export interface AppsConfig {
    name: string;
    main?: string;
}
export interface CloudConfig {
    host: string;
    repo: string;
    ref: string;
    application_path: string;
    pre_launch_script: string;
}
export interface EployConfig {
    apps: Array<AppsConfig>;
    cloud_config: CloudConfig;
}
export interface ServerMessage {
    type: string;
    config: EployConfig;
}
export declare type ExtWebSocket = ws & {
    isAlive: boolean;
};
//# sourceMappingURL=index.d.ts.map