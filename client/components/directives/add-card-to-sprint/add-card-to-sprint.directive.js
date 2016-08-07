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