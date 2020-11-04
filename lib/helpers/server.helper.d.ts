import { ServerMessage, CloudConfig, ExtWebSocket, TransferConfig } from './../interfaces';
declare class ServerHelper {
    handleMessage(serverMessage: ServerMessage, ws: ExtWebSocket): void;
    runDeploy(ws: ExtWebSocket, cloudConfig?: CloudConfig): void;
    navigateToAppPathAndLaunchScript(ws: ExtWebSocket, cloudConfig?: CloudConfig): Promise<void>;
    runFilesExtract(ws: ExtWebSocket, transferConfig?: TransferConfig): Promise<void>;
}
declare const _default: ServerHelper;
export default _default;
//# sourceMappingURL=server.helper.d.ts.map