angular.module('nrdpApp', ['ui.bootstrap']);
angular.module('nrdpApp').controller('nrdpTroller', ['$scope', 'nrdpFactory', function($scope, nrdpFactory) {

	$scope.allSets = nrdpFactory.allSets;

	console.log($scope.allSets)


}]);