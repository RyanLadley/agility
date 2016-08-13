app.controller('archiveController', function($scope, $location, $cookies, postRequestService){
    postRequestService.request('/api/cards/get/archive/project/' +$cookies.get('project')).then(function(success){
        $scope.archive = success.data.response;
    })

    $scope.viewCard = function(cardIndex){
        $location.url('/card/' +cardIndex);
    }

});