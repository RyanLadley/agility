app.controller('backlogController', function($scope, $location, postRequestService){
    postRequestService.request('/api/cards/get/backlog').then(function(success){
        $scope.backlog = success.data.response;
    })

    $scope.viewCard = function(cardIndex){
        console.log("fired")
        $location.url('/card/' +cardIndex);
    }

});