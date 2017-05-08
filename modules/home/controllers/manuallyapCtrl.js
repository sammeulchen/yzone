/**
 * Created by Administrator on 2017/1/6 0006.
 */
app.controller('manuallyapCtrl',function($scope,$state,$http){
    $scope.sexs = [
        {id:1,text:'男'},
        {id:0,text:'女'}
    ]
    $scope.selectSex = $scope
    var gender = 1
    for(var i in $scope.sexs){
        $scope.selectSex.sex=$scope.sexs[0];
    }
    $scope.changeSex = function () {
        gender = $scope.selectSex.sex.id
    }
})