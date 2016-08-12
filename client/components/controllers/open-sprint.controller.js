app.controller('openSprintController', function($scope,$location, $route, $cookies, postRequestService){

    var month = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

    $scope.sprint = {
        name: "Sprint for " + month[new Date().getMonth()],
        endDate: 4,
        project: $cookies.get('project')
    }

    $scope.cancel = function(){
        $location.url("/")
        $route.reload() //TODO make it so this is not neccisary
    }

    $scope.open = function(){
        postRequestService.request('/api/sprint/open', $scope.sprint)
    }
});
    
   