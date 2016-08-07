app.controller('homeController', function($scope, postRequestService){

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

});