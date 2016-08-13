app.controller('backlogController', function($scope, $location, $cookies, postRequestService){
    postRequestService.request('/api/cards/get/backlog/project/' +$cookies.get('project')).then(function(success){
        $scope.backlog = success.data.response;
    })

    $scope.viewCard = function(cardIndex){
        $location.url('/card/' +cardIndex);
    }

});