angular.module('nrdpApp').factory('nrdpFactory', ['$http', function($http) {

	// console.log('allCards', allCards)
	// console.log('allSets', allSets)
	// console.log('hofScrape', hofScrape)
	console.log('corelist', corelist)

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// NRDB API CALLS - TO BE IMPLEMENTED IN THE FUTURE
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

	// $http({
	// 	method: 'GET',
	// 	url: 'http://netrunnerdb.com/api/cards/',
	// 	cache: true,
	// }).then(function(response) {
	// 	allCards = response.data;
	// 	console.log(allCards)
	// });

	// $http({
	// 	method: 'GET',
	// 	url: 'http://netrunnerdb.com/api/sets/',
	// 	cache: true,
	// }).then(function(response) {
	// 	allSets = response.data;
	// 	console.log(allSets)
	// });

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// SORT CARDS INTO SETS
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	for (var i=0; i<allSets.length; i++) {
		allSets[i].cards = [];
		allSets[i].userSelect = false;
		for (var j=0; j<allCards.length; j++) {
			if (allCards[j].set_code === allSets[i].code) { 
				allSets[i].cards.push(allCards[j].code);
			}
		}
	}

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// EXTRACT DECKLIST IDs FROM HALL OF FAME SCRAPE
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	
	return {
		allSets : allSets,
		allCards : allCards,
		hofScrape : hofScrape,
		corelist : corelist
	}

}]);