import WebSocketServer from './../server/index'

export default async () =>{
    await WebSocketServer.onInit();
}