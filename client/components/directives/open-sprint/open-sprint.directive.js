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