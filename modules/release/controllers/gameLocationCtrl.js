/**
 * Created by Administrator on 2016/8/14 0014.
 */
app.controller('gameLocationCtrl',function($scope,$state,$http) {
    //获取省列表

    $http.get('http://wechat.banmi.me/api/dic/province/list').success(
        function(response){
            $scope.provinces = response.message;
            console.log(response)
          /*  $scope.selectProvince = ;*/

        }
    )
    var proviceNo = {}
    $scope.changeProvince = function(){
        proviceNo.proviceNo = $scope.selectProvince.id;
        console.log($scope.selectProvince)
        $http({
            url:'http://wechat.banmi.me/api/dic/city/list',
            method:'post',
            params:proviceNo
        }).success(
            function (response) {
                console.log(response)
                $scope.cities = response.message
            }
        )
    }
    var cityNo = {};
    $scope.changeCity = function () {
        cityNo.cityNo = $scope.selectCity.cityNo;
        $http({
            url:'http://wechat.banmi.me/api/dic/area/list',
            method:'post',
            params:cityNo
        }).success(
            function (response) {
                console.log(response)
                $scope.areaes = response.message;
            }
        )
    }


    //获取市列表
   /* var proviceNo= {};

    $http({
        url:'http://wechat.banmi.me/api/dic/city/list',
        method:'post'
        *//*params:$scope.provinces.*//*
    }).success(
        function (response) {
            console.log(response)
        }
    )*/
})