app.controller('cardDetailsController', ['$scope', function($scope){
    $scope.card =
    {
        id: "abc-123",
        name: "First Card",
        type: "standard",
        created: new Date(),
        modified: new Date(),
        points: "1",
        epic: {name: "Build App", backColor : "#5A8A5C", foreColor : "#FFFFFF"},
        poc: "Chuck Chuckerson",
        status: "Closed",
        description: "Mattis a semper rutrum in in blandit adipiscing ornare commodo vitae at erat vivamus fringilla maecenas in "
                    +"scelerisque platea auctor.Habitasse vestibulum.",
        steps: [{task: "Do the thing", assigned: "Unknown", status: "Open"}, {task: "Review the thing",  assigned: "Unknown", status: "Open"},
            {task: "Test the thing",  assigned: "Unknown", status: "Open"},{task: "Do a much longer thing to take up space and turn it in", assigned: "Unknown", status: "Open"},]
    }
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
        id: "ABC-123",
        name: "",
        type: "", //TODO Create Drop down
        created: new Date(),
        modified: new Date(),
        points: "",
        epic: {name: "Build App", backColor : "#5A8A5C", foreColor : "#FFFFFF"}, //TODO Create Drop down
        poc: "",
        status: "Open",
        description: "",
        steps: []
    }

    $scope.addStep = function(){
        $scope.newCard.steps.push({task: "",  assigned: "Not Assigned", status: "Open"});
    }

    $scope.createCard = function(){
        console.log("Fired");
        postRequestService.request('/api/create/card', $scope.newCard).then(function(response){
            console.log("Internal Success!!");
        });
    }
}]);
app.controller('homeController', ['$scope', function($scope){

    $scope.discussion = [
    {
        cardId: 'abc-123',
        cardName: "First Card",
        cardType: "card",
        user: "Chuch Jones",
        message: "Te pro legimus gloriatur referrentur, altera impedit gloriatur eu quo, admodum consulatu id vim. Eu homero tempor eos, mea laoreet consetetur an. Vim diam oporteat moderatius ad. Mei cu mundi fabellas, usu mundi sanctus albucius ea. Eam at aeque erroribus omittantur, eam simul mediocritatem no, nulla dicant ornatus eu mei."
    },
    {
        cardId: 'abc-456',
        cardName: "A longer Title",
        cardType: "card",
        user: "Lama Lee",
        message: "Te pro legimus gloriatur referrentur, altera impedit gloriatur eu quo, admodum consulatu id vim. Eu homero tempor eos, mea laoreet consetetur an. Vim diam oporteat moderatius ad. Mei cu mundi fabellas, usu mundi sanctus albucius ea. Eam at aeque erroribus omittantur, eam simul mediocritatem no, nulla dicant ornatus eu mei."
    }];  

    $scope.cards = [
    {
        id: "abc-123",
        name: "First Card",
        points: "1",
        epic: {name: "Build App", backColor : "#5A8A5C", foreColor : "#FFFFFF"},
        poc: "Chuck Chuckerson",
        description: "Mattis a semper rutrum in in blandit adipiscing ornare commodo vitae at erat vivamus fringilla maecenas in scelerisque platea auctor.Habitasse vestibulum."
    },
    {
        id: "abc-123",
        name: "Second Card",
        points: "2",
        poc: "Bob McBober",
        epic: {name: "Build App", backColor : "#5A8A5C", foreColor : "#FFFFFF"},
        description: "Mattis a semper rutrum in in blandit adipiscing ornare commodo vitae at erat vivamus fringilla maecenas in scelerisque platea auctor.Habitasse vestibulum."
    },
    {
        id: "abc-123",
        name: "Third Card",
        points: "2",
        epic: {name: "Build App", backColor : "#5A8A5C", foreColor : "#FFFFFF"},
        poc: "Katie Cat",
        description: "Mattis a semper rutrum in in blandit adipiscing ornare commodo vitae at erat vivamus fringilla maecenas in scelerisque platea auctor.Habitasse vestibulum."
    },
    {
        id: "abc-123",
        name: "Fourth Card",
        epic: {name: "Build App", backColor : "#5A8A5C", foreColor : "#FFFFFF"},
        points: "2",
        poc: "Lama Beans",
        description: "Mattis a semper rutrum in in blandit adipiscing ornare commodo vitae at erat vivamus fringilla maecenas in scelerisque platea auctor.Habitasse vestibulum."
    }];

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
app.controller('sprintController', ['$scope', function($scope){
    
    $scope.sprint = {
        start: new Date(),
        end: new Date(),
        points: "43"
    }


    $scope.cards = [
    {
        id: "abc-123",
        name: "First Card",
        points: "1",
        epic: {name: "Build App", backColor : "#5A8A5C", foreColor : "#FFFFFF"},
        poc: "Chuck Chuckerson",
        status: "Closed",
        description: "Mattis a semper rutrum in in blandit adipiscing ornare commodo vitae at erat vivamus fringilla maecenas in scelerisque platea auctor.Habitasse vestibulum."
    },
    {
        id: "abc-123",
        name: "Second Card",
        points: "2",
        poc: "Bob McBober",
        epic: {name: "Build App", backColor : "#5A8A5C", foreColor : "#FFFFFF"},
        status: "Development",
        description: "Mattis a semper rutrum in in blandit adipiscing ornare commodo vitae at erat vivamus fringilla maecenas in scelerisque platea auctor.Habitasse vestibulum."
    },
    {
        id: "abc-123",
        name: "Third Card",
        points: "2",
        epic: {name: "Build App", backColor : "#5A8A5C", foreColor : "#FFFFFF"},
        poc: "Katie Cat",
        status: "QA",
        description: "Mattis a semper rutrum in in blandit adipiscing ornare commodo vitae at erat vivamus fringilla maecenas in scelerisque platea auctor.Habitasse vestibulum."
    },
    {
        id: "abc-123",
        name: "Fourth Card",
        epic: {name: "Build App", backColor : "#5A8A5C", foreColor : "#FFFFFF"},
        points: "2",
        poc: "Lama Beans",
        status: "Open",
        description: "Mattis a semper rutrum in in blandit adipiscing ornare commodo vitae at erat vivamus fringilla maecenas in scelerisque platea auctor.Habitasse vestibulum."
    }];

}]);