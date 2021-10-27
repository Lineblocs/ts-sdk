var client = require("./client.js");
var ws = require("./ws.js");
var utils = require("./utils.js");
var Bridge = require("./models/bridge.js");
var Channel = require("./models/channel.js");
var Conference = require("./models/conference.js");
const grpc = require("@grpc/grpc-js");

function SDK(params) {
    this.client = client(params);
    this.ws = ws(params);
}
SDK.prototype.createBridge = async function(hangup) {
    var rpc = this.client.createBridge();
    var reply =await rpc.sendMessage({
        client_id: this.clientId,
        hangup: false
    });
    console.log("reply.. ", reply);
    var bridge = new Bridge( this, this.clientId, reply.bridge_id );
    utils.addStorage('bridges', bridge);
    return Promise.resolve( bridge );
}
SDK.prototype.createCall = async function(params) {
   var rpc = this.client.createCall();
   var resp = await rpc.sendMessage({
            flow_id: params.flow_id,
            caller_id: params.caller_id,
            call_type: params.call_type,
            destination: params.destination
   });
    console.log("reply.. ", resp);
   console.log("NEW CHANNEL ID=" + resp.channel_id);
    var channel  =new Channel( this, resp.channel_id, resp.call_id );
   utils.addStorage('channels', channel);
   return Promise.resolve( channel);
}

SDK.prototype.createConference = async function(params) {
   var rpc = this.client.createConference();
   var resp = await rpc.sendMessage({
            name: params.name
   });
    console.log("reply.. ", resp);
   console.log("NEW BRIDGE ID=" + resp.bridge_id);
   console.log("NEW CONF ID=" + resp.conf_id);
   var conf  =new Conference( this, resp.bridge_id, resp.conf_id );
   utils.addStorage('conferences', conf);
   return Promise.resolve( conf);
}



SDK.prototype.playRecording = function(flow, lineChannel, fileUrl) {
}

SDK.prototype.getChannel = function(channelId) {

}

SDK.prototype.finish = async function(channelId) {
    return new Promise(( resolve, reject ) => {
        grpc.getClientChannel(this.client).close()
        this.ws.socket.destroy();
        process.nextTick(() => {
            resolve();
        });
    });
}

function createSession(params) {
    return new SDK( params );
}

module.exports = createSession;