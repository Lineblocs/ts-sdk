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
        console.log("bridge created..");
        var channel = await sdk.createCall({
            flow_id: 'f-111',
            caller_id: '+17808503688',
            call_type: 'pstn',
            destination: '+17808503688'
        });
        channel.on('Started', async function() {
            console.log('call started!');
            var playback = await channel.playTTS({text: "Enter your access code followed by the pound key.."});
            playback.on("Finished", async function() {
            });
        });
        channel.on('Audio', function( packet ) {

            buffers.push( packet );
        });
        channel.on('DTMF', async function(res) {
            console.log("received DTMF", res);
            console.log("removing DTMF listeners");
            if ( res.dtmf_gathered.endsWith('#')) {
                if ( res.dtmf_gathered === '1111#' ) {
                    var playback = await channel.playTTS({text: "Correct.."});
                    playback.on("Finished", async function() {
                        channel.hangup();
                    });
                } else {
                    var playback = await channel.playTTS({text: "Incorrect.."});
                    playback.on("Finished", async function() {
                        channel.hangup();
                    });
                }
            }
        });


    } catch ( err ) {
        console.error( err );
    }
});