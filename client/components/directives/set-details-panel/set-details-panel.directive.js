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