var EventEmitter = require("events");
var Playback = require("./playback");
var utils =  require("../utils");
function Bridge(client, clientId, bridgeId) {
    this.client = client;
    this.clientId = clientId;
	this.automateLegAHangup= true;
	this.automateLegBHangup= true;
    this.channels = [];
    this.channelsToAdd = [];
    this.bridge_id= bridgeId;
    this.emitter = new EventEmitter();
}

Bridge.prototype.addChannels = async function(chan1, chan2) {
    var rpc = this.client.bridge_addChannels();
    var reply =await rpc.sendMessage({
        bridge_id: this.bridge_id,
        channel_id: [chan1.channel_id, chan2.channel_2],
        client_id: this.clientId
    });
    return Promise.resolve();
}


Bridge.prototype.addChannel = async function(chan1) {
    var rpc = this.client.bridge_addChannel();
    var reply =await rpc.sendMessage({
        bridge_id: this.bridge_id,
        channel_id: chan1.channel_id
    });
    return Promise.resolve();
}

Bridge.prototype.playTTS =  async function(params) {
    var gender = params['gender'] || "FEMALE";
    var voice = params['voice'] || "en-US-Standard-C";
    var language = params['language'] || "en-US";
     var text= params['text'];

     console.log("BRIDGE ID = " + this.bridge_id);
    var rpc = this.client.bridge_playTTS();
    var reply =await rpc.sendMessage({
        bridge_id: this.bridge_id,
        text,
        gender,
        voice,
        language
    });
    var playback = new Playback( reply.playback_id );
    utils.addStorage('playbacks', playback);
    return Promise.resolve( playback );
}

Bridge.prototype.destroy =  async function() {
}

Bridge.prototype.on = function (event, callback) {
  this.emitter.on(event, callback);
}

module.exports = Bridge;
