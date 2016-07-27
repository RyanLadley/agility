app.service('toggleService', function(){
    this.toggle = function(bool){
        return !bool;
    }
});