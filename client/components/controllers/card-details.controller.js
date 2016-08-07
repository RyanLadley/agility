app.controller('cardDetailsController', function($scope, $routeParams, postRequestService){
    postRequestService.request('/api/get/card/standard/' +$routeParams.cardId).then(function(success){
        console.log(success)
        $scope.card = success.data.response;
    })

});