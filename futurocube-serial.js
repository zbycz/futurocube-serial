/**
 * Node.js futurocube comunicator
 * @author Pavel Zbytovský, zby.cz
 */

var serialPort = require("serialport");
var SerialPort = serialPort.SerialPort; //constructor

var userCallback = function(){}

//Find futurocobe asynchronously
serialPort.list(function (err, ports) { 
	console.log("Finding COM ports...");

	var principComPort = false;
	ports.forEach(function(port) {
    if (port.manufacturer == "PRINCIP") {
    	principComPort = port.comName;
	    console.log("> futurocube port: " + port.comName + " - " + port.manufacturer);
    }
  });
  
  if (!principComPort) {
    console.log("> futurocube COM port not found, is Futurocube pluged in and SDK disconnected?");
  }
  else {
  	connectToFuturocube(principComPort);
  }
});


function connectToFuturocube(principComPort) {

	var fcSerialPort = new SerialPort(principComPort, {
		  parser: serialPort.parsers.readline("\n")
		}, false);
		
	//open port and catch error
	fcSerialPort.open(function(error){
		if (error) {
	    console.log('> Failed to open: '+error);
	    console.log('> Seems like Futurocube is connected to SDK - try to close it.');
    }
	});
	
	//listen to data
	fcSerialPort.on("open", function () {
	  console.log('> port opened');
	  fcSerialPort.on('data', function(data) {
	    //console.log('> data received: ' + data);
	    
	    // message starts with 83,81,0,20,0
	    var x = String.fromCharCode;
	    var position = data.indexOf(x(83) + x(81) + x(0) + x(20) + x(0));
	    if (position !== -1) {
	    	var packet = data.substr(position + 5).trim();
				console.log('> callback('+packet+')');
				userCallback(packet);
	    }
	  });
	  //fcSerialPort.write("ls\n", function(err, results) {
	  //  console.log('err ' + err);
	  //  console.log('results ' + results);
	  //});
	});
}


module.exports = {
	on: function(what, cb) {
		if (what == 'printf')
			userCallback = cb;
		else
			console.log("erorr: futurocube-serial can only listen to printf's");
	}
};

