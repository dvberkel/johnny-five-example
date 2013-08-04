var stateMachine = require('state-machine');

function trafficLightMachine() {
    this
	.state('stop', { initial : true })
	.state('go')
	.state('out_of_service')
	.state('changing')
	.event('stop', ['stop', 'out_of_service', 'changing'], 'stop')
	.event('stop', 'go', 'changing')
	.event('go', ['stop', 'go', 'out_of_service', 'changing'], 'go')
	.event('broken', ['stop', 'go', 'out_of_service', 'changing'], 'out_of_service')
};

module.exports = function factory(){
    return stateMachine(trafficLightMachine);
};
