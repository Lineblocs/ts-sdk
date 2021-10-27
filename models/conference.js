var EventEmitter = require("events");
var Playback = require("./playback");
var utils =  require("../utils");
function Conference(sdk, bridgeId, confId) {
    this.sdk = sdk;
    this.Conference = Conference;
    this.conf_id= confId;
    this.bridge_id= bridgeId;
    this.emitter = new EventEmitter();
}

Conference.prototype.on = function (event, callback) {
  this.emitter.on(event, callback);
}

module.exports = Conference;
