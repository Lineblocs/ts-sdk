var mem = require("./mem");

function lookupBridge( id ) {
    var result;
    mem.bridges.forEach(bridge => {
        if ( bridge.bridge_id === id ) {
            result = bridge;
            return;
        } 
    });
    return result;
}
function lookupChannel( id ) {
    var result;
    mem.channels.forEach(channel => {
        if ( channel.channel_id=== id ) {
            result = channel;
            return;
        } 
    });
    return result;
}

function lookupPlayback( id ) {
    var result;
    mem.playbacks.forEach(playback => {
        if ( playback.playback_id  === id ) {
            result = playback;
            return;
        } 
    });
    return result;
}


function addStorage(type, obj) {
    mem[ type ].push( obj );
}
module.exports = {
    lookupBridge,
    lookupChannel,
    lookupPlayback,
    addStorage
}