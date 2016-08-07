app.directive('addCardToSprint', function() {
    return{
        restrict: 'E',
        controller: 'addCardToSprintController',
        scope: {
            display: '=',
            sprint: '='
        },
       templateUrl: '/res/components/directives/add-card-to-sprint/add-card-to-sprint.template.html',
    };
})
app.directive('card', function() {
    return{
        restrict: 'E',
        controller: 'cardController',
        scope: {
            card: '='
        },
       templateUrl: '/res/components/directives/card/card.template.html'
    };
})
app.directive('discussionBoard', function() {
    return{
        restrict: 'E',
        //controller: 'discussionBoardController',
        scope: {
            discussion: '='
        },
       templateUrl: '/res/components/directives/discussion-board/discussion-board.template.html'
    };
})
app.directive('openSprint', function() {
    return{
        restrict: 'E',
        controller: 'openSprintController',
        scope: {
            display: '='
        },
       templateUrl: '/res/components/directives/open-sprint/open-sprint.template.html',
       link: function (scope, element, attr) {
            scope.toggleDisplay = function() {
                scope.display = false;
            };
        }
    };
})
app.directive('projectImage', function() {
    return{
        restrict: 'E',
        //controller: 'projectImageController',
        scope: {
            card: '='
        },
       templateUrl: '/res/components/directives/project-image/project-image.template.html'
    };
})
app.directive('sidebar', function() {
    return{
        restrict: 'E',
        controller: 'sidebarController',
        scope: {
            card: '='
        },
       templateUrl: '/res/components/directives/sidebar/sidebar.template.html'
    };
})