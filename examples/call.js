var SDK = require("../");
var client = require("../client.js");
var ws = require("../ws");
var Channel = require("../models/channel");
const uuid = require("uuid")
setImmediate(async () => {
    try {
        var clientId = uuid.v4();
        var sdk = new SDK({
            token: '',
            secret: '',
            clientid: clientId,
            workspaceid: '1',
            userid: '1',
            domain: 'workspace.lineblocs.com'
        });
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
                destination: '+17808503688'
            });
            channel.on('Started', async function() {
                console.log('call started!');
                var playback = await channel.playTTS({text: "Hello how are you ??"});


                playback.on("Finished", async function() {
                    console.log("Voice completed..");
                    console.log("ringing now..");
                    await channel.startRinging();
                    setTimeout(async () => {
                        console.log("adding channel to bridge..");
                        await channel.stopRinging();
                        await bridge.addChannel( channel );
                    }, 5000);
                    /*
                    var flow = await channel.startFlow("f-111");
                    flow.on("Started", function() {

                    });
                    flow.on("Paused", function() {

                    });
                    flow.on("Ended", function() {

                    });
                    */
                });

            });
            channel.on('DTMF', async function(res) {
                console.log("received DTMF", res);
                console.log("removing DTMF listeners");
                channel.removeDTMFListeners();
            });
            channel.on('Ended', async function() {
                console.log('call ended..');
            })
        });

        var channelCount = 0;
        bridge.on('ChannelJoined', async function(chan) {
            channelCount ++;
            if ( channelCount === 2 ) {
                // ready to talk
            }
            console.log("channel joined..");
            var playback = await bridge.playTTS({text: "Second time..."});
            playback.on('Finished', async function() {
                console.log("second finished! hanging up now");
                //await chan.hangup();
                await bridge.destroy();
                await sdk.finish();
            })
        });

    } catch ( err ) {
        console.error( err );
    }
});