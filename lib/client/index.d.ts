import WebSocket from 'ws';
declare class WebSocketClient {
    ws: WebSocket;
    constructor();
    onInit(): void;
    onError(cb: any): void;
    sendParamsToServer(message: any): void;
    onReceive(cb: any): void;
}
declare const _default: WebSocketClient;
export default _default;
//# sourceMappingURL=index.d.ts.map