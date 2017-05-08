/**
 * Created by Administrator on 2016/11/16 0016.
 */
app.controller('rankCtrl', function ($scope,$state,$http,$window,$rootScope) {

    //跳转到总排名
    $scope.toAllRanking = function () {
        $state.go('allRanking')
    }
    //跳转到单打排名
    /*$scope.toSingleRanking = function () {
        $state.go('record.creditdLog')
    }*/
    //跳转到双打排名
    $scope.toDoubleRanking = function () {
        $state.go('record.creditdLog')
    }

    //跳转到积分规则
    $scope.toYZRank = function () {
        $state.go('YZRank')
    }

    //返回上一页
    $scope.backToPre = function () {
        $state.go("tab.my")
    }






//查看别人资料
    $scope.toBallFriend = function (current,userId) {
        $window.sessionStorage.friendId = userId
        if(current){
            $state.go("tab.my")
        }else{
            $state.go('ballFriend')
        }
    }


})