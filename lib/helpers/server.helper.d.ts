import { ServerMessage, EployConfig, CloudConfig, ExtWebSocket, TransferConfig } from './../interfaces';
declare class ServerHelper {
    handleMessage(serverMessage: ServerMessage, ws: ExtWebSocket): void;
    runDeploy(config: EployConfig, ws: ExtWebSocket): void;
    navigateToAppPathAndLaunchScript(cloudConfig: CloudConfig, ws: ExtWebSocket): Promise<void>;
    runFilesExtract(ws: ExtWebSocket, transferConfig?: TransferConfig): Promise<void>;
}
declare const _default: ServerHelper;
export default _default;
//# sourceMappingURL=server.helper.d.ts.map