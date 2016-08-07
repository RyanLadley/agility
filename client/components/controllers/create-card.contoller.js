app.controller('createCardController', function($scope, postRequestService){
    $scope.newCard =
    {
        cardIndex: "",
        cardName: "",
        cardType: "", //TODO Create Drop down
        cardCreated: new Date(),
        cardUpdated: new Date(),
        cardPoints: "",
        cardPoc: "",
        cardStatus: "Open", //TODO Create Drop Down
        cardDescription: "",
        epicName: "Build App", 
        epicBackgroundColor : "#5A8A5C", 
        epicForegroundColor : "#FFFFFF", //TODO Create Drop down
        steps: []
    }


    postRequestService.request('/api/page/create/standard', $scope.newCard).then(function(success){
            console.log(success.data.response)
            $scope.newCard.cardIndex = success.data.response.card_index;
            $scope.statuses = success.data.response.statuses;

            unassigned = [{'id' : 0 ,'first_name' : 'Unassigned'}]
            $scope.users = unassigned.concat(success.data.response.users);

            $scope.newCard.cardPoc = 0;
    });
    
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