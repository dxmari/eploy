
import WebSocketServer from './server/index'

(async () => {
    try {
        await WebSocketServer.onInit();
        console.log("Server running at a port 10101")
    } catch (error) {
        console.log('Connection error due to: ' + error)
    }
})();