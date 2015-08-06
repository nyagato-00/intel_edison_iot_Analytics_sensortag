var iotkit = require('iotkit-comm');
var path = require('path');

var spec = new iotkit.ServiceSpec(path.join(__dirname, "server-spec.json"));
iotkit.createService(spec, function (service) {
  service.comm.setReceivedMessageHandler(function(msg, context, client) {
    console.log("received from client: " + msg.toString());
    service.comm.send("hi");
  });
});