var five = require('johnny-five');
var factory = require('./traffic-light-state');

var defaultActions = {
    'stop': function(){ this.red.on(); this.yellow.off(); this.green.off(); },
    'go': function(){ this.red.off(); this.yellow.off(); this.green.on(); },
    'out_of_service': function(){
	this.red.off(); this.yellow.off(); this.green.off();
	this.yellow.strobe(500)
    },
    'changing': function(){
	var self = this;
	self.red.off(); self.yellow.on(); self.green.on();
	setTimeout(function(){ self.stop(); }, 2000);
    },
};

var TrafficLight = function TrafficLight(redPin, yellowPin, greenPin, actions) {
    this.red = new five.Led(redPin);
    this.yellow = new five.Led(yellowPin);
    this.green = new five.Led(greenPin);
    this.stateMachine = factory();
    this.actions = actions || defaultActions;
    this.initialize();
}
TrafficLight.prototype.initialize = function initialize() {
    var self = this;
    self.stateMachine.onChange = function(currentState, previousState) {
	console.log("%s -> %s", previousState, currentState);
	if (previousState === 'out_of_service') {
	    self.yellow.stop();
	}
	self.changeTo(currentState);
    }
}
TrafficLight.prototype.stop = function stopSignal() {
    this.stateMachine.stop();
}
TrafficLight.prototype.go = function goSignal() {
    this.stateMachine.go();
}
TrafficLight.prototype.out_of_service = function outOfServiceSignal() {
    this.stateMachine.broken();
}
TrafficLight.prototype.changeTo = function changeTo(state) {
    if(this.actions[state]) {
	var  action = this.actions[state];
	action.apply(this);

    } else {
	this.actions['out_of_service'].apply(this);
    }
}

module.exports = TrafficLight;
