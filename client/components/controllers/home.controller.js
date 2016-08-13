app.controller('homeController', function($scope, $cookies, postRequestService){

    $scope.discussion = [
    {
        cardIndex: 'abc-123',
        cardName: "First Card",
        cardType: "Standard",
        user: "Chuch Jones",
        message: "Te pro legimus gloriatur referrentur, altera impedit gloriatur eu quo, admodum consulatu id vim. Eu homero tempor eos, mea laoreet consetetur an. Vim diam oporteat moderatius ad. Mei cu mundi fabellas, usu mundi sanctus albucius ea. Eam at aeque erroribus omittantur, eam simul mediocritatem no, nulla dicant ornatus eu mei."
    },
    {
        cardIndex: 'abc-456',
        cardName: "A longer Title",
        cardType: "Standard",
        user: "Lama Lee",
        message: "Te pro legimus gloriatur referrentur, altera impedit gloriatur eu quo, admodum consulatu id vim. Eu homero tempor eos, mea laoreet consetetur an. Vim diam oporteat moderatius ad. Mei cu mundi fabellas, usu mundi sanctus albucius ea. Eam at aeque erroribus omittantur, eam simul mediocritatem no, nulla dicant ornatus eu mei."
    },
    {
        cardIndex: 'abc-789',
        cardName: "Wow, look at this long title.",
        cardType: "Epic",
        user: "Tim Tom",
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
        console.log($scope.sprint)
    })
    
    $scope.confirmSprintClosure = function(){
        var confirmed = confirm("Are you sure you want to close the sprint?\nAny card not closed will be moved to the backlog.")
        if(confirmed){
            ///api/sprint/sprint_id/close/project/project_id
            postRequestService.request('/api/sprint/close/' +$scope.sprint.id + '/project/' +$cookies.get('project')).then(function(success){})
        }

    }

    $scope.displayOpenSprint = false
    $scope.toggleOpenSprint = function(){
        $scope.displayOpenSprint = !$scope.displayOpenSprint
    }
    $scope.logout = function(){
        $cookies.remove('token')
    }

});