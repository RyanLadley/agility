app.controller('epicListingController', function($scope, $location, postRequestService){
    
    postRequestService.request('/api/epics/get/active').then(function(request){
        console.log(request.data.status)
        $scope.epicCards = request.data.response
    })

});