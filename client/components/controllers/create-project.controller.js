app.controller('createProjectController', function($scope, $location, $cookies, postRequestService){
    
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
});