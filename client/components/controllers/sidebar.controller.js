app.controller('sidebarController', function($scope){
  
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

});