import WebSocket from 'ws';
declare class WebSocketClient {
    ws: WebSocket | any;
    constructor();
    onInit(domain?: string): Promise<unknown>;
    onError(cb: any): void;
    sendParamsToServer(message: any): void;
    onReceive(cb?: any): void;
}
declare const _default: WebSocketClient;
export default _default;
//# sourceMappingURL=index.d.ts.map