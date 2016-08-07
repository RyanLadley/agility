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
    
   
app.controller('cardDetailsController', ['$scope', '$routeParams', 'postRequestService', function($scope, $routeParams, postRequestService){
    postRequestService.request('/api/get/card/standard/' +$routeParams.cardId).then(function(success){
        console.log(success)
        $scope.card = success.data.response;
    })

}]);
app.controller('cardController', ['$scope', function($scope){
  
    $scope.front = true;
    $scope.toggleShow = function() {
        $scope.front = !$scope.front
    }

}]);
app.controller('createCardController', ['$scope', 'postRequestService', function($scope, postRequestService){
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
        else if(path === "/list/epic"){
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
        console.log(request.data.status)
        $scope.sprint = request.data.response
    })


    $scope.addCardPrompt = false;
    $scope.addCard = function(){
        $scope.addCardPrompt = true;
    }
}]);