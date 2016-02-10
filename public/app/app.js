'use strict';

/**
 * 
 */
var chpApp = angular.module('chpApp', [ 'ngRoute', 'controllers',
		'raceServices', 'championnatServices', 'resultatsServices', 'statsServices', 'highcharts-ng', 'pilotesServices', 'circuitsServices' ]);

chpApp.config([ '$routeProvider', function ($routeProvider) {
	$routeProvider.when('/championnat/:id', {
		templateUrl : 'partials/classement.html',
		controller : 'ChampionnatDetailController'
	}).when('/stats', {
		templateUrl : 'partials/stats.html',
		controller : 'StatsCtrl'
	}).when('/pilotes', {
		templateUrl : 'partials/pilote.html',
		controller : 'PiloteCtrl'
	}).when('/circuits', {
		templateUrl : 'partials/circuit.html',
		controller : 'CircuitCtrl'
	}).when('/championnats', {
		templateUrl : 'partials/championnat.html',
		controller : 'ChampionnatListController'
	}).otherwise({
		redirectTo : '/championnat/2'
	});
} ]);

var controllers = angular.module('controllers', []);
