describe('Testing Private Methods', function() {
	var rootScope, scope, ctrl, service, httpBackend, deferred, rejected;
	var spaceXMockedData = {
		data: {
		  project_name: "SpaceX-API",
		  version: "2.0.1",
		  project_link: "https://github.com/r-spacex/SpaceX-API",
		  organization: "r/SpaceX",
		  organization_link: "https://github.com/r-spacex",
		  description: "REST API for data about company info, vehicles, launch sites, and launch data, created and maintained by the developers of the r/SpaceX organization"
		}
	};


	beforeEach(module('CalcApp'));

	beforeEach(inject(function($rootScope, $controller, _CalcService_, $httpBackend, $q){
		rootScope = $rootScope;
		scope = $rootScope.$new();
		service = _CalcService_;
		httpBackend = $httpBackend;
		deferred = $q.defer();
		rejected = $q.reject();

		ctrl = $controller('CalcCtrl', {
			'$scope': scope
		});

	}));

	//afterEach(httpBackend.verifyNoOutstandingRequest);

	it('should increment the counter in 1 unit', function(){
		//console.log(ctrl.counter);
		expect(ctrl.counter).toEqual(0);

		spyOn(ctrl, 'increment').and.callThrough();
		ctrl.increment();
		//console.log(ctrl.counter);

		expect(ctrl.counter).toEqual(1);
	});

	it('should decrement the counter in 1 unit', function() {
		ctrl.counter = 2;
		//console.log(ctrl.counter);

		expect(ctrl.counter).toEqual(2);
		
		spyOn(ctrl, 'decrement').and.callThrough();
		ctrl.decrement();
		//console.log(ctrl.counter);

		expect(ctrl.counter).toEqual(1);
	});

	it('should reset the counter to 0', function() {
		ctrl.counter = 27;
		//console.log(ctrl.counter);

		expect(ctrl.counter).toEqual(27);

		spyOn(ctrl, 'reset').and.callThrough();
		ctrl.reset();
		//console.log(ctrl.counter);

		expect(ctrl.counter).toEqual(0);

	});

	it('should retrieve all SpaceX Info', function(){

		httpBackend.whenGET('https://api.spacexdata.com/v1/')
		.respond({
		  project_name: "SpaceX-API",
		  version: "2.0.1",
		  project_link: "https://github.com/r-spacex/SpaceX-API",
		  organization: "r/SpaceX",
		  organization_link: "https://github.com/r-spacex",
		  description: "REST API for data about company info, vehicles, launch sites, and launch data, created and maintained by the developers of the r/SpaceX organization"
		});
		service.getSpaceXData()
		.then(function(res){
			var data = res.data;
			//console.log('data: ', spaceXMockedData.data);
			expect(data).toEqual(spaceXMockedData.data);
		});

		httpBackend.flush();
	});

	it('should fail when try retrieve all SpaceX Info', function(){
		var originalGetSpaceXData = service.getSpaceXData();
		var error = {
			message: 'You cant always get you want'
		}
		service.getSpaceXData = function(){
			return deferred.reject(error.message);
		};

		service.getSpaceXData();
		rootScope.$apply();
		//service.getSpaceXData = originalGetSpaceXData;
	});

	xit('should retrieve all Launchpad SpaceX Info', function(){

		httpBackend.whenGET('https://api.spacexdata.com/v1/launchpads/ksc_lc_39a')
		.respond({
		  id: "ksc_lc_39a",
		  full_name: "Kennedy Space Center Launch Complex 39A",
		  status: "active",
		  location: {
		    name: "Cape Canaveral",
		    region: "Florida",
		    latitude: 28.6080585,
		    longitude: -80.6039558
		  },
		  vehicles_launched: "falcon 9",
		  details: "NASA historic launch pad that launched most of the Saturn V and Space Shuttle missions. Initially for Falcon Heavy launches, it is now launching all of SpaceX east coast missions due to the damage from the AMOS-6 anomaly. After SLC-40 repairs are complete, it will be upgraded to support Falcon Heavy, a process which will take about two months. In the future it will launch commercial crew missions and the Interplanetary Transport System."
		});
		service.getSpaceXLaunchPadInfo()
		.then(function(res){
			//var data = res.data;
			//console.log('data: ', spaceXMockedData.data);
			//expect(data).toEqual(spaceXMockedData.data);
		});

		httpBackend.flush();
	});

});