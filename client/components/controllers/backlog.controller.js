app.controller('backlogController', function($scope, $location, $cookies, postRequestService){
    postRequestService.request('/api/cards/get/backlog/project/' +$cookies.get('project')).then(function(success){
        $scope.backlog = success.data.response;
    })

    $scope.viewCard = function(cardIndex){
        console.log("fired")
        $location.url('/card/' +cardIndex);
    }

});