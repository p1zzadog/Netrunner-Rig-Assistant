angular.module('nrdpApp', ['ui.bootstrap']);
angular.module('nrdpApp').controller('nrdpTroller', ['$scope', '$modal', 'nrdpFactory', function($scope, $modal, nrdpFactory) {

	$scope.allSets = nrdpFactory.allSets;
	$scope.allDecklists = nrdpFactory.allDecklists;
	var userCardList = [];
	// console.log('decklists', $scope.allDecklists);

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Accordion View
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	$scope.chooseSetsOpen = true;
	$scope.suggestionsOpen = false;

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Functions creating an array of all cards a user owns based on which data packs they specify
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-	

	
	$scope.setCores = function(n){

		console.log('setCores' + n)
		$scope.numberOfCores = n;

		switch(n) {
			case 1:
			$scope.oneCore = true;
			$scope.twoCore = false;
			$scope.threeCore = false;
			break;

			case 2:
			$scope.oneCore = false;
			$scope.twoCore = true;
			$scope.threeCore = false;
			break;

			case 3:
			$scope.oneCore = false;
			$scope.twoCore = false;
			$scope.threeCore = true;
			break;

			default:
			$scope.oneCore = false;
			$scope.twoCore = false;
			$scope.threeCore = false;									
		};
	};

	$scope.toggleSet = function(index) {
		$scope.allSets[index].userSelect = !$scope.allSets[index].userSelect
		
	}

	$scope.selectSets = function() {
		var cards = []
		if (allSets[2].userSelect !== true) {

			$scope.selectACore=true;

		}

		else {

			for (var i=0; i<allSets.length; i++) {
				if (allSets[i].userSelect === true) {
					allSets[i].cards.forEach(function(element){
						cards.push(element);
					});
				};		
			};

			userCardList = cards;
			$scope.chooseSetsOpen = false;
			$scope.makeSuggestion();
			$scope.suggestionsOpen = true;
		};		
	};
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Utility function to return max value of an array
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	function getMaxOfArray(numArray) {
  		return Math.max.apply(null, numArray);
	}



// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Suggestion making algorithm, leaves out quantity of cards per pack
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

	$scope.makeSuggestion = function() {

		// filters allDecklists array into a deckSuggestions array, a decklist object is passed if all cards appear in the user's cardlist
		$scope.deckSuggestions = $scope.allDecklists.filter(function(decklist) {
			var keysArray = Object.keys(decklist.cards);

			for (var j=0; j<keysArray.length; j++) {
				if (userCardList.indexOf(keysArray[j]) === -1) {
					return false;
				}
			}
			return true;
		});


		// creates an array of card IDs in order to attach card names to numbers
		$scope.deckSuggestions.forEach(function(decklist, index){
			$scope.deckSuggestions[index].cardIdList = Object.keys(decklist.cards)
		});

		// creates an array of card names with same index as card IDs array
		$scope.deckSuggestions.forEach(function(decklist, index){
			$scope.deckSuggestions[index].cardTitleList = $scope.deckSuggestions[index].cardIdList.map(function(card){
				var allCardsIndex = _.findIndex(nrdpFactory.allCards, {"code" : card});
				return nrdpFactory.allCards[allCardsIndex].title;
			});

		});

		// sorts deckSuggestions array of objects by greatest cardID value (newest cards released)
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

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Modal displaying more information about specific cards
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

	$scope.openModal = function(deckIndex, cardIndex) {
		var allCardsIndex = _.findIndex(nrdpFactory.allCards, {"code" : cardIndex});
		$scope.imagePlaceholder = nrdpFactory.allCards[allCardsIndex].imagesrc;
		$scope.cardInfo = nrdpFactory.allCards[allCardsIndex]
		console.log($scope.cardInfo)

		var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'cardInfoModal.html',
			controller: 'ModalInstanceCtrl',
			scope: $scope
		})
	}



}]);

angular.module('nrdpApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance) {

	$scope.closeModal = function () {
    	$modalInstance.dismiss('Close');
  	};
});