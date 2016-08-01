app.controller('cardDetailsController', function($scope){
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
        description: "Mattis a semper rutrum in in blandit adipiscing ornare commodo vitae at erat vivamus fringilla maecenas in "
                    +"scelerisque platea auctor.Habitasse vestibulum.",
        steps: [{task: "Do the thing", assigned: "Unknown", status: "Open"}, {task: "Review the thing",  assigned: "Unknown", status: "Open"},
            {task: "Test the thing",  assigned: "Unknown", status: "Open"},{task: "Do a much longer thing to take up space and turn it in", assigned: "Unknown", status: "Open"},]
    }
});