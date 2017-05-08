/**
 * Created by Administrator on 2017/3/23 0023.
 */
app.controller('setLevelCtrl', function ($scope,$state,$rootScope,$stateParams,$http,$window,$ionicLoading,$ionicPopup) {

    //获取用户等级
    $http({
        url:SITE_SUFFIX+'api/competition/profile/get',
        method:'get'
    }).success( function (response) {
        console.log(response)
        $scope.members = response.message
    })
    //跳转到给自己定级
    $scope.toOwnRanking1 = function () {
        $rootScope.singleLvel = 1
        $state.go('ownRanking')
    }
    $scope.toOwnRanking2 = function () {
        $rootScope.singleLvel = 2
        $state.go('ownRanking')
    }
    //判断羽众申明状态
    $scope.isDisabled = true;
    $scope.changeStates = function () {
        if($scope.isDisabled == true) {
            $scope.isDisabled = false;
        }else{
            $scope.isDisabled = true;
        }
    }
    //查看羽众免责声明
    $scope.toDisclaimer = function () {
        $state.go('disclaimer')
    }
    //提交报名信息
    $scope.projectId = $window.sessionStorage.pjId
    $scope.projectId = $stateParams.projectId
    $scope.toRegSuccess = function () {
        $http({
            url: SITE_SUFFIX + 'api/club/comopetition/member/appy',
            method: 'post',
            params: {projectId: $scope.projectId}
        }).success(
            function (res) {
                $ionicLoading.hide()
                if (res.result != 0) {
                    var alertPopup = $ionicPopup.alert({
                        title: '提示信息',
                        template: res.message,
                        okText: '确定'
                    });
                    return
                }
                $state.go('clubMyProject',{projectId:$scope.projectId})
            }
        )
    }
})