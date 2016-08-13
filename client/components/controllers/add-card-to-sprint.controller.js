app.controller('addCardToSprintController', function($scope,$location, $route, $cookies, postRequestService){


    postRequestService.request('/api/cards/get/backlog/project/' +$cookies.get('project')).then(function(request){
        console.log(request)
        $scope.availableCards = request.data.response
    })


    $scope.cancel = function(){
        $route.reload();
    }

    $scope.cardId = ''
    $scope.add = function(){
        api_url = '/api/sprint/' +$scope.sprint.id + '/add/card/' + $scope.cardId;
        postRequestService.request(api_url).then(function(request){
            $route.reload();
        })
    }
})
    
   