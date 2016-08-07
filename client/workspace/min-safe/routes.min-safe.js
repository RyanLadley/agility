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
            controller: 'sprintController',
            templateUrl: '/res/site/sprint/sprint.index.html'
        }
    )
    .when("/card/:cardId",
        {
            controller: 'cardDetailsController',
            templateUrl: '/res/site/card/card.index.html'
        }
    )
    .when("/create/card",
        {
            controller: 'createCardController',
            templateUrl: '/res/site/create/create-card.index.html'
        }
    )
    .otherwise("/",
    {
        redirectTo: "/"
    })
}]);