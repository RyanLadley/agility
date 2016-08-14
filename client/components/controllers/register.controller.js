app.controller('registerController', function($scope, $cookies, $location, postRequestService){
    $scope.register = {}
   $scope.submit = function(){

        if(validEmail() && validFirstName() && validLastName() && validPassword() ){

            postRequestService.request("/api/admin/register", $scope.register).then(function(request){
                if(request.data.status === "success"){
                    $location.url('/create/project')
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

});