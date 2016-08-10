app.controller('createCardController', function($scope, $routeParams, postRequestService){
    
    //Basic Variables every Card Has
    $scope.newCard =
    {
        cardIndex: "",
        cardName: "",
        cardType: $routeParams.cardType,
        cardCreated: new Date(),
        cardUpdated: new Date(),
        cardPoints: "",
        userId: 0,
        cardStatus: "Open",
        cardDescription: "",
        epicId: "",
        epicBackgroundColor: "#ffffff", //Only populated igf card is an epic
        epicForegroundColor: "#000000", //Only populated igf card is an epic
        steps: [] //Only populated if card is standard
    }


    //Initial Value for the new Card's epic
    //If the card itself is an epic, this remains constant
    $scope.epic = {
        id: 0
    }

    //If card is an epic, alter the epic label so the user can see the results
    $scope.$watch('newCard.epicBackgroundColor', function(color){
        if($scope.newCard.cardType == "Epic"){
            $scope.epics[0].background_color = color;
        }
    });
    $scope.$watch('newCard.epicForegroundColor', function(color){
        if($scope.newCard.cardType == "Epic"){
            $scope.epics[0].foreground_color = color;
        }
    });
    $scope.$watch('newCard.cardName', function(name){
        if($scope.newCard.cardType == "Epic"){
            $scope.epics[0].name = name;
        }
    });
    //$scope.$watch($scope.newCard.epicForegroundColor, function(){
    //    if(newCard.cardType == "Epic"){
    //        $scope.epic.backgroundColor = $scope.newCard.epicForegroundColor;
    //    }
    //});

    //Watchs details direcive epic. This allows us to keep track
    //of which epic is assigned to card (if the card itself is not an Epic)
    $scope.$watch($scope.epic, function(){
        $scope.newCard.epicId = $scope.epic.id
    });


    //Retrieve all data for drop down menus from api (Users, Statuses, and Active Epics)
    $scope.epics = [{id :0 , name: "None"}]
    postRequestService.request('/api/page/create/card', $scope.newCard).then(function(request){
            $scope.newCard.cardIndex = request.data.response.card_index;
            $scope.statuses = request.data.response.statuses;

            unassigned = [{'id' : 0 ,'first_name' : 'Unassigned'}]
            $scope.users = unassigned.concat(request.data.response.users);
            $scope.newCard.cardPoc = 0;

            
            $scope.epics = $scope.epics.concat(request.data.response.epics)
    });
    

    //Sends all data in the newCard variable to api to be stored
    //Sent on users pressing of the "Create" button
    $scope.createCard = function(){
        postRequestService.request('/api/create/card', $scope.newCard).then(function(request){
            console.log("Create Card: You Probably Want to do something here");
        });
    }

});