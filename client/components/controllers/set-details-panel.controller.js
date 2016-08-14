app.controller('setDetailsPanelController', function($scope, postRequestService){
    
    $scope.$watch('card.epicId', function(epicId){
        //Iterate through all possible epics.
        //If the epicId proived is matched, set that as selected and break.
        for (i = 0; i < $scope.epics.length; i++){
            if($scope.epics[i].id == epicId){
                console.log($scope.epics[i].id)
                $scope.selectedEpic = $scope.epics[i]
                break 
            }
        }
    });

});