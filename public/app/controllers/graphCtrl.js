controllers.controller('GraphCtrl', [ '$scope', '$routeParams', '$http',
		'Stats', function($scope, $routeParams, $http, Stats) {

			var x = [];
			var y = [];

			$scope.config = {
				options : {
					chart : {
						type : 'column'
					},
					legend : {
						enabled : false
					},
					title : {
						text : ''
					},
					xAxis : {
						categories : x
					},
					yAxis : {
						title : {
							text: ''
						}
					},
				},
				series : [ {
					data : y
				} ]
			};

			$http({
				url : './api/stat/' + $scope.url,
				method : "GET",
				isArray : true
			}).success(function(data) {
				$scope.stats = data;
				angular.forEach($scope.stats, function(value, key) {
					this.push(value.name);
				}, x);

				angular.forEach($scope.stats, function(value, key) {
					this.push(value.count);
				}, y);
			}

			);
		} ]);