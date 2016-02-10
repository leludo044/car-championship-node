var piloteServices = angular.module('circuitsServices', [ 'ngResource' ]);
piloteServices.factory('Circuits', [ '$resource', function($resource) {
	return $resource('./api/track/:id/:info', {id : '@id'},{
	    update: {
	        method: 'PUT' // this method issues a PUT request
	      },
	      estcouru: {
	    	  method: 'GET',
	    	  params: {info:'estcouru'}
	      }

	    }	);
} ]);