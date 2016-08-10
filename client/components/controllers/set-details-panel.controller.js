app.controller('setDetailsPanelController', function($scope, postRequestService){
    
    $scope.$watch('card.epicId', function(epicId){
        for (i = 0; i < $scope.epics.length; i++){
            if($scope.epics[i].id == epicId){
                $scope.selectedEpic = $scope.epics[i]
                break 
            }
        }
    });

    console.log($scope.card)
    //For Epic creation, watch that if id o changes
    $scope.$watch('epics[0]', function(epic){
        
        if($scope.card.epicId == 0){
            $scope.selectedEpic = $scope.epics[0]
        }
    });
});