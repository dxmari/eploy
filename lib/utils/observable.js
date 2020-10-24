"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var emitter = new events_1.EventEmitter();
var Observalble = /** @class */ (function () {
    function Observalble(event) {
        var _this = this;
        this.event = event;
        emitter.emit(event);
        emitter.on('event', function (args) {
            _this.subscribe(args);
        });
    }
    Observalble.prototype.subscribe = function (cb) {
        return cb;
    };
    return Observalble;
}());
exports.default = Observalble;
//# sourceMappingURL=observable.js.map