app.controller('sprintController', function($scope, $location, postRequestService){
    
    postRequestService.request('/api/sprint/get/current_with_cards').then(function(request){
        console.log(request.data.status)
        $scope.sprint = request.data.response
    })


    $scope.addCardPrompt = false;
    $scope.addCard = function(){
        $scope.addCardPrompt = true;
    }
});