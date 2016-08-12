app.controller('epicListingController', function($scope, $location, $cookies, postRequestService){
    
    postRequestService.request('/api/epics/get/active/project/' +$cookies.get('project')).then(function(request){
        console.log(request.data.status)
        $scope.epicCards = request.data.response
    })

});