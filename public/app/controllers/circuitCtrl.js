controllers.controller('CircuitCtrl', [ '$scope', '$routeParams', 'Circuits',
		'$http', function($scope, $routeParams, Circuits, $http) {

			$scope.circuits = Circuits.query();
			$scope.pays = [] ;
			
			// Simple GET request example:
			$http({
			  method: 'GET',
			  url: './api/country'
			}).then(function successCallback(response) {
				$scope.pays = response.data ;
			  }, function errorCallback(response) {
			  });

			initForm = function() {
				$scope.formCircuit = {
					id : 0,
					nom : "",
					longueur : 0,
					indexPays : 0

				};
			}
			initForm();

			$scope.selectionner = function(circuit, index) {
				$scope.formCircuit = angular.copy(circuit);
				$scope.selection = true;
				$scope.message = "";
				$scope.index = index;
				$scope.formCircuit.indexPays = findPays(circuit.idPays);
				Circuits.estcouru({
					id : $scope.formCircuit.id
				}, function(response) {
					if (response.code == 1) {
						$scope.formCircuit.supprimable = false;
					} else {
						$scope.formCircuit.supprimable = true;
					}
				});
			}

			$scope.ajouter = function() {
				var selectedPays = $scope.pays[$scope.formCircuit.indexPays];
				var circuit = new Circuits();
				circuit.nom = $scope.formCircuit.nom;
				circuit.longueur = $scope.formCircuit.longueur;
				circuit.idPays = selectedPays.id;
				Circuits.save(circuit, function(response) {
					$scope.message = response.message;
					circuit.id = response.code;
					circuit.pays = selectedPays.nom;
					$scope.circuits.push(circuit);
				});
				initForm();
			}

			$scope.modifier = function() {
				var selectedPays = $scope.pays[$scope.formCircuit.indexPays];
				var circuit = new Circuits();
				circuit.id = $scope.formCircuit.id;
				circuit.nom = $scope.formCircuit.nom;
				circuit.longueur = $scope.formCircuit.longueur;
				circuit.idPays = selectedPays.id;
				Circuits.update(circuit, function(response) {
					$scope.message = response.message;
					circuit.pays = selectedPays.nom;
					$scope.circuits[$scope.index] = circuit;
				});

				$scope.selection = false;
				initForm();
			}

			$scope.supprimer = function() {
				$scope.formCircuit.$delete(function(response) {
					$scope.message = response.message;
					$scope.circuits.splice($scope.index, 1);
				})

				$scope.selection = false;
				initForm();
			}
			
			var findPays = function (id) {
				for	(i = 0; i < $scope.pays.length; i++) {
				    if (id === $scope.pays[i].id) {
				    	return i ;
				    }
				} 
			}

		} ]);