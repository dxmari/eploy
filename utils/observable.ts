import { EventEmitter } from 'events';

const emitter = new EventEmitter();


class Observalble {
    event: string;
    constructor(event: string) {
        this.event = event;
        emitter.emit(event)
        emitter.on('event', (args: any) => {
           this.subscribe(args)
        })
    }

    subscribe(cb: any) {
        return cb;
    }

}

export default Observalble
