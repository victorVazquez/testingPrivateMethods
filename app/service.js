angular.module('CalcApp')
.service('CalcService', function($http){

	this.getSpaceXData = function(){
		return $http({
			method: "GET",
			url: "https://api.spacexdata.com/v1/"
		});
	};

	this.getSpaceXLaunchPadInfo = function(info){
		return $http({
			method: "GET",
			url: "https://api.spacexdata.com/v1/launchpads/ksc_lc_39a/"
		});
	};
});