controllers.controller('StatsCtrl', [ '$scope', '$routeParams', '$http',
		'Stats', function($scope, $routeParams, $http, Stats) {

			/*
			 * Liste des graphiques statistiques à afficher. Le label correspond au nom du
			 * graphe à afficher et l'url correspond au suffixe de l'url du webservice qui va
			 * récupérer les données
			 */
			$scope.graphs = [ {
				label : "Victoires",
				url : "victory"
			}, {
				label : "Poles position",
				url : "pole"
			},
			{
				label : "Podiums",
				url : "podium"
			}];

		} ]);