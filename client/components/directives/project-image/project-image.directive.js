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