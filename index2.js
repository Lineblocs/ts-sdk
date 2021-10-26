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
            workspaceid: '2',
            userid: '1',
            domain: 'workspace.lineblocs.com'
        });
        ws(clientId);
        var sdk = new SDK(clientId);
        var conf = await sdk.createConference({name: 'hello'});
        console.log("CONF BRIDGE ID = " + conf.bridge_id);

        conf.on("ConferenceCreated", function() {
            var channel = await sdk.createCall({
                flow_id: 'f-111',
                caller_id: '+17808503688',
                call_type: 'pstn',
                destination: '+17808503688'
            });
            channel.on('Started', async function() {
                console.log('call started!');
                var playback = await channel.playTTS({text: "You are now being placed in the conference.."});

            });
        });
        conf.on("MemberJoined", function(member) {
            if (member.call.callParams.from === call.callParams.from) {
               var body = `${number} is now on your conference line.`;
               sendSMS(event['messagebird_api_key'], event['messagebird_number'], host, body);
            }
        });
    } catch ( err ) {
        console.error( err );
    }
});