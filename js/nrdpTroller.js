angular.module('nrdpApp', ['ui.bootstrap']);
angular.module('nrdpApp').controller('nrdpTroller', ['$scope', 'nrdpFactory', function($scope, nrdpFactory) {

	$scope.allSets = nrdpFactory.allSets;
	$scope.allDecklists = nrdpFactory.allDecklists;
	var userCardList = [];
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
		// console.log('userCardList', userCardList)
	};
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Suggestion making algorithm, leaves out quantity of cards per pack
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	function getMaxOfArray(numArray) {
  		return Math.max.apply(null, numArray);
	}


	$scope.deckSuggestions = [{identity:"http://netrunnerdb.com/bundles/netrunnerdbcards/images/cards/en/07029.png"}];
	$scope.makeSuggestion = function() {
		$scope.deckSuggestions = $scope.allDecklists.filter(function(decklist) {
			keysArray = Object.keys(decklist.cards);
			for (var j=0; j<keysArray.length; j++) {
				if (userCardList.indexOf(keysArray[j]) === -1) {
					return false;
				}
			}
			return true;
		});

		$scope.deckSuggestions.sort(function(deckA, deckB){
			if (getMaxOfArray(Object.keys(deckA.cards)) > getMaxOfArray(Object.keys(deckB.cards))) {
				return -1;
			};
			if (getMaxOfArray(Object.keys(deckA.cards)) < getMaxOfArray(Object.keys(deckB.cards))) {
				return 1;
			};
			return 0;
		});
	};


}]);