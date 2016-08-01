app.config(['$routeProvider', '$locationProvider', 
    function($routeProvider, $locationProvider){
    $routeProvider
    .when("/",
        {
            controller: 'homeController',
            templateUrl: '/res/site/home/home.index.html'
        }
    )
    .when("/list/sprint/current",
        {
            templateUrl: '/res/site/sprint/sprint.index.html'
        }
    )
    .when("/card/:cardId",
        {
            controller: 'cardDetailsController',
            templateUrl: '/res/site/card/card.index.html'
        }
    )
    .otherwise("/",
    {
        redirectTo: "/"
    })
}]);