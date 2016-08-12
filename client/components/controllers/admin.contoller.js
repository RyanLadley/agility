app.controller('adminController', function($scope, $rootScope, $location){
    if($rootScope.isSignedIn){
        $location.url("/")
    }
});