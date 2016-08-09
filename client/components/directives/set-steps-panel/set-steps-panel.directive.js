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