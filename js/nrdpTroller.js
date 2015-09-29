angular.module('nrdpApp', ['ui.bootstrap']);
angular.module('nrdpApp').controller('nrdpTroller', ['$scope', 'nrdpFactory', function($scope, nrdpFactory) {

	$scope.allSets = nrdpFactory.allSets;
	$scope.allDecklists = nrdpFactory.allDecklists;
	var userCardList = [];
	console.log('sets', $scope.allSets);
	// console.log('decklists', $scope.allDecklists);
	
	$scope.setCores = function(n){
		$scope.numberOfCores = n;
	};

	$scope.selectSets = function(numberOfCores) {
		var cards = []
		if (allSets[2].userSelect !== true) {
			$scope.selectACore=true;
		}
		if ($scope.numberOfCores === undefined) {
			$scope.selectNumberOfCores=true;
		}
		else {
			for (var i=0; i<allSets.length; i++) {
				if (allSets[i].userSelect === true) {
					allSets[i].cards.forEach(function(element){
						cards.push(element);
					});
				};		
			};
		};		
		userCardList = cards;
	};
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Suggestion making algorithm, leaves out quantity of cards per pack
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	
	$scope.makeSuggestion = function() {
		console.log($scope.allDecklists)
		var deckSuggestions = $scope.allDecklists.filter(function(decklist) {
			keysArray = Object.keys(decklist.cards);
			console.log(keysArray)
			for (var j=0; j<keysArray.length; j++) {
				if (userCardList.indexOf(keysArray[j]) === -1) {
					return false;
				}
				if (userCardList.indexOf(keysArray[keysArray.length-1])!== -1) {
					return true;
				}
			}
		});

		console.log(deckSuggestions)
		// console.log(Object.keys($scope.allDecklists[0].cards));
	};

}]);