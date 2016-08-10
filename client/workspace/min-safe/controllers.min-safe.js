app.controller('addCardToSprintController', ['$scope', '$location', '$route', 'postRequestService', function($scope,$location, $route, postRequestService){


    postRequestService.request('/api/cards/get/backlog').then(function(request){
        console.log(request)
        $scope.availableCards = request.data.response
    })


    $scope.cancel = function(){
        $route.reload();
    }

    $scope.cardId = ''
    $scope.add = function(){
        api_url = '/api/sprint/' +$scope.sprint.id + '/add/card/' + $scope.cardId;
        console.log(api_url)
        postRequestService.request(api_url)
    }
}])
    
   
app.controller('backlogController', ['$scope', '$location', 'postRequestService', function($scope, $location, postRequestService){
    postRequestService.request('/api/cards/get/backlog').then(function(success){
        $scope.backlog = success.data.response;
    })

    $scope.viewCard = function(cardIndex){
        console.log("fired")
        $location.url('/card/' +cardIndex);
    }

}]);
app.controller('cardDetailsController', ['$scope', '$routeParams', 'postRequestService', function($scope, $routeParams, postRequestService){
    postRequestService.request('/api/get/card/' +$routeParams.cardId).then(function(request){
        $scope.card = request.data.response;
    })


    //---------------//
    //Edit Card Name//
    $scope.editName = false;
    $scope.toggleEditName = function(){
        $scope.updatedName = {
            cardId : $scope.card.id,
            cardName : $scope.card.name
        }
        $scope.editName = !$scope.editName;
    }

    $scope.saveName = function(){
        // url = /api/card/<cardID>/update/details'
       var apiUrl = '/api/card/'+$scope.card.id +'/update/name';

       postRequestService.request(apiUrl, $scope.updatedName).then(function(request){
            $scope.card.name = request.data.response.name
            $scope.editName = false;
        });
    }


    //-----------------//
    //Edit Card Details//

    $scope.editDetails = false;
    $scope.toggleEditDetails = function(){
        getSelections();
        initializeUpdateDetails()
        $scope.editDetails = !$scope.editDetails;
    }


    var initializeUpdateDetails = function(){
        var points;
        if($scope.card.points == 'None'){
            points = null
        }
        else{
            points = parseInt($scope.card.points)
        }

        $scope.updatedDetails = {
            cardId :  $scope.card.id,
            cardType: $scope.card.type,
            epicId : $scope.card.epic.id,
            cardCreated: $scope.card.created,
            cardUpdated: $scope.card.updated,
            cardPoints: points,
            userId: $scope.card.poc.id,
            cardStatus: $scope.card.status
        }
    }

    $scope.saveDetails = function(){
        // url = /api/card/<cardID>/update/details'
       var apiUrl = '/api/card/'+$scope.card.id +'/update/details';

       postRequestService.request(apiUrl, $scope.updatedDetails).then(function(request){
            var tempCard = request.data.response
            $scope.card.epic = tempCard.epic
            $scope.card.created = tempCard.created
            $scope.card.updated = tempCard.updated
            $scope.card.points = tempCard.points
            $scope.card.poc = tempCard.poc
            $scope.card.status = tempCard.status
            $scope.editDetails = false;
        });
    }

    //---------------------//
    //Edit Card Description//

    $scope.editDescription = false;
    $scope.toggleEditDescription = function(){
        $scope.updatedDescription = {
            cardId : $scope.card.id,
            cardDescription : $scope.card.description
        }
        $scope.editDescription = !$scope.editDescription;
    }

    $scope.saveDescription = function(){
        // url = /api/card/<cardID>/update/details'
       var apiUrl = '/api/card/'+$scope.card.id +'/update/description';

       postRequestService.request(apiUrl, $scope.updatedDescription).then(function(request){
            $scope.card.description = request.data.response.description
            $scope.editDescription = false;
        });
    }

    //-----------//
    //Edit Steps//

    $scope.editSteps = false;
    $scope.toggleEditSteps = function(){
        getSelections();
        initializeUpdatedSteps();
        $scope.editSteps = !$scope.editSteps;
    }

    var initializeUpdatedSteps = function(){
        $scope.updatedSteps = []
        for (i = 0; i < $scope.card.steps.length; i++){
            $scope.updatedSteps.push({
                stepId: $scope.card.steps[i].id,
                stepTask: $scope.card.steps[i].task,
                userId: $scope.card.steps[i].assigned.id,
                stepStatus: $scope.card.steps[i].status
            })
        }
    }

    $scope.saveSteps = function(){
        // url = /api/card/<cardID>/update/steps'
        var apiUrl = '/api/card/'+$scope.card.id +'/update/steps';

        postRequestService.request(apiUrl, $scope.updatedSteps).then(function(request){
            $scope.card.steps = request.data.response;
            $scope.editSteps = false;
        });
    }


    var getSelections = function(){
        if (!$scope.users || !$scope.statuses || !$scope.epic){
            $scope.epics = [$scope.card.epic];
            postRequestService.request('/api/page/create/card', $scope.newCard).then(function(success){
                $scope.statuses = success.data.response.statuses;

                unassigned = [{'id' : 0 ,'first_name' : 'Unassigned'}]
                $scope.users = unassigned.concat(success.data.response.users);

                $scope.epics = success.data.response.epics
            });
        }
    }

}]);
app.controller('cardController', ['$scope', function($scope){
  
    $scope.front = true;
    $scope.toggleShow = function() {
        $scope.front = !$scope.front
    }

}]);
app.controller('createCardController', ['$scope', '$routeParams', 'postRequestService', function($scope, $routeParams, postRequestService){
    
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

}]);
app.controller('epicListingController', ['$scope', '$location', 'postRequestService', function($scope, $location, postRequestService){
    
    postRequestService.request('/api/epics/get/active').then(function(request){
        console.log(request.data.status)
        $scope.epicCards = request.data.response
    })

}]);
app.controller('homeController', ['$scope', 'postRequestService', function($scope, postRequestService){

    $scope.discussion = [
    {
        cardIndex: 'abc-123',
        cardName: "First Card",
        cardType: "card",
        user: "Chuch Jones",
        message: "Te pro legimus gloriatur referrentur, altera impedit gloriatur eu quo, admodum consulatu id vim. Eu homero tempor eos, mea laoreet consetetur an. Vim diam oporteat moderatius ad. Mei cu mundi fabellas, usu mundi sanctus albucius ea. Eam at aeque erroribus omittantur, eam simul mediocritatem no, nulla dicant ornatus eu mei."
    },
    {
        cardIndex: 'abc-456',
        cardName: "A longer Title",
        cardType: "card",
        user: "Lama Lee",
        message: "Te pro legimus gloriatur referrentur, altera impedit gloriatur eu quo, admodum consulatu id vim. Eu homero tempor eos, mea laoreet consetetur an. Vim diam oporteat moderatius ad. Mei cu mundi fabellas, usu mundi sanctus albucius ea. Eam at aeque erroribus omittantur, eam simul mediocritatem no, nulla dicant ornatus eu mei."
    }];  

    postRequestService.request('/api/page/home').then(function(success){
        $scope.cards = success.data.response.cards;
        $scope.sprint = success.data.response.sprint
        console.log($scope.sprint.id)
    })
    
    $scope.confirmSprintClosure = function(){
        var confirmed = confirm("Are you sure you want to close the sprint?\nAny card not closed will be moved to the backlog.")
        if(confirmed){
            postRequestService.request('/api/sprint/close').then(function(success){})
        }

    }

    $scope.displayOpenSprint = false

}]);
app.controller('openSprintController', ['$scope', '$location', '$route', 'postRequestService', function($scope,$location, $route, postRequestService){

    var month = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

    $scope.sprint = {
        name: "Sprint for " + month[new Date().getMonth()],
        endDate: 4
    }

    $scope.cancel = function(){
        $location.url("/")
        $route.reload() //TODO make it so this is not neccisary
    }

    $scope.open = function(){
        postRequestService.request('/api/sprint/open', $scope.sprint)
    }
}]);
    
   
app.controller('setDetailsPanelController', ['$scope', 'postRequestService', function($scope, postRequestService){
    
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
}]);
app.controller('setStepsPanelController', ['$scope', 'postRequestService', function($scope, postRequestService){
    
    $scope.addStep = function(){
        if (!($scope.steps)){
            $scope.newCard.steps = []
        }

        $scope.steps.push({stepTask: "",  userId: 0, stepStatus: "Open"});
    }

}]);
app.controller('sidebarController', ['$scope', '$location', function($scope, $location){
  
    $scope.abs

    $scope.icons = {
        epic: false,
        sprint: false,
        backlog: false
    }

    $scope.expand = false;
    $scope.toggleExpand = function(){
        $scope.expand = !$scope.expand;

        if($scope.expand){
            $scope.pos = {
            "width": "200px"
            };
            $scope.abs = {
                "left": "0"
            };
        }
        else{
           $scope.pos= {
            "width": "50"
            };
            $scope.abs = {
                "left": "-200"
            } 
        }   
    }


    $scope.$watch(function() {return $location.path();}, function(path){

        angular.forEach($scope.icons,function(value,index){
            $scope.icons[index] = false;
        });

        if(path === "/"){
            $scope.icons.home = true;
        }
        else if(path === "/list/epics"){
            $scope.icons.epic = true;
        }
        else if(path ==="/list/sprint/current"){
            $scope.icons.sprint = true;
        }
        else if(path === "/list/backlog"){
            $scope.icons.backlog = true;
        };
    });
}]);
app.controller('sprintController', ['$scope', '$location', 'postRequestService', function($scope, $location, postRequestService){
    
    postRequestService.request('/api/sprint/get/current_with_cards').then(function(request){
        $scope.sprint = request.data.response
    })


    $scope.addCardPrompt = false;
    $scope.addCard = function(){
        $scope.addCardPrompt = true;
    }
}]);