app.controller('selectProjectController', function($scope, $cookies, $location, postRequestService){
    postRequestService.request('/api/project/get/user').then(function(request){
        $scope.projects = request.data.response
    });

    $scope.select = function(projectId){
        var now = new Date()
        var oneYear = new Date(now.getFullYear()+1, now.getMonth(), now.getDate());
        $cookies.put('project', projectId, {'expires': oneYear})
        $location.url('/')
    }

});