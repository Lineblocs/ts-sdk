var EventEmitter = require("events");
const Playback = require("./playback.js");
const utils = require("../utils");

function Channel(client, id, callId) {
    this.client = client;
    this.channel_id = id;
    this.call_id = callId;
    this.emitter = new EventEmitter();
}

Channel.prototype.removeFromBridge = async function() {
}

Channel.prototype.startAcceptingInput =  async function(keyTimeout) {
}

Channel.prototype.getBridge =  function() {
}
Channel.prototype.playTTS =  async function(params) {
    
    var gender = params['gender'] || "FEMALE";
    var voice = params['voice'] || "en-US-Standard-C";
    var language = params['language'] || "en-US";
     var text= params['text'];

    var rpc = this.client.channel_playTTS();
    var reply =await rpc.sendMessage({
        channel_id: this.channel_id,
        text,
        gender,
        voice,
        language
    });
    var playback = new Playback( reply.playback_id );
    utils.addStorage('playbacks', playback);
    return Promise.resolve( playback );
}
Channel.prototype.hangup=  async function() {
  return new Promise(async (resolve, reject) => {
    await functions.safeHangup( this.channel );
    resolve();
  });
}

Channel.prototype.on = function (event, callback) {
  this.emitter.on(event, callback);
}

Channel.prototype.gotoFlowWidget = async function (flowId, name, eventVars) {
    var gender = params['gender'] || "FEMALE";
    var voice = params['voice'] || "en-US-Standard-C";
    var language = params['language'] || "en-US";
     var text= params['text'];

    var rpc = this.client.channel_playTTS();
    var reply =await rpc.gotoFlowWidget({
        channel_id: this.channel_id,
        text,
        gender,
        voice,
        language
    });
    var playback = new Playback( reply.playback_id );
    utils.addStorage('playbacks', playback);
    return Promise.resolve( playback );
}

Channel.prototype.startFlow = async function (flowId) {
    var rpc = this.client.channel_startFlow();
    var reply =await rpc.startFlow({
        channel_id: this.channel_id,
        flow_id: flowId
    });
    return Promise.resolve( playback );
}
Channel.prototype.resetDTMFListeners = function (flow, name, eventVars) {
}

Channel.prototype.stopRinging = async function () {
};

Channel.prototype.startRinging = async function () {
};
		
Channel.prototype.on = function (event, callback) {
  this.emitter.on(event, callback);
}

module.exports = Channel;