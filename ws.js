var WebSocketClient = require('websocket').client;
var utils = require('./utils');

var client = new WebSocketClient();

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
        var parsed = JSON.parse( message.utf8Data );
        switch ( parsed.type ) {
          case "bridge_BridgeCreated":
            var bridge = utils.lookupBridge( parsed.data.bridge_id );
            if ( bridge ) {
              bridge.emitter.emit('BridgeCreated', bridge);
            }
          break;
          case "bridge_ChannelJoined":
            var channel = new Channel( parsed.data.channel_id );
            var bridge = utils.lookupBridge( parsed.data.bridge_id );
            if ( bridge ) {
              bridge.emitter.emit('ChannelJoined', channel);
            }
          break;
          case "bridge_ChannelLeft":
            var channel = new Channel( parsed.data.channel_id );
            var bridge = utils.lookupBridge( parsed.data.bridge_id );
            if ( bridge ) {
              bridge.emitter.emit('ChannelLeft', channel)
            }
          case "channel_ChannelStart":
            var channel = utils.lookupChannel( parsed.data.channel_id );
            if ( channel ) {
              console.log("sending to channel...");
              channel.emitter.emit('Started', channel)
            }
          break;
          case "channel_ChannelEnd":
            var channel = utils.lookupChannel( parsed.data.channel_id );
            if ( channel ) {
              channel.emitter.emit('Ended', channel)
            }
          break;
          case "channel_DTMFReceived":
            var channel = utils.lookupChannel( parsed.data.channel_id );
            if ( channel ) {
              channel.emitter.emit('DTMF', parsed.data);
            }
          break;
          case "playback_PlaybackFinished":
            var playback = utils.lookupPlayback( parsed.data.playback_id );
            if ( playback ) {
              playback.emitter.emit('Finished', playback)
            }
          break;
        }
    });
    
    function sendNumber() {
        if (connection.connected) {
            var number = Math.round(Math.random() * 0xFFFFFF);
            connection.sendUTF(number.toString());
            setTimeout(sendNumber, 1000);
        }
    }
    sendNumber();
});

function connect(clientId) {
  var wsUrl = "ws://155.138.144.56:8018?clientId=" + clientId;
  client.connect(wsUrl, 'events');
  return client;
}
module.exports = connect;