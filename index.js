var five = require('johnny-five');

var board = new five.Board();

var redPin = 8;
var yellowPin = 9;
var greenPin = 10;

var TrafficLight = function TrafficLight(redPin, yellowPin, greenPin) {
    this.red = new five.Led(redPin);
    this.yellow = new five.Led(yellowPin);
    this.green = new five.Led(greenPin);
}
TrafficLight.prototype.stop = function stopSignal() {
    this.red.on();
    this.yellow.off();
    this.green.off();
}
TrafficLight.prototype.go = function goSignal() {
    this.red.off();
    this.yellow.off();
    this.green.on();
}

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
