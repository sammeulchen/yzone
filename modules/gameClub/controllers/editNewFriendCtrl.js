/**
 * Created by Administrator on 2017/3/27 0027.
 */
app.controller('editNewFriendCtrl', function ($scope,$rootScope,$stateParams,$state,GameInfo,$ionicPopup,$http,$window) {
    $scope.competitionId = $window.sessionStorage.competitionId
    $scope.projectId = $stateParams.projectId
    $scope.userInfo = $scope
    $scope.userInfo.realname = $window.sessionStorage.nickName
    console.log($scope.userInfo.realname)
    $scope.userInfo.mobile = $window.sessionStorage.mobile
    if($scope.userInfo.mobile == null){
        $scope.userInfo.mobile = ''
    }
    $scope.sexs = [
        {id:1,text:'男'},
        {id:0,text:'女'}
    ]

    $scope.selectSex = $scope
    $scope.singleLevel = GameInfo.singleLevel
    $scope.doubleLevel = GameInfo.doubleLevel


    var gender = $window.sessionStorage.gender
    if(gender == null){
        gender = 1
    }
    for(var i in $scope.sexs){
        $scope.selectSex.sex=$scope.sexs[0];
    }
    $scope.changeSex = function () {
        gender = $scope.selectSex.sex.id
    }

    //跳转设定等级
    $scope.toOwnRanking1 = function () {
        $window.sessionStorage.nickName = $scope.userInfo.realname
        $window.sessionStorage.gender = gender
        $window.sessionStorage.mobile = $scope.userInfo.mobile
        $rootScope.singleLvel = 1
        $rootScope.user = false
        $state.go('ownRanking')
    }
    $scope.toOwnRanking2 = function () {
        $window.sessionStorage.nickName = $scope.userInfo.realname
        $window.sessionStorage.gender = gender
        $window.sessionStorage.mobile = $scope.userInfo.mobile
        $rootScope.singleLvel = 2
        $rootScope.user = false
        $state.go('ownRanking')
    }
    //提交手动填写的信息

    $scope.submitInfo = {}
    $scope.submitUserInfo = function(){
        //projectId
        $scope.submitInfo.projectId = $scope.projectId

        //昵称
        $scope.submitInfo.nickName = $scope.userInfo.realname;
        if($scope.submitInfo.nickName == null || $scope.submitInfo.nickName == ""){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '昵称不能为空',
                okText:'确定'
            });
            return;
        }

        //性别
        $scope.submitInfo.gender = gender

        //电话
        $scope.submitInfo.mobile = $scope.userInfo.mobile

        var telReg = /^1[3|4|5|7|8]\d{9}$/
        if ($scope.submitInfo.mobile == null || $scope.submitInfo.mobile == "") {
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '电话号码不能为空',
                okText:'确定'
            });
            return
        }
        if (!telReg.test($scope.submitInfo.mobile)) {
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请填写正确的电话号码',
                okText:'确定'
            });
            return
        }
        //单打等级
        $scope.submitInfo.sLevel = $scope.singleLevel
        if($scope.submitInfo.sLevel == null){

            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请设置单打级别',
                okText:'确定'
            });
            return;
        }
        //双打等级
        $scope.submitInfo.dLevel = $scope.doubleLevel
        if($scope.submitInfo.dLevel == null){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请设置双打级别',
                okText:'确定'
            });
            return;
        }
        console.log($scope.submitInfo)
        $http({
            url:SITE_SUFFIX+'api/club/comopetition/member/addByManal',
            method:'post',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify($scope.submitInfo)
        }).success(function (response) {
            if(response.result != 0){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: response.message,
                    okText:'确定'
                });
                return;
            }
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: response.message,
                okText:'确定'
            });
            alertPopup.then(function(res) {
                $state.go('GameDetailsAdmin',{competitionId:$scope.competitionId})
            });
        })
    }
})