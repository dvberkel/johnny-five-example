var five = require('johnny-five');

var board = new five.Board();

var redPin = 8;
var yellowPin = 9;
var greenPin = 10;

board.on('ready', function(){
    var led = new five.Led(13);
    led.strobe();

    var red = new five.Led(redPin);
    var yellow = new five.Led(yellowPin);
    var green = new five.Led(greenPin);

    red.on();
    yellow.off();
    green.off();

    this.repl.inject({
	led : led,
	red : red,
	yellow : yellow,
	green : green
    });
});
