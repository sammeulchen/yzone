/**
 * Created by Administrator on 2017/3/20 0020.
 */
app.controller('locationListCtrl', function ($scope,$state,$http,GameInfo,$ionicPopup,$window) {
    $http.get(SITE_SUFFIX+'api/club/stadium/list').success(function (response) {
        console.log(response)
        if(response.result != 0){
            return;
        }
        $scope.locationLists = response.message;
        //删除
        $scope.deleteLocation = function (locationId,index) {
            var confirmPopup = $ionicPopup.confirm({
                title: '提示信息',
                template: '你确定删除该场馆信息吗?',
                okText:'确定',
                cancelText:'取消'
            });
            confirmPopup.then(function(res) {
                if(res) {
                    $http({
                        url:SITE_SUFFIX+'api/club/stadium/delete/'+locationId,
                        method:'post'
                    }).success(function (response) {
                        console.log(response)
                        if(response.result != 0){
                            return
                        }
                        $scope.locationLists.splice(index,1)
                    })

                }
            });
        }
    })
    $scope.toAddLocation = function () {
        $state.go('addLocation')

    }
    
    $scope.stadium = $scope
    $scope.getStadiumId = function () {
        if($scope.stadium.stadiumId == null){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请选择比赛场馆',
                okText:'确定'
            });
            return;
        }
        GameInfo.addStadiumId($scope.stadium.stadiumId.id)
        GameInfo.addStadium($scope.stadium.stadiumId.name)
        $window.history.back()

    }
})