app.controller('setDetailsPanelController', function($scope, postRequestService){
    
    $scope.$watch('card.epicId', function(epicId){
        for (i = 0; i < $scope.epics.length; i++){
            if($scope.epics[i].id == epicId){
                $scope.selectedEpic = $scope.epics[i]
                break 
            }
        }
    });

    
});