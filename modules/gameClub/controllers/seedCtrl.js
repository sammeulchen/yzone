/**
 * Created by Administrator on 2017/3/29 0029.
 */
app.controller('seedCtrl', function ($scope,GameInfo,$stateParams,$state,$rootScope,$http,$ionicPopup,$window) {
    $scope.projectId = $stateParams.projectId
    $scope.competitionId = $window.sessionStorage.competitionId
    $scope.seeds = GameInfo.seedCount
    console.log($scope.seeds)
    //增加种子
    $scope.addSeed = function () {
        $scope.seedCodeNum = $scope.seeds.length + 1
        $rootScope.seedCodeNum = $scope.seedCodeNum
        $state.go('setSeed',{projectId:$scope.projectId})
    }
    //删除种子
    $scope.deleteSeed = function (index) {
        $scope.seeds.splice(index,1)
    }
    //替换种子
    $scope.replaceSeed = function (index) {
        $rootScope.seedIndex = index
        $rootScope.seedCodeNum = index + 1
        $state.go('setSeed',{projectId:$scope.projectId})
       // $scope.seeds[index] =
    }
    //提交种子
    $scope.submitSeed = function () {
        console.log($scope.seeds)
        $http({
            url:SITE_SUFFIX+'api/club/competition/group/addSeed',
            method:'post',
            headers:{ "Content-Type": "application/json" },
            data:angular.toJson($scope.seeds)
        }).success(function (response) {
            if(response.result != 0){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: response.message,
                    okText:'确定'
                });
                return
            }
            $http.get(SITE_SUFFIX+'api/club/competition/group/drawlog/'+$scope.projectId).success(function (response) {
                if(response.result != 0){
                    var alertPopup = $ionicPopup.alert({
                        title: '提示信息',
                        template: response.message,
                        okText:'确定'
                    });
                    return
                }
                $state.go('clubGradeGroup')
            })
        })
    }
    //返回
    $scope.backToPre = function () {
        $state.go('GameDetailsAdmin',{competitionId:$scope.competitionId})
    }
})