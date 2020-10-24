import ws from 'ws';
declare type ExtWebSocket = ws & {
    isAlive: boolean;
};
declare class WebSocketServerSide {
    socket: any;
    onInit(): Promise<void>;
    connect(): Promise<ExtWebSocket>;
    sendParamsToClient(params: any): void;
}
declare const _default: WebSocketServerSide;
export default _default;
//# sourceMappingURL=index.d.ts.map