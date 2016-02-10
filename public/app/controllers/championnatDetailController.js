controllers.controller('ChampionnatDetailController', [ '$scope',
		'$routeParams', 'Championnats', 'Races', 'Resultats',
		function($scope, $routeParams, Championnats, Races, Resultats) {
			// Initialising the variable.
			$scope.championnat = {
				"id" : 2,
				"libelle" : "Aucun"
            };
			// $scope.championnats = Championnats.query() ;

			$scope.championnat = Championnats.get({
				chpId : $routeParams.id
			});
			/*
			 * $scope.selectChampionnat(2);
			 */

			$scope.selectChampionnat = function(idChp) {
				$scope.championnat = Championnats.get({
					chpId : idChp
				});
				$scope.gps = Races.query({
					chpId : idChp
				});
				$scope.classement = Championnats.classement({
					chpId : idChp
				});
				$scope.concurrents = null;
				$scope.hideMsgSelectionGp = false;
			};
			$scope.selectChampionnat($routeParams.id);

			$scope.resultats = function(idGp) {
				$scope.concurrents = Resultats.query({
					gpId : idGp
				});
				$scope.hideMsgSelectionGp = true;
			};
		} ]);