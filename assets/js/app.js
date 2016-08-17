var demoApp = angular.module('demoApp', []);


demoApp.directive("ngFileSelect",function(){
  return {
    link: function($scope,el){
      
      el.bind("change", function(e){
        console.log("$scope",$scope);
        $scope.file = (e.srcElement || e.target).files[0];
        var reg = /\/(png|jpeg|jpg|gif)$/;
        if(!reg.test($scope.file.type)){
          $scope.getFile("Image of (png, jpeg, jpg, gif) format is accepted.");
        }
        else if($scope.file.size>5000000){
          $scope.getFile("Image less then 5 Mb is accepted.");
        }
        else{
            $scope.getFile();
        }
      })
      
    }
    
  }
});