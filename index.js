var SDK = require("./sdk");
var client = require("./client.js");
var ws = require("./ws");
var Channel = require("./models/channel");
const uuid = require("uuid")
setImmediate(async () => {
    try {
        var clientId = uuid.v4();
        client({
            clientid: clientId,
            workspaceid: '1',
            userid: '1',
            domain: 'workspace.lineblocs.com'
        });
        ws(clientId);
        var sdk = new SDK(clientId);
        var bridge = await sdk.createBridge();
        console.log("BRIDGE ID = " + bridge.bridge_id);
        var chan = new Channel( 123 );
        var chan2 = new Channel( 789 );
        await bridge.addChannels(chan, chan2);
        bridge.on('BridgeCreated', async function(bridge) {
            console.log("bridge created..");
            var channel = await sdk.createCall({
                flow_id: 'f-111',
                caller_id: '+17808503688',
                call_type: 'pstn',
                destination: '+15874874526'
            });
            channel.on('Started', async function() {
                console.log('call started!');
                var playback = await channel.playTTS({text: "Hello how are you ??"});
                playback.on("Finished", function() {
                    console.log("Voice completed..");
                });
                var channel2 = await sdk.createCall({
                    flow_id: 'f-111',
                    call_type: 'pstn',
                    caller_id: '+15874874526',
                    destination: '+17808503688',
                });
                channel2.on('Started', async function() {
                    console.log('call started!');
                    await bridge.addChannels( channel, channel2 );
                });
                channel2.on('DTMF', async function(res) {
                    console.log("received DTMF", res);
                });
            });
            channel.on('DTMF', async function(res) {
                console.log("received DTMF", res);
            });

        });

        var channelCount = 0;
        bridge.on('ChannelJoined', function(chan) {
            channelCount ++;
            if ( channelCount === 2 ) {
                // ready to talk
            }
        });

    } catch ( err ) {
        console.error( err );
    }
});