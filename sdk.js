var client = require("./client.js");
var utils = require("./utils.js");
var Bridge = require("./models/bridge.js");
var Channel = require("./models/channel.js");


function SDK(clientId) {
    this.clientId = clientId
}
SDK.prototype.createBridge = async function(hangup) {
    var rpc = client().createBridge();
    var reply =await rpc.sendMessage({
        client_id: this.clientId,
        hangup: false
    });
    console.log("reply.. ", reply);
    var bridge = new Bridge( client(), this.clientId, reply.bridge_id );
    utils.addStorage('bridges', bridge);
    return Promise.resolve( bridge );
}
SDK.prototype.createCall = async function(params) {
   var rpc = client().createCall();
   var resp = await rpc.sendMessage({
            flow_id: params.flow_id,
            caller_id: params.caller_id,
            call_type: params.call_type,
            destination: params.destination
   });
    console.log("reply.. ", resp);
   console.log("NEW CHANNEL ID=" + resp.channel_id);
    var channel  =new Channel( client(), resp.channel_id, resp.call_id );
   utils.addStorage('channels', channel);
   return Promise.resolve( channel);
}

SDK.prototype.playRecording = function(flow, lineChannel, fileUrl) {
}

SDK.prototype.createConference = function(flow, name) {
}
SDK.prototype.getChannel = function(channelId) {

}
SDK.prototype.createSession = function(token, secret) {
}

module.exports = SDK;