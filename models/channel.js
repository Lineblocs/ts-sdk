var EventEmitter = require("events");
const Playback = require("./playback.js");
const utils = require("../utils");

function Channel(sdk, id, callId) {
    this.sdk = sdk;
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

    var rpc = this.sdk.client.channel_playTTS();
    var reply =await rpc.sendMessage({
        channel_id: this.channel_id,
        text,
        gender,
        voice,
        language
    });
    var playback = new Playback( this.sdk, reply.playback_id );
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

    var rpc = this.sdk.client.channel_playTTS();
    var reply =await rpc.gotoFlowWidget({
        channel_id: this.channel_id,
        text,
        gender,
        voice,
        language
    });
    var playback = new Playback( this.sdk, reply.playback_id );
    utils.addStorage('playbacks', playback);
    return Promise.resolve( playback );
}

Channel.prototype.startFlow = async function (flowId) {
    var rpc = this.sdk.client.channel_startFlow();
    var reply =await rpc.startFlow({
        channel_id: this.channel_id,
        flow_id: flowId
    });
    return Promise.resolve( playback );
}
Channel.prototype.removeDTMFListeners = async function (flow, name, eventVars) {
    var rpc = this.sdk.client.channel_removeDTMFListeners();
    var reply =await rpc.sendMessage({
        channel_id: this.channel_id
    });
    return Promise.resolve( );
}

Channel.prototype.stopRinging = async function () {
    var rpc = this.sdk.client.channel_stopRinging();
    var reply =await rpc.sendMessage({
        channel_id: this.channel_id
    });
    return Promise.resolve( );
};

Channel.prototype.startRinging = async function () {
    var rpc = this.sdk.client.channel_startRinging();
    var reply =await rpc.sendMessage({
        channel_id: this.channel_id
    });
    return Promise.resolve( );
};

Channel.prototype.hangup = async function () {
    var rpc = this.sdk.client.channel_hangup();
    var reply =await rpc.sendMessage({
        channel_id: this.channel_id
    });
    return Promise.resolve( );
};
		
Channel.prototype.on = function (event, callback) {
  this.emitter.on(event, callback);
}

module.exports = Channel;