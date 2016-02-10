chpApp.directive('stats', function() {
  return {
      restrict: 'E',
      scope: {
    	label: '=label',
    	url: '='
      },
      templateUrl: './partials/graph.html',
      controller: 'GraphCtrl'
  };
});