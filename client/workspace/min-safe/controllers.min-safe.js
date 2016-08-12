app.controller('addCardToSprintController', ['$scope', '$location', '$route', '$cookies', 'postRequestService', function($scope,$location, $route, $cookies, postRequestService){


    postRequestService.request('/api/cards/get/backlog/project/' +$cookies.get('project')).then(function(request){
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
    
   
app.controller('adminController', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location){
    if($rootScope.isSignedIn){
        $location.url("/")
    }
}]);
app.controller('backlogController', ['$scope', '$location', '$cookies', 'postRequestService', function($scope, $location, $cookies, postRequestService){
    postRequestService.request('/api/cards/get/backlog/project/' +$cookies.get('project')).then(function(success){
        $scope.backlog = success.data.response;
    })

    $scope.viewCard = function(cardIndex){
        console.log("fired")
        $location.url('/card/' +cardIndex);
    }

}]);
app.controller('cardDetailsController', ['$scope', '$routeParams', '$cookies', 'postRequestService', function($scope, $routeParams, $cookies, postRequestService){
    
    //api call is "/api/get/card/<card_index>/project/<project_id>"
    var initApiCall = '/api/get/card/' +$routeParams.cardId +'/project/'+$cookies.get('project')
    postRequestService.request(initApiCall).then(function(request){
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
            postRequestService.request('/api/page/create/card/project/' +$cookies.get('project')).then(function(success){
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
app.controller('createCardController', ['$scope', '$routeParams', '$cookies', 'postRequestService', function($scope, $routeParams, $cookies, postRequestService){
    
    //Basic Variables every Card Has
    $scope.newCard =
    {
        cardProject: $cookies.get('project'),
        cardIndex: "",
        cardName: "",
        cardType: $routeParams.cardType,
        cardCreated: new Date(),
        cardUpdated: new Date(),
        cardPoints: "",
        userId: 0,
        cardStatus: "Open",
        cardDescription: "",
        epicId: "0",
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
    postRequestService.request('/api/page/create/card/project/' +$cookies.get('project')).then(function(request){
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
app.controller('createProjectController', ['$scope', '$location', '$cookies', 'postRequestService', function($scope, $location, $cookies, postRequestService){
    
    $scope.project = {
        create: true,
        name: "New Project",
        designator: "PROJ",
        image: "/image/project/0/default.jpg"
    }

    $scope.apiImage;
    $scope.uploadImage = function(element){
        $scope.apiImage = element.files;
        var reader = new FileReader();

        reader.onload = function(event) {
            $scope.project.image = event.target.result
            $scope.$apply()

        }
        // when the file is read it triggers the onload event above.
        reader.readAsDataURL(element.files);
    }
    
    $scope.submit = function(){
        var newProject = {
            projName: $scope.project.name,
            projDesignator: $scope.project.designator,
            image: $scope.project.image
        }

        postRequestService.request('/api/project/create', newProject).then(function(request){
            projectId = request.data.response

            var now = new Date()
            var oneYear = new Date(now.getFullYear()+1, now.getMonth(), now.getDate());
            
            $cookies.put('project', projectId, {'expires': oneYear})
            $location.url('/')
            
        });
    }
}]);
app.controller('epicListingController', ['$scope', '$location', '$cookies', 'postRequestService', function($scope, $location, $cookies, postRequestService){
    
    postRequestService.request('/api/epics/get/active/project/' +$cookies.get('project')).then(function(request){
        console.log(request.data.status)
        $scope.epicCards = request.data.response
    })

}]);
app.controller('homeController', ['$scope', '$cookies', 'postRequestService', function($scope, $cookies, postRequestService){

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

    $scope.project = {
        name: "Loading...",
        image: "0/default.jpg"
    }
    postRequestService.request('/api/page/home/project/'+$cookies.get('project')).then(function(request){
        $scope.cards = request.data.response.cards;
        $scope.sprint = request.data.response.sprint
        $scope.project = request.data.response.project
        console.log($scope.project.name)
    })
    
    $scope.confirmSprintClosure = function(){
        var confirmed = confirm("Are you sure you want to close the sprint?\nAny card not closed will be moved to the backlog.")
        if(confirmed){
            postRequestService.request('/api/sprint/close/project/' +$cookies.get('project')).then(function(success){})
        }

    }

    $scope.displayOpenSprint = false
    $scope.toggleOpenSprint = function(){
        $scope.displayOpenSprint = !$scope.displayOpenSprint
    }
    $scope.logout = function(){
        $cookies.remove('token')
    }

}]);
app.controller('loginController', ['$scope', '$rootScope', '$cookies', '$location', 'postRequestService', function($scope, $rootScope, $cookies, $location, postRequestService){
    $scope.login = {}
    $scope.submit = function(){
        console.log($scope.login)
        if(validEmail() && validPassword() ){
            postRequestService.request("/api/admin/login", $scope.login).then(function(request){
                if(request.data.status === "success"){
                    var now = new Date()
                    var oneYear = new Date(now.getFullYear()+1, now.getMonth(), now.getDate());
                    $cookies.putObject('token', request.data.response, {'expires': oneYear})
                    $location.url("/")
                }
                else{
                    $scope.failureMessage = request.data.response;
                }
            });
        }
    }


    var validPassword = function(){
        if(!$scope.login.password || $scope.login.password.length < 6){
            $scope.failureMessage = "Password must be at least 6 characters";
            return false;
        }
        return true;
    }
    
    var validEmail = function(){
        if(!$scope.login.email || !$scope.loginForm.loginEmail.$valid){
            $scope.failureMessage = "The email address provided is invalid";
            return false;
        }
        return true;
    }

}]);
app.controller('openSprintController', ['$scope', '$location', '$route', '$cookies', 'postRequestService', function($scope,$location, $route, $cookies, postRequestService){

    var month = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

    $scope.sprint = {
        name: "Sprint for " + month[new Date().getMonth()],
        endDate: 4,
        project: $cookies.get('project')
    }

    $scope.cancel = function(){
        $location.url("/")
        $route.reload() //TODO make it so this is not neccisary
    }

    $scope.open = function(){
        postRequestService.request('/api/sprint/open', $scope.sprint)
    }
}]);
    
   
app.controller('registerController', ['$scope', '$cookies', 'postRequestService', function($scope, $cookies, postRequestService){
    $scope.register = {}
   $scope.submit = function(){

        if(validEmail() && validFirstName() && validLastName() && validPassword() ){

            postRequestService.request("/api/admin/register", $scope.register).then(function(request){
                if(request.data.status === "success"){
                    console.log("Success!!")
                }
                else{
                    $scope.failureMessage = request.data.response
                }
            });
            
        }
   }


   var validPassword = function(){
        if(!$scope.register.password || $scope.register.password.length < 6){
            $scope.failureMessage = "Password must be at least 6 characters"
            return false
        }
        
        else if($scope.register.password !== $scope.passwordCheck){   
            $scope.failureMessage = "The passwords don't match"
            return false
        }
        else{
            return true
        }
   }

   var validEmail = function(){
        if(!$scope.register.email || !$scope.registerForm.emailInput.$valid){
            $scope.failureMessage = "The email address provided is invalid"
            return false
        }
        return true
   }

   var validFirstName = function(){
        if(!$scope.register.firstName || $scope.register.firstName.length < 1){
            $scope.failureMessage = "Please enter your first name."
            return false
        }
        return true
   }

   var validLastName = function(){
        if(!$scope.register.lastName || $scope.register.lastName.length < 1){
            $scope.failureMessage = "Please enter your last name."
            return false
        }
        return true
   }

}]);
app.controller('selectProjectController', ['$scope', '$cookies', '$location', 'postRequestService', function($scope, $cookies, $location, postRequestService){
    postRequestService.request('/api/project/get/user').then(function(request){
        $scope.projects = request.data.response
    });

    $scope.select = function(projectId){
        var now = new Date()
        var oneYear = new Date(now.getFullYear()+1, now.getMonth(), now.getDate());
        $cookies.put('project', projectId, {'expires': oneYear})
        $location.url('/')
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
app.controller('sprintController', ['$scope', '$location', '$cookies', 'postRequestService', function($scope, $location, $cookies, postRequestService){
    
    postRequestService.request('/api/sprint/get/current_with_cards/project/' +$cookies.get('project')).then(function(request){
        $scope.sprint = request.data.response
    })


    $scope.addCardPrompt = false;
    $scope.addCard = function(){
        $scope.addCardPrompt = true;
    }
}]);