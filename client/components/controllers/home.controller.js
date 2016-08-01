app.controller('homeController', function($scope){

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

});