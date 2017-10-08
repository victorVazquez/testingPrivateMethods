angular.module('CalcApp', [])
.controller('CalcCtrl', function($scope, $http, CalcService){
	var ctrl = this;

	ctrl.counter = 0;

	var increment = function() {
		ctrl.counter++;
	};
	
	var decrement = function() {
		ctrl.counter--;
	};
	
	var reset = function() {
		ctrl.counter = 0;
	};

	CalcService.getSpaceXData()
	.then(function(res){
		//console.log('SpaceX: ', res.data);
	})
	.catch(function(error){
		console.log(error)
	});

	CalcService.getSpaceXLaunchPadInfo()
	.then(function(res){
		var launchpad = res.data;
		ctrl.launchpad = {
			id: launchpad.id,
			fullName: launchpad.full_name,
			status: launchpad.status,
			vehiclesLaunched: launchpad.vehicles_launched,
			details: launchpad.details
		};
		console.log('SpaceX Launchpad Info: ', res.data);
	})
	.catch(function(error){
		//console.log('error', error)
	});

	ctrl.increment = increment;
	ctrl.decrement = decrement;
	ctrl.reset = reset;

});