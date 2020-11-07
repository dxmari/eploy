import ws from 'ws';
export interface AppsConfig {
    name: string;
    main?: string;
}
export interface TransferConfig {
    host: string;
    user: string;
    source_path: string;
    destination_path: string;
    pre_transfer_script?: string;
}
export interface CompleteTransferConfig {
    staging?: TransferConfig;
    production?: TransferConfig;
}
export interface CloudConfig {
    host: string;
    repo: string;
    ref: string;
    application_path: string;
    pre_launch_script?: string;
}
export interface CompleteCloudConfig {
    staging?: CloudConfig;
    production?: CloudConfig;
}
export interface EployConfig {
    apps: Array<AppsConfig>;
    cloud_config: CompleteCloudConfig;
    transfer_config?: CompleteTransferConfig;
}
export interface ServerMessage {
    type: 'deploy' | 'transfer';
    config: EployConfig;
    configType?: 'staging' | 'production';
}
export declare type ExtWebSocket = ws & {
    isAlive: boolean;
};
export declare type OSDetails = 'mac' | 'ubuntu-linux' | false;
//# sourceMappingURL=index.d.ts.map