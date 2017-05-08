/**
 * Created by Administrator on 2016/11/17 0017.
 */
app.controller('singleRankingCtrl', function ($scope,$state,$http,$window) {
    $scope.rankUpdownShow = false
    $scope.rankshowDetails1 = false
    $scope.rankshowDetails2 = false
    $scope.rankshowDetails3 = false
    $scope.rankshowDetails4 = false
    $scope.rankshowDetails5 = false
    $scope.rankshowDetails7 = false
    $scope.rankshowDetails8 = false
    $scope.rankshowDetails9 = false
    $http({
        url:SITE_SUFFIX+'api/ucenter/userRankInfo',
        method:'get',
        params:{category:1}
    }).success(function (response) {
        console.log(response)
        if(response.result != 0) {
            return
        }

        $scope.userMsg = response.message

        //排名升降
        if($scope.userMsg.updown < 0 ){
            $scope.rankUpdownShow = true
            $scope.userMsg.updown = '下降'+ Math.abs($scope.userMsg.updown)
        }
        if($scope.userMsg.updown > 0 ){
            $scope.rankUpdownShow = true
            $scope.userMsg.updown = '上升'+ Math.abs($scope.userMsg.updown)
        }
        if($scope.userMsg.updown  = 0){
            $scope.rankUpdownShow = false
        }

        //图标显示
        if($scope.userMsg.parentLvel == '风级'){
            $scope.userMsg.picUrl = 'wind-white.gif'
        }
        if($scope.userMsg.parentLvel == '林级'){
            $scope.userMsg.picUrl = 'forest-white.gif'
        }
        if($scope.userMsg.parentLvel == '火级'){
            $scope.userMsg.picUrl = 'fire-white.gif'
        }
        if($scope.userMsg.parentLvel == '山级'){
            $scope.userMsg.picUrl = 'mount-white.gif'
        }

        //设置名次积分显示部分背景
        $scope.setBg = function (parentLvel) {
            var p = ""
            if(parentLvel == '风级'){
                p = '#00A0E9'
            }
            if(parentLvel == '林级'){
                p = '#00A040'
            }
            if(parentLvel == '火级'){
                p = '#D6000F'
            }
            if(parentLvel == '山级'){
                p = '#43403F'
            }
            return {"background":p}
        }

        //判断下部分显示情况
        if($scope.userMsg.allowAuthBtn){
            $scope.rankShowDetails1 = true
        }else{
            $scope.rankShowDetails1 = false
        }
        if($scope.userMsg.allowAuthStatusLabel == true){
            $scope.rankshowDetails2 = true
        }else{
            $scope.rankshowDetails2 = false
        }
        if($scope.userMsg.allowEditLevelBtn == true){
            $scope.rankshowDetails3 = true
        }else{
            $scope.rankshowDetails3 = false
        }
        if(!$scope.userMsg.allowAuthBtn && !$scope.userMsg.allowAuthStatusLabel && !$scope.userMsg.allowAuthStatusLabel){
            $scope.rankshowDetails5 = true
            $scope.rankshowDetails4 = false
        }else{
            $scope.rankshowDetails5 = false
            $scope.rankshowDetails4 = true
        }

        //判断提示信息显示情况
        if($scope.userMsg.isLevelAdminSet == true){
            $scope.rankshowDetails7 = true
        }else{
            $scope.rankshowDetails7 = false
        }

        if($scope.userMsg.allowLevelChange == true){
            $scope.rankshowDetails8 = true
        }else{
            $scope.rankshowDetails8 = false
        }

        //是否降级
        $scope.downRank = function () {
            $http({
                url: SITE_SUFFIX + 'api/ucenter/level/op',
                method: 'post',
                params: {category: 1, op: 2}
            }).success(function (response) {
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: response.message,
                    okText: '确定'
                });
            })
        }

        //是否升级
        $scope.downRank = function () {
            $http({
                url:SITE_SUFFIX+'api/ucenter/level/op',
                method:'post',
                params:{category:1,op:4}
            }).success(function (response) {
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: response.message,
                    okText:'确定'
                });
            })
        }

        //留在该级
        $scope.notDownRank = function () {
            $http({
                url:SITE_SUFFIX+'api/ucenter/level/op',
                method:'post',
                params:{category:1,op:3}
            }).success(function (response) {
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: response.message,
                    okText:'确定'
                });
                if(response.result == 0){
                    $scope.rankshowDetails8 = false
                }
            })
        }
        //同意该级
        $scope.agreeRank = function () {

            $http({
                url:SITE_SUFFIX+'api/ucenter/level/op',
                method:'post',
                params:{category:1,op:1}
            }).success(function (response) {
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: response.message,
                    okText:'确定'
                });
                if(response.result == 0){
                    $scope.rankshowDetails7 = false
                }
            })

        }

    })


    //跳转到积分规则
    $scope.toYZRank = function () {
        $state.go('YZRank')
    }

    //获取积分记录
    $http({
        url:SITE_SUFFIX+'api/ucenter/scoreHistory',
        method:'get',
        params:{category:1}
    }).success(function (response) {
        console.log(response)
        if(response.result == 0){
            $scope.historyLists = response.message
            for(var i=0;i<$scope.historyLists.length;i++){
                if($scope.historyLists[i].inout == 1){
                    $scope.historyLists[i].inout = "+"
                }
                if($scope.historyLists[i].inout == 2){
                    $scope.historyLists[i].inout = "-"
                }
            }
        }

    })

    //升降级
    $http({
        url:SITE_SUFFIX+'api/ucenter/level/enableUpDown',
        method:'get',
        params:{category:1}
    }).success(function (response) {
        console.log(response)
        $scope.result = response.result
        $scope.tipsMsg = response.message
        if(response.result == 20005){
            $scope.rankshowDetails9 = true
        }
        if(response.result == 20004){
            $scope.rankshowDetails7 = true
        }
    })
})