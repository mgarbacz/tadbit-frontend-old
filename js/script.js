function CardController($scope, $http) {

    $http.get('cards_data.json').success(function(data) {
        $scope.cards = data;
    });

    

}
