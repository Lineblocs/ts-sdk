const grpc = require("@grpc/grpc-js");
const grpc_promise = require('grpc-promise');;
var protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = __dirname + "/lineblocs.proto";

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
var loadedPkg = grpc.loadPackageDefinition(packageDefinition);
const LineblocsService = loadedPkg.grpc.Lineblocs;

var client = null;
function connect(args) {
  if ( client === null ) {
    client = new LineblocsService(
      "155.138.144.56:9000",
      grpc.credentials.createInsecure()
    );

    const meta = new grpc.Metadata();
    for ( var key in args ) {
      meta.add(key, args[ key ]);
    }
    grpc_promise.promisifyAll(client, {metadata: meta});
  }
  return client;
}

module.exports = connect;