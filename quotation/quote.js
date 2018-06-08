angular.module('quoteApp', [])
	.controller('quoteCtrl', function($scope, $filter){
		$scope.category = ['Category1','Category2','Category3','Category4'];
		$scope.quotes = [];
		$scope.filterText = {searchedText: undefined};
		$scope.isAdd = true;
		$scope.quote = { author: null,
						 category: null,
						 createDate: null,
						 text: null,
						 index: null
						};

		var originQuote = angular.copy($scope.quote);

		$scope.save = function(){
			if($scope.form.$invalid){
				return;
			};

			$scope.isAdd = true;
			var savedQuote = '';

			if(!_.isNull($scope.quote.index)){
				var index = $scope.quote.index;
				savedQuote = angular.copy($scope.quote);
				$scope.quotes[index] = savedQuote;

			}else{
				$scope.quote.createDate = $filter('date')(new Date(), 'MM/dd/yyyy');
				savedQuote = angular.copy($scope.quote);
				$scope.quotes.push(savedQuote);
			}
 
			reset();
		};

		$scope.edit = function(index){
			$scope.isAdd = false;
			$scope.quotes[index].index = index;
			angular.copy($scope.quotes[index], $scope.quote);
		}

		$scope.remove = function(index){
			$scope.quotes.splice(index, 1);
		}

		$scope.cancel = function(){
			$scope.isAdd = true;
			reset();
		}

		$scope.search = function(item){
			if(_.isUndefined($scope.filterText.searchedText)){
				return true;
			}else if(item.author.toLowerCase().indexOf($scope.filterText.searchedText.toLowerCase()) != -1 || 
					item.category.toLowerCase().indexOf($scope.filterText.searchedText.toLowerCase()) != -1){
				return true;
			}
			return false;
		}

		function reset(){
			angular.copy(originQuote, $scope.quote); 
		}

	});

