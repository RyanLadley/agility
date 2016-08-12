app.controller('sprintController', function($scope, $location, $cookies, postRequestService){
    
    postRequestService.request('/api/sprint/get/current_with_cards/project/' +$cookies.get('project')).then(function(request){
        $scope.sprint = request.data.response
    })


    $scope.addCardPrompt = false;
    $scope.addCard = function(){
        $scope.addCardPrompt = true;
    }
});