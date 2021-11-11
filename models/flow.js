var EventEmitter = require("events");
const Playback = require("./playback.js");
const utils = require("../utils");

function Flow(sdk, id) {
    this.sdk = sdk;
    this.flow_id = id;
    this.emitter = new EventEmitter();
}

Flow.prototype.on = function (event, callback) {
  this.emitter.on(event, callback);
}

module.exports = Flow