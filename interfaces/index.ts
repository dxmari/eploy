import ws from 'ws'

export interface AppsConfig {
    name: string,
    main?: string
}

export interface TransferConfig {
    host: string,
    user : string,
    source_path : string,
    destination_path : string
}

export interface CloudConfig {
    host: string,
    repo: string,
    ref: string,
    application_path: string,
    pre_launch_script: string
}

export interface EployConfig {
    apps: Array<AppsConfig>
    cloud_config: CloudConfig,
    transfer_config? : TransferConfig
}

export interface ServerMessage {
    type: string,
    config: EployConfig
}

export type ExtWebSocket = ws & {
    isAlive: boolean
}