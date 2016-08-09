app.controller('createCardController', function($scope, postRequestService){
    $scope.newCard =
    {
        cardIndex: "",
        cardName: "",
        cardType: "",
        cardCreated: new Date(),
        cardUpdated: new Date(),
        cardPoints: "",
        userId: 0,
        cardStatus: "Open",
        cardDescription: "",
        epicId: "",
        steps: []
    }

    //Keep Track of the new cards epic for dispaly purposes
    $scope.epic = {
        id: 0
    }
    $scope.$watch($scope.epic, function(){
        $scope.newCard.epicId = $scope.epic.id
    });

    $scope.epics = [{id :0 , name: "None"}]
    postRequestService.request('/api/page/create/card', $scope.newCard).then(function(request){
            $scope.newCard.cardIndex = request.data.response.card_index;
            $scope.statuses = request.data.response.statuses;

            unassigned = [{'id' : 0 ,'first_name' : 'Unassigned'}]
            $scope.users = unassigned.concat(request.data.response.users);
            $scope.newCard.cardPoc = 0;

            
            $scope.epics = request.data.response.epics
    });
    
    $scope.addStep = function(){
        if (!($scope.newCard.steps)){
            $scope.newCard.steps = []
        }

        $scope.newCard.steps.push({task: "",  assigned: 0, status: "Open"});
    }

    $scope.createCard = function(){
        console.log("Fired");
        postRequestService.request('/api/create/card', $scope.newCard).then(function(request){
            console.log("Create Card: You Probably Want to do something here");
        });
    }
});