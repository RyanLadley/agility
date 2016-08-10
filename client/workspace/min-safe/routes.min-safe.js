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
    .when("/list/epics",
        {
            controller: 'epicListingController',
            templateUrl: '/res/site/epic-listing/epic-listing.index.html'
        }
    )
    .when("/card/:cardId",
        {
            controller: 'cardDetailsController',
            templateUrl: '/res/site/card-details/card-details.index.html'
        }
    )
    .when("/create/card/:cardType",
        {
            controller: 'createCardController',
            templateUrl: '/res/site/create/create-card.index.html'
        }
    ).when("/list/backlog",
        {
            controller: 'backlogController',
            templateUrl: '/res/site/backlog/backlog.index.html'
        }
    )
    .otherwise("/",
    {
        redirectTo: "/"
    })
}]);