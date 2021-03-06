var app = angular.module('app', ['ngRoute', 'ngCookies'], ['$locationProvider', function($locationProvider){
    $locationProvider.html5Mode(true);
}]);

app.run(['$rootScope', '$location', '$cookies', function($rootScope, $location, $cookies){
    //Check for token changes. 
    //If the token is deleted, the user is signed out, move them to the login page
    $rootScope.$watchCollection(function(){ return $cookies.getObject('token');}, function(token){
        if(token == null){
            $rootScope.isSignedIn = false;
            if($location.path() !== "/login"){
                alert("You have been logged out!")
                $location.url("/login")
            }
        }
        else{
            $rootScope.isSignedIn = true;
            checkProject($cookies.get('project'))
        }
    });

    //If the user is logged out, the only page they can view is the login page
    //On route change, check to make sure the user is signed in
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        if (!$rootScope.isSignedIn) {
            $location.url("/login")
        }
    })

    var checkProject = function(project){
        console.log(project)
        //If the user has not selected a project and are not in the process of slecting or creating one, 
        //Move the, to slect project screen
        if(!project && ($location.path() !== '/select/project' && $location.path() !== '/create/project')){
            console.log($location.path() !== '/create/project')
            $location.url("/select/project")
        }
}
}]);