var iotkit = require('iotkit-comm');
var path = require('path');
var async = require('async');
var SensorTag = require("sensortag");

var spec = new iotkit.ServiceSpec(path.join(__dirname, "garage-sensor-spec.json"));
var temp_val = 50;

iotkit.createService(spec, function (service) {
    setInterval(function () {
        service.comm.send({name:'light', valuestr: String(temp_val)});
  }, 500);
});

SensorTag.discover(function(sensorTag) {
  sensorTag.on('disconnect', function() {
    console.log('disconnected!');
    process.exit(0);
  });
  console.log('connect');
  sensorTag.connect(function() {

    console.log('discoverServicesAndCharacteristics');
    sensorTag.discoverServicesAndCharacteristics(function() {
      console.log('enableIrTemperature');
      sensorTag.enableIrTemperature(function() {
        console.log('enableAccelerometer');
        sensorTag.enableAccelerometer(function() {
          console.log('enableHumidity');
          sensorTag.enableHumidity(function() {
            console.log('enableMagnetometer');
            sensorTag.enableMagnetometer(function() {
              console.log('enableBarometricPressure');
              sensorTag.enableBarometricPressure(function() {
                console.log('enableGyroscope');
                sensorTag.enableGyroscope(function() {

                  setInterval(function() {

                    async.series([
                      function(callback) {
                        console.log('readDeviceName');
                        sensorTag.readDeviceName(function(deviceName) {
                          console.log('\tdevice name = ' + deviceName);
                          callback(null, deviceName);
                        });
                      },
                      function(callback) {
                        console.log('readSystemId');
                        sensorTag.readSystemId(function(systemId) {
                          console.log('\tsystem id = ' + systemId);
                          callback(null, systemId);
                        });
                      },
                      function(callback) {
                        console.log('readSerialNumber');
                        sensorTag.readSerialNumber(function(serialNumber) {
                          console.log('\tserial number = ' + serialNumber);
                          callback(null, serialNumber);
                        });
                      },
                      function(callback) {
                        console.log('readFirmwareRevision');
                        sensorTag.readFirmwareRevision(function(firmwareRevision) {
                          console.log('\tfirmware revision = ' + firmwareRevision);
                          callback(null, firmwareRevision);
                        });
                      },
                      function(callback) {
                        console.log('readHardwareRevision');
                        sensorTag.readHardwareRevision(function(hardwareRevision) {
                          console.log('\thardware revision = ' + hardwareRevision);
                          callback(null, hardwareRevision);
                        });
                      },
                      function(callback) {
                        console.log('readSoftwareRevision');
                        sensorTag.readHardwareRevision(function(softwareRevision) {
                          console.log('\tsoftware revision = ' + softwareRevision);
                          callback(null, softwareRevision);
                        });
                      },
                      function(callback) {
                        console.log('readManufacturerName');
                        sensorTag.readManufacturerName(function(manufacturerName) {
                          console.log('\tmanufacturer name = ' + manufacturerName);
                          callback(null, manufacturerName);
                        });
                      },
                      function(callback) {
                        console.log('readIrTemperature');
                        sensorTag.readIrTemperature(function(objectTemperature, ambientTemperature) {
                          console.log('\tobject temperature = %d °C', objectTemperature);
                          console.log('\tambient temperature = %d °C', ambientTemperature);
                          temp_val = ambientTemperature;

                          var obj = Object();
                          obj['objectTemperature'] = objectTemperature;
                          obj['ambientTemperature'] = ambientTemperature;
                          callback(null, obj);
                        });
                      },
                      function(callback) {
                        console.log('readAccelerometer');
                        sensorTag.readAccelerometer(function(x, y, z) {
                          console.log('\tx = %d G', x);
                          console.log('\ty = %d G', y);
                          console.log('\tz = %d G', z);

                          var obj = Object();
                          obj['Accelerometer_x'] = x;
                          obj['Accelerometer_y'] = y;
                          obj['Accelerometer_z'] = z;
                          callback(null, obj);
                        });
                      },
                      function(callback) {
                        console.log('readHumidity');
                        sensorTag.readHumidity(function(temperature, humidity) {
                          console.log('\ttemperature = %d °C', temperature);
                          console.log('\thumidity = %d %', humidity);

                          var obj = Object();
                          obj['temperature'] = temperature;
                          obj['humidity'] = humidity;
                          callback(null, obj);
                        });
                      },
                      function(callback) {
                        console.log('readMagnetometer');
                        sensorTag.readMagnetometer(function(x, y, z) {
                          console.log('\tx = %d μT', x);
                          console.log('\ty = %d μT', y);
                          console.log('\tz = %d μT', z);

                          var obj = Object();
                          obj['Magnetometer_x'] = x;
                          obj['Magnetometer_y'] = y;
                          obj['Magnetometer_z'] = z;
                          callback(null, obj);
                        });
                      },
                      function(callback) {
                        console.log('readBarometricPressure');
                        sensorTag.readBarometricPressure(function(pressure) {
                          console.log('\tpressure = %d mBar', pressure);

                          var obj = Object();
                          obj['pressure'] = pressure;
                          callback(null, obj);
                        });
                      },
                      function(callback) {
                        console.log('readGyroscope');
                        sensorTag.readGyroscope(function(x, y, z) {
                          console.log('\tx = %d °/s', x);
                          console.log('\ty = %d °/s', y);
                          console.log('\tz = %d °/s', z);

                          var obj = Object();
                          obj['Gyroscope_x'] = x;
                          obj['Gyroscope_y'] = y;
                          obj['Gyroscope_z'] = z;
                          callback(null, obj);
                        });
                      }
                    ],
                    function(err, results) {
                      console.log('results');
                      console.log(results);
                    }
                  );
                }, 500);
              });
            });
          });
        });
      });
    });
  });
 });
});