app.controller('cardDetailsController', function($scope, $routeParams, postRequestService){
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
        console.log($scope.updatedSteps)
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

});