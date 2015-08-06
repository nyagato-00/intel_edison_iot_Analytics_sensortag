var iotkit = require('iotkit-comm');
var path = require('path');

var query = new iotkit.ServiceQuery(path.join(__dirname, "server-query.json"));
iotkit.createClient(query, function (client) {
  client.comm.setReceivedMessageHandler(function (message, context) {
    console.log("received from : " + message.toString());
    client.comm.send("hello");
  });
  client.comm.send("hello");
});