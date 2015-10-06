angular.module('nrdpApp', ['ui.bootstrap', 'ngAnimate']);
angular.module('nrdpApp').controller('nrdpTroller', ['$scope', '$modal', 'nrdpFactory', function($scope, $modal, nrdpFactory) {

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Initialize Data Arrays
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

	$scope.allSets = nrdpFactory.allSets;
	allDecklists = nrdpFactory.allDecklists;
	var userCardList = [];

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Accordion View Initialize
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	
	$scope.chooseSetsOpen = true;
	$scope.suggestionsOpen = false;

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Applies styles to number of core buttons, automaticaly selects core set
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-	
	
	$scope.setCores = function(n){

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

		$scope.allSets[2].userSelect = true;
	};

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Data pack select toggle and select button
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-	

	$scope.toggleSet = function(index) {
		$scope.allSets[index].userSelect = !$scope.allSets[index].userSelect
	};

	$scope.selectAll = function() {
		$scope.allSets.forEach(function(set) {
			set.userSelect = true;
		});
	};

	$scope.selectNone = function() {
		$scope.allSets.forEach(function(set) {
			set.userSelect = false;
		});
	};

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Function creates an array of all cards a user owns based on which data packs they specify
// Function then calls makeSuggestion(); to populate an array of decklists the user has cards for
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-	

	$scope.selectSets = function() {
		userCardList = []
		if (allSets[2].userSelect !== true) {
			$scope.selectACore=true;
		}

		else {
			$scope.selectACore=false;
			for (var i=0; i<allSets.length; i++) {

				if (allSets[i].userSelect === true) {					
					
					allSets[i].cards.forEach(function(card){
						userCardList.push(card);
					});
				};		
			};

			makeSuggestion();
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
// Suggestion making algorithm, leaves out quantity of cards per pack and number of cores
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

	var makeSuggestion = function() {

		// filters allDecklists array into a deckSuggestions array, a decklist object is passed if all cards appear in the user's cardlist
		$scope.deckSuggestions = allDecklists.filter(function(decklist) {
			var keysArray = Object.keys(decklist.cards);

			for (var j=0; j<keysArray.length; j++) {
				if (userCardList.indexOf(keysArray[j]) === -1) {
					return false;
				};
			};
			return true;
		});


		// creates an array of card IDs in order to attach card names to numbers
		$scope.deckSuggestions.forEach(function(decklist, index){
			$scope.deckSuggestions[index].cardIdList = Object.keys(decklist.cards);
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
		$scope.cardInfo = nrdpFactory.allCards[allCardsIndex];

		var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'cardInfoModal.html',
			controller: 'ModalInstanceCtrl',
			scope: $scope
		});
	};



}]);

// needed to make a separate controller for modal instances in order to close modal and load images correctly since modal is outside normal scope
angular.module('nrdpApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance) {

	$scope.closeModal = function () {
    	$modalInstance.dismiss('Close');
  	};
});