app.controller('setStepsPanelController', function($scope, postRequestService){
    
    $scope.addStep = function(){
        if (!($scope.steps)){
            $scope.newCard.steps = []
        }

        $scope.steps.push({stepTask: "",  userId: 0, stepStatus: "Open"});
    }

});