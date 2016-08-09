app.directive('epicLabel', function() {
    return{
        restrict: 'E',
        scope: {
            epic: '='
        },
       templateUrl: '/res/components/directives/epic-label/epic-label.template.html'
    };
})