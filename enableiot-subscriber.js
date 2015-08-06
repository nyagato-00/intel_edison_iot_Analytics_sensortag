var path = require('path');
var iotkit = require('iotkit-comm');
var spec = new iotkit.ServiceSpec(path.join(__dirname, "garage-sensor-query2.json"));
iotkit.createService(spec, function (service) {
  setInterval(function () {
    service.comm.send({name:'garage_sensor', valuestr: '68'});
  }, 500);
});