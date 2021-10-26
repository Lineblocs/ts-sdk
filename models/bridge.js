var EventEmitter = require("events");
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
        channel_id: [chan1.channel_id, chan2.channel_2],
        client_id: this.clientId
    });
    return Promise.resolve();
}


Bridge.prototype.addChannel = async function(chan1) {
    var rpc = this.client.bridge_addChannel();
    var reply =await rpc.sendMessage({
        channel_id: chan1.channel_id
    });
    return Promise.resolve();
}

Bridge.prototype.playTTS =  async function(text, gender, voice, language) {
    var rpc = this.client.bridge_playTTS();
    var reply =await rpc.sendMessage({
        text, 
        gender, 
        voice, 
        language
    });
    return Promise.resolve();
}

Bridge.prototype.destroy =  async function() {
}

Bridge.prototype.on = function (event, callback) {
  this.emitter.on(event, callback);
}

module.exports = Bridge;
