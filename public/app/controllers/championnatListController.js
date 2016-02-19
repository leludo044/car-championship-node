controllers.controller('ChampionnatListController', ['$scope', '$http', 'Championnats', 'Circuits',
	function ($scope, $http, Championnats, Circuits) {

		$scope.championnats = Championnats.query();
		$scope.tracks = Circuits.query();
		$scope.selected = {};
		// Liste des circuits sélectionnables
		//$scope.circuits = [];
		// Liste des circtuis sélectionnés
		$scope.selectedTracks = []

		initForm = function () {
			$scope.form = {
				id: 0,
				libelle: "",
				type: ""
			};
		}
		initForm();

		$scope.selectionner = function (championnat, index) {
			$scope.form = angular.copy(championnat);
			$scope.selection = true;
			$scope.message = "";
			$scope.index = index;
			Championnats.estcommence({ chpId: $scope.form.id }, function (response) {
				if (response.isStarted) {
					$scope.form.supprimable = false;
				} else {
					$scope.form.supprimable = true;
				}
			});

		}

		$scope.ajouter = function () {
			var championnat = new Championnats();
			championnat.libelle = $scope.form.libelle;
			championnat.type = $scope.form.type;
			Championnats.save(championnat, function (response) {
				$scope.message = response.message;
				championnat.id = response.code;
				$scope.championnats.push(championnat);
			});
			initForm();
		}

		$scope.modifier = function () {
			var championnat = new Championnats();
			championnat.id = $scope.form.id;
			championnat.libelle = $scope.form.libelle;
			championnat.type = $scope.form.type;
			Championnats.update(championnat, function (response) {
				$scope.message = response.message;
				$scope.championnats[$scope.index] = championnat;
			});

			$scope.selection = false;
			initForm();
		}

		$scope.supprimer = function () {
			$scope.form.$delete(function (response) {
				$scope.message = response.message;
				$scope.championnats.splice($scope.index, 1);
			})

			$scope.selection = false;
			initForm();
		}


		$scope.selectionnerCircuits = function (championnat) {
			$scope.selected = championnat;
			$scope.selectedTracks = [];
			if ($scope.tracks.length == 0) {
				$scope.tracks = Circuits.query();
			}
			$http({
				method: 'GET',
				url: './api/championship/' + $scope.selected.id + '/tracks'
			}).then(function (response) {
				selectTracks($scope.tracks, response.data);
			}, function () {

			});

		}

		$scope.onSelect = function (circuit, index) {
			var exists = $scope.selectedTracks.indexOf(index);
			if (exists < 0) {
				$http({
					method: 'PUT',
					url: './api/championship/' + $scope.selected.id + '/run/' + circuit.id
				}).then(function () {
					$scope.selectedTracks.push(index);
				}, function () {

				});
			} else {
				$http({
					method: 'DELETE',
					url: './api/championship/' + $scope.selected.id + '/run/' + circuit.id
				}).then(function () {
					delete $scope.selectedTracks[exists];
				}, function () {
				});
			}
		}


		var selectTracks = function (allTracks, championshipTracks) {
			for (var i=0; i<allTracks.length; i++) {
				for (var j=0; j<championshipTracks.length; j++) {
					if (allTracks[i].id === championshipTracks[j].idCircuit) {
						$scope.selectedTracks.push(i);
					}
				}
			}

		}

	}]);

