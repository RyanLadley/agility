app.controller('createCardController', function($scope, postRequestService){
    $scope.newCard =
    {
        id: "ABC-123",
        name: "",
        type: "", //TODO Create Drop down
        created: new Date(),
        modified: new Date(),
        points: "",
        epic: {name: "Build App", backColor : "#5A8A5C", foreColor : "#FFFFFF"}, //TODO Create Drop down
        poc: "",
        status: "Open", //TODO Create Drop Down
        description: "",
        steps: []
    }

    $scope.addStep = function(){
        $scope.newCard.steps.push({task: "",  assigned: "Not Assigned", status: "Open"});
    }

    $scope.createCard = function(){
        console.log("Fired");
        postRequestService.request('/api/create/card', $scope.newCard).then(function(response){
            console.log("Create Card: You Probably Want to do something here");
        });
    }
});