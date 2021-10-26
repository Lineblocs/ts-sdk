var EventEmitter = require("events");

function Playback(playbackId) {
    this.playback_id = playbackId;
    this.emitter = new EventEmitter();
}

Playback.prototype.on = function (event, callback) {
  this.emitter.on(event, callback);
}

module.exports = Playback;