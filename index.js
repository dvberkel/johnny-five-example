var five = require('johnny-five');
var TrafficLight = require('./lib/traffic-light');

var board = new five.Board();

var redPin = 8;
var yellowPin = 9;
var greenPin = 10;


board.on('ready', function(){
    var led = new five.Led(13);
    led.strobe();

    var trafficLight = new TrafficLight(redPin, yellowPin, greenPin);
    trafficLight.stop();

    this.repl.inject({
	led : led,
	trafficLight : trafficLight
    });
});
