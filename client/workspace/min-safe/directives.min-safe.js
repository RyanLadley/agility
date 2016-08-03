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