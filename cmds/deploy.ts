import WebSocketServer from './../server/index'
import WebSocketClient from './../client/index'
import shelljs from './../utils/shell'

export default async (args: any) => {
    await WebSocketServer.onInit()
    WebSocketClient.onInit()
    WebSocketClient.onReceive((msg: any) => {
        console.log('from server', msg);
    })
    WebSocketServer.sendParamsToClient(await shelljs('cd /Users/mariselvam/Documents/Official/React/cm-v4-testing && gatsby develop'))
}