angular.module('nrdpApp', ['ui.bootstrap']);
angular.module('nrdpApp').controller('nrdpTroller', ['$scope', 'nrdpFactory', function($scope, nrdpFactory) {

	$scope.allSets = nrdpFactory.allSets;
	userCardList = []
	// console.log($scope.allSets)
	
	$scope.setCores = function(n){
		$scope.numberOfCores = n
	}

	$scope.selectSets = function(numberOfCores) {

		if (allSets[2].userSelect !== true) {
			$scope.selectACore=true;
		}
		if ($scope.numberOfCores === undefined) {
			$scope.selectNumberOfCores=true;
		}


			// console.log($scope.numberOfCores)
			// var check = []
			// for (var i=0; i<allSets.length; i++){
			// 	check.push(allSets[i].userSelect)
			// }
			// console.log(check)

	}
	


}]);