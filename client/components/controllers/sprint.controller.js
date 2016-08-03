app.controller('sprintController', function($scope){
    
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

});