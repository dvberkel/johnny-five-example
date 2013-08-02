var five = require('johnny-five');

var board = new five.Board();

board.on('ready', function(){
    var led = new five.Led(13);
    led.strobe();

    this.repl.inject({
	led : led
    });
});
