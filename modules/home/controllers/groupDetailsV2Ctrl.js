/**
 * Created by Administrator on 2016/12/23 0023.
 */
app.controller('groupDetailsV2Ctrl', function ($scope,$state,$http,$stateParams,$ionicSlideBoxDelegate,$window,PaymentOrder,$ionicPopup,$ionicLoading) {
    $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        noBackdrop:true
    });
    $scope.competitionId = $stateParams.competitionId
    $ionicSlideBoxDelegate.update();
    var order = null
    PaymentOrder.addOrder(order)
    var location = SITE_SUFFIX+'groupDetails_v2/'+$scope.competitionId
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
        /*if (data.result == 1009) {
            return
        }*/
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
    $http.get(SITE_SUFFIX + 'api/competition/detail/' + $scope.competitionId).success(function (response) {
        console.log(response)
        $ionicLoading.hide()
        if(response.result !=0 && response.result != 5){
            return;
        }
        if(response.result == 5){
            window.location.href = 'http://wx.tianqutiyu.com/wx'
        }
        $scope.applyEnd = response.message.applyEnd
        $scope.applyCount = response.message.applyCount
        $scope.allowSignup = response.message.allowSignup
        $scope.competitions = response.message.competition;
        $scope.zhibos = $scope.competitions.liveUrl
        $scope.stadium = response.message.stadium

        var price = $scope.competitions.price
        var price2 = $scope.competitions.price2
        PaymentOrder.addPrice(price)
        PaymentOrder.addPrice2(price2)
        $scope.events = response.message.groupClass;
        $scope.tips = response.message.tips
        $scope.timeSecduleUrl = response.message.timeSecduleUrl
        //点击轮播内容跳转
        $scope.goToTips = function (url) {
            $window.location.href = url;
        }
        // 打开地图
        $scope.geo = $scope.stadium.geo.split(',')

        $scope.toLocation = function() {
            wx.ready(function() {
                wx.openLocation({
                    latitude: parseFloat($scope.geo[1]),
                    longitude: parseFloat($scope.geo[0]),
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
                link : window.location.href, // 分享链接
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
    //页面切换
    $scope.tabNames = ['详情','赛况','照片','直播']
    $scope.slectIndex = 0
    $scope.activeSlide=function(index){//点击时候触发
        $scope.slectIndex=index;
    };
    $scope.pages=["modules/home/templates/tab01.html","modules/home/templates/tab02.html?v=2017","modules/home/templates/tab03.html?v=2017","modules/home/templates/tab04.html?v=2017"];
    //项目的隐藏显示
    $scope.unfoldShow = false;
    $scope.eventsShow = true;
    $scope.packUpShow = true;
    $scope.packUp = function () {
        $scope.unfoldShow = true;
        $scope.eventsShow = false;
        $scope.packUpShow = false;
    }
    $scope.unfold = function () {
        $scope.unfoldShow = false;
        $scope.eventsShow = true;
        $scope.packUpShow = true;
    }

    // 跳转到已报名队员列表
    $scope.toPlayerslist = function(projectId) {
        $state.go('playersList', { projectId : projectId})
    }
    //立即报名
    $scope.toUerReg = function (id,type) {
        if(type==1){
            $state.go('groupUserReg',{competitionId:id})
        }
        if(type==2){
            $state.go('userReg',{competitionId:id})
        }

    }
    //跳转到我的项目
    $scope.toUerProject = function (id,type) {
        console.log(112312)
        $state.go('myProjects',{competitionId:id})
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

    //照片部分Js
    //获取热门图片
    $http({
        url:SITE_SUFFIX+'api/competition/photo/hot',
        method:'get',
        params:{competitionId:$scope.competitionId}
    }).success(function (response) {
        console.log(response)
        if(response.result != 0){
            return;
        }
        $scope.hotPhotoLists = response.message
    })
    //全部图片
    $http({
        url:SITE_SUFFIX+'api/competition/photo/list',
        method:'get',
        params:{competitionId:$scope.competitionId}
    }).success(function (response) {
        console.log(response)
        if(response.result != 0){
            return;
        }
        $scope.photoLists = response.message
    })

    //查看全部图片
    $scope.toAllPictures = function () {
        $window.sessionStorage.competitionDate =$scope.competitions.comptitionDate
        $state.go('allPictures',{competitionId:$scope.competitionId})
    }

    //查看照片详情
    $scope.toPhotoDetails = function (photoId) {
        $window.sessionStorage.competitionDate =$scope.competitions.comptitionDate
        $state.go('photoDetails',{photoId:photoId})
    }

    $scope.toPlat = function (url) {
        if(url == ""){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '直播暂未开始，敬请期待～',
                okText:'确定'
            });
        }else{
            window.location.href = url
        }

    }




})
app.stateProvider
    /*.state('playersList', {
        url: '/playersList/:projectId',
        cache:false,
        templateUrl: 'modules/home/templates/playersList.html',
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'modules/home/css/playersList.css',
                    'modules/home/controllers/playersListCtrl.js'
                ]);
            }]
        }
    })*/
