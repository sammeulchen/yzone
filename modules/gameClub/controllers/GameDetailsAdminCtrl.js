/**
 * Created by Administrator on 2017/3/23 0023.
 */
app.controller('GameDetailsAdminCtrl', function ($scope,$state,$http,$stateParams,$ionicSlideBoxDelegate,$window,$ionicPopup,$ionicLoading) {
    $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        noBackdrop:true
    });
    $scope.competitionId = $stateParams.competitionId
    $ionicSlideBoxDelegate.update();
    //分享
    $scope.toShare = function () {
        window.location.href = SITE_SUFFIX+'api/club/competition/share/'+$scope.competitionId
    }
    var location = SITE_SUFFIX+'GameDetailsAdmin/'+$scope.competitionId
    console.log(location)
    $http({
        url: SITE_SUFFIX + 'api/wxApi/jsapi',
        method:'get',
        params:{referer:location}
    }).success(function(data) {
        if (data.result != 0) {
            alert(data.message);
            return;
        }
        if (data.result == 1009) {
            return
        }
        var result = data.message

        wx.config({
            debug: false,
            appId: result.appId,
            timestamp: result.timestamp,
            nonceStr: result.nonceStr,
            signature: result.signature,
            jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'translateVoice', 'startRecord', 'stopRecord',
                'onVoiceRecordEnd', 'playVoice', 'onVoicePlayEnd', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'closeWindow']

        });
    })
    //获取比赛数据
    var getInfo = function () {
        $http.get(SITE_SUFFIX + 'api/club/competition/get/' + $scope.competitionId).success(function (response) {
            $ionicLoading.hide()
            console.log(response)
            if(response.result !=0 && response.result != 5){
                return;
            }
            if(response.result == 5){
                window.location.href = 'http://wx.tianqutiyu.com/wx'
            }
            $scope.competitions = response.message.competition;
            $scope.tips = response.message.tips
            $scope.stadium = response.message.stadium
            $scope.classLevel = response.message.classLevel
            $scope.currentCount = response.message.currentCount
            $scope.allowMaxCount = response.message.allowMaxCount
            $scope.playerLists = response.message.applyerList
            $scope.projectId = response.message.projectId
            $scope.operation = response.message.operation
            //点击轮播内容跳转
            $scope.goToTips = function (url) {
                $window.location.href = url;
            }
            // 打开地图
            $scope.geo = $scope.stadium.geo
            $scope.toLocation = function() {
                wx.ready(function() {
                    wx.openLocation({
                        latitude: parseFloat($scope.geo.split(',')[1]),
                        longitude: parseFloat($scope.geo.split(',')[0]),
                        name: $scope.stadium.name,
                        address: $scope.stadium.stadiumAddress,
                        scale: 14,
                        infoUrl: 'www.tianqutiyu.com',
                        success: function (res) {
                            console.log(res)
                        },
                        fail: function (res) {
                            console.log(res)
                        }
                    });
                })
            };
            wx.ready(function() {

                var params = {
                    title : $scope.competitions.name + '比赛要开始啦，小伙伴们赶紧报名吧', // 分享标题
                    desc : '羽众—一个好玩的羽毛球赛事平台',
                    link : SITE_SUFFIX+'api/club/competition/share/'+$scope.competitionId, // 分享链接
                    imgUrl : 'http://img.tianqutiyu.com/logo.jpg', // 分享图标
                    success : function() {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel : function() {
                        // 用户取消分享后执行的回调函数
                    }
                };

                wx.onMenuShareTimeline(params);
                wx.onMenuShareAppMessage(params);
                wx.onMenuShareQQ(params);
                wx.onMenuShareWeibo(params);
                wx.onMenuShareQZone(params);

            });
            //console.log(typeof ($scope.applyEnd ))
        })
    }
    getInfo()
    //页面切换
    $scope.tabNames = ['详情','赛况']
    $scope.slectIndex = 0
    $scope.activeSlide=function(index,projectId,competitionId){//点击时候触发
        $scope.slectIndex=index;
        if(index ==1){
            $window.sessionStorage.pjId = projectId
            $window.sessionStorage.competitionId = competitionId
            $state.go('userGradeGroup')
        }
    };
    $scope.pages=["modules/gameClub/templates/GameDescAdmin.html?v=0.1","modules/gameClub/templates/clubGameAction.html"];


    //立即报名
    $scope.toUerReg = function (id,type,pjId) {
        /*if(type==1){
         $state.go('groupUserReg',{competitionId:id})
         }
         if(type==2){
         $state.go('userReg',{competitionId:id})
         }*/

        $window.sessionStorage.pjId = pjId
        $state.go('clubUserReg')
    }
    //跳转到我的项目
    $scope.toUerProject = function (id,type) {
        $state.go('clubMyProject',{competitionId:id})
    }
    //跳转到成绩详情
    $scope.toGroupPerDetails = function (projectId) {
        $window.sessionStorage.projectId = projectId
        $window.sessionStorage.competitionId = $scope.competitionId
        $state.go('groupPerDetails')
    }
    //跳转到时间详情
    $scope.toTimeUrl = function(){
        window.open($scope.timeSecduleUrl[1])
    }
    //跳转到全部报名人员列表
    $scope.toClubAllPlayers = function (pjId) {
        $window.sessionStorage.pjId = pjId
        $window.sessionStorage.competitionId = $scope.competitionId
        $state.go('allPlayersAdmin',{projectId:pjId})
    }
    //选择搭档
    $scope.toSelectPartner = function(){
        $state.go('clubAllPlayers')
    }
    //跳转到修改比赛信息
    $scope.toChangeGameInfo = function () {
        $state.go('changeGameInfo',{competitionId:$scope.competitionId})
    }
    //代报名
    $scope.toAddPartner = function (pjId) {
        $window.sessionStorage.competitionId = $scope.competitionId
        $state.go('addBallFriend',{projectId:pjId})
    }
    //裁判
    $scope.toReferee = function () {
        $state.go('referee',{competitionId:$scope.competitionId})
    }
    //匹配搭档
    $scope.toMatchPartner = function (pjId) {
        $window.sessionStorage.competitionId = $scope.competitionId
        $state.go('matchPartner',{projectId:pjId})
    }
    //分组
    $scope.toGrouping = function (pjId) {
        $window.sessionStorage.competitionId = $scope.competitionId
        $window.sessionStorage.pjId = pjId
        $state.go('grouping',{projectId:pjId})
    }
    //设置种子
    $scope.toSetSeed = function (pjId) {
        $window.sessionStorage.competitionId = $scope.competitionId
        $window.sessionStorage.pjId = pjId
        $state.go('seed',{projectId:pjId})
    }
    //submit分组
    $scope.toGroupSetting = function (pjId) {
        $http.get(SITE_SUFFIX+'api/club/competition/group/drawlog/'+pjId).success(function (response) {
            if(response.result != 0){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: response.message,
                    okText:'确定'
                });
                return
            }
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: response.message,
                okText:'确定'
            });
            getInfo()
            //$state.go('GameDetailsAdmin',{competitionId:$scope.competitionId})
        })
    }
    $scope.toClubGroupGrade = function (projectId) {
        $window.sessionStorage.pjId = projectId
        $window.sessionStorage.pageType = 1
        $state.go('clubGradeGroup')
    }


    //返回
    $scope.backToPre = function () {
        $state.go('createGameDetails')
    }

    //取消比赛
    $scope.cancelGame = function () {
        var confirmPopup = $ionicPopup.confirm({
            template: '您将取消本次比赛',
            okText:'确定',
            cancelText:'取消'
        });
        confirmPopup.then(function(res) {
            if(res) {
                $http.get(SITE_SUFFIX+'api/club/competition/cancel/'+$scope.competitionId).success(function (response) {
                    console.log(response)
                    if(response.result != 0){
                        var alertPopup = $ionicPopup.alert({
                            title: '提示信息',
                            template: response.message,
                            okText:'确定'
                        });
                        return;
                    }
                    $state.go('createGameDetails')
                })
            }
        });
    }

})