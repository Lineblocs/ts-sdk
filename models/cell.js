var EventEmitter = require("events");
const Playback = require("lineblocs-sdk/models/playback");
const utils = require("lineblocs-sdk/utils");

function Cell(sdk, id) {
    this.sdk = sdk;
    this.cell_id = id;
    this.emitter = new EventEmitter();
}

Cell.prototype.on = function (event, callback) {
  this.emitter.on(event, callback);
}

module.exports = Cell;