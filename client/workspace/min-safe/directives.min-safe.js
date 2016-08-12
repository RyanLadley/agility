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
app.directive('epicLabel', function() {
    return{
        restrict: 'E',
        scope: {
            epic: '='
        },
       templateUrl: '/res/components/directives/epic-label/epic-label.template.html'
    };
})
app.directive('imageUpload', function () {
    return {
        restrict: 'A',
        scope: {
            image: '='
        },

        link: function (scope, element, attrs) {
            var reader = new FileReader();
            reader.onload = function (event) {
                scope.image = event.target.result;
                scope.$apply();
            }

            element.on('change', function() {
                reader.readAsDataURL(element[0].files[0]);
            });
        }
    };
});
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
            project: '='
        },
       templateUrl: '/res/components/directives/project-image/project-image.template.html'
    };
})
app.directive('setDetailsPanel', function() {
    return{
        restrict: 'E',
        controller : 'setDetailsPanelController',
        scope: {
            card: '=',
            users: '=',
            statuses: '=',
            epics: '='
        },
       templateUrl: '/res/components/directives/set-details-panel/set-details-panel.template.html'
    };
})
app.directive('setStepsPanel', function() {
    return{
        restrict: 'E',
        controller: 'setStepsPanelController',
        scope: {
            steps: '=',
            users: '=',
            statuses: '='
        },
       templateUrl: '/res/components/directives/set-steps-panel/set-steps-panel.template.html'
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