var five = require('johnny-five');

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

module.exports = TrafficLight;
