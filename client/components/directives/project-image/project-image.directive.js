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