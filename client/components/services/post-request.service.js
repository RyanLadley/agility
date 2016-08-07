app.service('postRequestService', function($http){

    //Http post request wrapper to send data to api.
    this.request = function(url, payload) {
        var form = new FormData()
        form.append("payload", JSON.stringify(payload))

        return $http.post(url, form, {
            withCredentials : false,
            headers : {
                'Content-Type' : undefined
            },
            transformRequest : angular.identity
        }).then(
        function(success){
            console.log(success);
            return success;
        }, 
        //Error
        function(error){
            console.log("postRequest: Error");
        });
    };
});