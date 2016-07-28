var app = angular.module('app', ['ngRoute', 'ngCookies']);;app.service('toggleService', function(){
    this.toggle = function(bool){
        return !bool;
    }
});;;app.controller('cardController', ['$scope', function($scope){
  
    $scope.front = true;
    $scope.toggleShow = function() {
        $scope.front = !$scope.front
    }

}]);
app.controller('sidebarController', ['$scope', function($scope){
  
    $scope.abs

    $scope.expand = function(){
        $scope.pos = {
            "width": "150px"
        };
        $scope.abs = {
            "left": "0"
        };
    }

    $scope.compress = function(){
        $scope.pos= {
            "width": "50"
        };
        $scope.abs = {
            "left": "-150"
        }
    }

}]);
app.controller('sprintController', ['$scope', function($scope){
  
    $scope.cards = [
    {
        name: "First Card",
        points: "1",
        description: "Mattis a semper rutrum in in blandit adipiscing ornare commodo vitae at erat vivamus fringilla maecenas in scelerisque platea auctor.Habitasse vestibulum."
    },
    {
        name: "Second Card",
        points: "2",
        description: "Mattis a semper rutrum in in blandit adipiscing ornare commodo vitae at erat vivamus fringilla maecenas in scelerisque platea auctor.Habitasse vestibulum."
    }];

}]);;app.directive('card', ['toggleService', function(toggleService) {
    return{
        restrict: 'E',
        controller: 'cardController',
        scope: {
            card: '='
        },
       templateUrl: '/res/components/directives/card/card.template.html'
    };
}])
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