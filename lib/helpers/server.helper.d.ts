import { ServerMessage, EployConfig, CloudConfig, ExtWebSocket } from './../interfaces';
declare class ServerHelper {
    handleMessage(serverMessage: ServerMessage, ws: ExtWebSocket): void;
    runDeploy(config: EployConfig, ws: ExtWebSocket): void;
    navigateToAppPathAndLaunchScript(cloudConfig: CloudConfig, ws: ExtWebSocket): Promise<void>;
}
declare const _default: ServerHelper;
export default _default;
//# sourceMappingURL=server.helper.d.ts.map