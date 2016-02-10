var statsServices = angular.module('statsServices', [ 'ngResource' ]);
statsServices.factory('Stats', [ '$resource', function($resource) {
	return $resource('./api/stat/victory', {}, {
		query : {
			method : 'GET',
			isArray : true
		}
	});
} ]);

