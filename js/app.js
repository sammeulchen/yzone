/**
 * Created by Administrator on 2016/7/25 0025.
 */
//var SITE_SUFFIX="http://192.168.4.60/";
var SITE_SUFFIX="http://eno.tianqutiyu.com/";
//var SITE_SUFFIX="http://wx.tianqutiyu.com/";

var app = angular.module('yuZoneApp',['ionic', 'oc.lazyLoad', 'ionicLazyLoad', 'tabSlideBox', 'ngCookies', 'ngSanitize','CoderYuan','onezone-datepicker','ionic-timepicker'])
    //go to pre-page
    .run(function ($rootScope,$state,$ionicHistory,$window,$http,$ionicLoading,$ionicPopup,$cookies) {
        $rootScope.goBack = function(){
            $window.history.back();
            $window.history.back()
        };
        $rootScope.goShop = function () {
            $window.open('https://weidian.com/?userid=723031710')
        };



        $rootScope.toHome = function () {
            $state.go('/yzone/tab/home_v2/')
        };

        $rootScope.homeUrl = '#/tab/home_v2/';
        $rootScope.myUrl = '#/tab/my/';
        document.addEventListener('touchstart', function(event) {
            // 判断默认行为是否可以被禁用
            if (event.cancelable) {
                // 判断默认行为是否已经被禁用
                if (!event.defaultPrevented) {
                    event.preventDefault();
                }
            }
        }, false);
        //判断是否是微信浏览器
        /*function isWeiXin(){
            var ua = window.navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                return true;
            }else{
                return false;
            }
        }
        if(!isWeiXin()){
            $state.go(SITE_SUFFIX+'/wx')
        }*/

        //分享
        $http.get(SITE_SUFFIX + 'api/wxApi/jsapi').success(function(data) {
            console.log(data);
            if (data.result != 0) {
                alert(data.message);
                return;
            }
            if(data.result == 1009){
                return
            }
            var result = data.message;

            wx.config({
                debug : false,
                appId : result.appId,
                timestamp : result.timestamp,
                nonceStr : result.nonceStr,
                signature : result.signature,
                jsApiList : ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'translateVoice', 'startRecord', 'stopRecord',
                    'onVoiceRecordEnd', 'playVoice', 'onVoicePlayEnd', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'closeWindow']
            });
            wx.ready(function() {

                var params = {
                    title : '羽众——一个好玩的羽毛球赛事平台', // 分享标题
                    desc : '羽众通过建立风林火山的分级体系，为您提供最优的参赛体验',
                    link : $window.location.href, // 分享链接
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
        });

        //监听路由变化
        $rootScope.$on('$stateChangeStart', function() {
             $ionicLoading.show({
                 content: 'Loading',
                 animation: 'fade-in',
                 noBackdrop:true
             });
           // console.log('changeStart')
         });
         $rootScope.$on('$stateChangeSuccess', function() {
            // console.log('changesuccess')
             $ionicLoading.hide()
         });
        $rootScope.$on('$routeChangeError', function(){
            $ionicLoading.hide()
        });

    })


.config(function ($stateProvider, $locationProvider, $ionicConfigProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {

       // $locationProvider.html5Mode(true).hashPrefix('!');
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('standard');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('bottom');//默认为left

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');


        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.constant = $provide.constant;
        app.value = $provide.value;
        app.stateProvider = $stateProvider;



    $stateProvider

       .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'modules/templates/tabs.html'
        })
        //首页
        .state('tab.home_v2', {
            url: '/home_v2',
            //cache:false,
            views: {
                'tab-home_v2': {
                    templateUrl: 'modules/home/templates/home_v2.html'
                }
            },
            resolve:{
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'modules/home/css/home_v2.css?v=2017021001',
                        'modules/home/controllers/HomeV2Ctrl.js'
                    ]);
                }]
            }
        })
        .state('groupDetails_v2', {
            url: '/groupDetails_v2/:competitionId',
            cache:false,
            templateUrl: 'modules/home/templates/groupDetails_v2.html?v=201612191332',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'modules/home/css/groupDetails_v1.css?v=2017',
                        'modules/home/controllers/groupDetailsV2Ctrl.js?v=20161009110123',
                        'modules/home/services/payment.js'
                    ]);
                }]
            }
        })
        .state('playersList', {
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
        })
        .state('userReg', {
            url: '/userReg/:competitionId',
            cache:false,
            templateUrl: 'modules/home/templates/userReg.html',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'modules/home/css/userReg.css',
                        'modules/home/controllers/userRegCtrl.js',
                        'modules/home/services/payment.js',
                        'modules/home/controllers/noUserInfoCtrl.js',
                        'modules/home/controllers/hasUserInfoCtrl.js'
                    ]);
                }]
            }
        })
        .state('groupUserReg', {
            url: '/groupUserReg/:competitionId',
            cache:false,
            templateUrl: 'modules/home/templates/groupUserReg.html',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'modules/home/css/groupUserReg.css',
                        'modules/home/controllers/groupUserRegCtrl.js'
                    ]);
                }]
            }
        })
        .state('changeUserInfo', {
            url: '/changeUserInfo',
            cache:false,
            templateUrl: 'modules/home/templates/changeUserInfo.html',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'modules/home/css/changeUserInfo.css',
                        'modules/home/controllers/changeUserInfoCtrl.js'
                    ]);
                }]
            }
        })
        .state('selectedProject', {
            url: '/selectedProject/:competitionId',
            cache:false,
            templateUrl: 'modules/home/templates/selectedProject.html',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'modules/home/css/selectedProject.css',
                        'modules/home/controllers/selectedProjectCtrl.js',
                        'modules/home/services/payment.js'
                    ]);
                }]
            }
        })
        .state('pay', {
            url: '/pay/:competitionId',
            cache:false,
            templateUrl: 'modules/home/templates/pay.html',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'modules/home/css/pay.css',
                        'modules/home/controllers/payCtrl.js',
                        'modules/home/services/payment.js'
                    ]);
                }]
            }
        })

        .state('myProjects', {
            url: '/myProjects/:competitionId',
            cache:false,
            templateUrl: 'modules/home/templates/myProjects.html',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'modules/home/css/myProjects.css',
                        'modules/home/controllers/myProjectsCtrl.js',
                        'modules/home/services/payment.js'
                    ]);
                }]
            }
        })
        .state('projectDetails', {
            url: '/projectDetails',
            cache:false,
            templateUrl: 'modules/home/templates/projectDetails.html',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'modules/home/css/projectDetails.css',
                        'modules/home/controllers/projectDetailsCtrl.js',
                        'modules/home/services/payment.js'
                    ]);
                }]
            }
        })
        .state('dPDetails', {
            url: '/dPDetails',
            cache:false,
            templateUrl: 'modules/home/templates/dPDetails.html?v=2017',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'modules/home/css/dPDetails.css',
                        'modules/home/controllers/dPDetailsCtrl.js?v=2017',
                        'modules/home/services/payment.js'
                    ]);
                }]
            }
        })
        .state('changeProject', {
            url: '/changeProject/:competitionId',
            cache:false,
            templateUrl: 'modules/home/templates/changeProject.html',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'modules/home/css/selectedProject.css',
                        'modules/home/controllers/changeProjectCtrl.js',
                        'modules/home/services/payment.js'
                    ]);
                }]
            }
        })
        .state('addPartner_v2', {
            url: '/addPartner_v2/:competitionId',
            cache:false,
            templateUrl: 'modules/home/templates/addPartner_v2.html',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'modules/home/css/addPartner_v2.css',
                        'modules/home/controllers/addPartnerV2Ctrl.js?v=2017'
                    ]);
                }]
            }
        })
        .state('addNewPartner', {
            url: '/addNewPartner/:competitionId',
            cache:false,
            templateUrl: 'modules/home/templates/addNewPartner.html',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'modules/home/css/addPartner_v2.css',
                        'modules/home/controllers/addNewPartnerCtrl.js'
                    ]);
                }]
            }
        })
        .state('manuallyap', {
            url: '/manuallyap',
            cache:false,
            templateUrl: 'modules/home/templates/manuallyap.html',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'modules/home/css/userReg.css',
                        'modules/home/controllers/manuallyapCtrl.js'
                    ]);
                }]
            }
        })
        .state('invite', {
            url: '/invite',
            cache:false,
            templateUrl: 'modules/home/templates/invite.html',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'modules/home/css/invite.css',
                        'modules/home/controllers/inviteCtrl.js',
                        'modules/home/services/payment.js'
                    ]);
                }]
            }
        })
        .state('editPartner', {
            url: '/editPartner/:competitionId',
            cache:false,
            templateUrl: 'modules/home/templates/editPartner.html',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'modules/home/css/userReg.css',
                        'modules/home/controllers/editPartnerCtrl.js'
                    ]);
                }]
            }
        })
        .state('selectedLeader', {
            url: '/selectedLeader/:competitionId',
            cache:false,
            templateUrl: 'modules/home/templates/selectedLeader.html',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'modules/home/css/addPartner_v2.css',
                        'modules/home/controllers/selectedLeaderCtrl.js?v=2017'
                    ]);
                }]
            }
        })
        .state('wxInviteLeader', {
            url: '/wxInviteLeader/:competitionId',
            cache:false,
            templateUrl: 'modules/home/templates/wxInviteLeader.html',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'modules/home/css/wxInviteLeader.css',
                        'modules/home/controllers/wxInviteLeaderCtrl.js?v=2017'
                    ]);
                }]
            }
        })
        .state('inviteLeader', {
            url: '/inviteLeader',
            cache:false,
            templateUrl: 'modules/home/templates/inviteLeader.html',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'modules/home/css/invite.css',
                        'modules/home/css/dPDetails.css',
                        'modules/home/controllers/inviteLeaderCtrl.js',
                        'modules/home/services/payment.js'
                    ]);
                }]
            }
        })
        .state('allPictures', {
            url: '/allPictures/:competitionId',
            cache:false,
            templateUrl: 'modules/home/templates/allPictures.html',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'modules/home/css/allPictures.css',
                        'modules/home/controllers/allPicturesCtrl.js'
                    ]);
                }]
            }
        })
        .state('photoDetails', {
            url: '/photoDetails/:photoId',
            cache:false,
            templateUrl: 'modules/home/templates/photoDetails.html',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'modules/home/css/photoDetails.css',
                        'modules/home/controllers/photoDetailsCtrl.js'
                    ]);
                }]
            }
        })

        .state('allPlayers', {
            url: '/allPlayers/:teamId',
            cache:false,
            templateUrl: 'modules/home/templates/allPlayers.html',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'modules/home/css/allPlayers.css',
                        'modules/home/controllers/allPlayersCtrl.js'
                    ]);
                }]
            }
        })

        //等级介绍
        .state('classIntroduction', {
            url: '/classIntroduction',
            cache:false,
            templateUrl: 'modules/home/templates/classIntroduction.html',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'modules/home/css/classIntroduction.css'
                    ]);
                }]
            }
        })
        //分组、对阵表、成绩
        .state('groupPerDetails',{
            url:'/groupPerDetails',
            cache:false,
            templateUrl:'modules/home/templates/groupPerDetails.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/home/controllers/groupPerDetailsCtrl.js'
                    ])
                }]
            }
        })
        //小组赛
        .state('groupPerDetails.groupMatch', {
            url: '/groupMatch',
            views: {
                'groupPerDetails-groupMatch': {
                    templateUrl: 'modules/home/templates/groupMatch.html?v=201612051610'
                }
            },
            resolve:{
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'modules/home/css/groupPerDetails.css?v=2017022001'
                    ]);
                }]
            }
        })

        //淘汰赛
        .state('groupPerDetails.knockout', {
            url: '/knockout',
            views: {
                'groupPerDetails-knockout': {
                    templateUrl: 'modules/home/templates/knockout.html'
                }
            },
            resolve:{
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'modules/home/css/groupPerDetails.css?v=2017022001',
                        'modules/home/controllers/knockoutCtrl.js'
                    ]);
                }]
            }
        })

        //成绩
        .state('groupPerDetails.groupGrade', {
            url: '/groupGrade',
            views: {
                'groupPerDetails-groupGrade': {
                    templateUrl: 'modules/home/templates/groupGrade.html'
                }
            },
            resolve:{
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'modules/home/css/groupPerDetails.css?v=2017022001',
                        'modules/home/controllers/groupGradeCtrl.js'
                    ]);
                }]
            }
        })
        //查看分组页面
        .state('viewPacket',{
            url:'/viewPacket',
            templateUrl:'modules/home/templates/viewPacket.html',
            resolve:{
                loadCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/home/css/viewPacket.css',
                        'modules/home/controllers/viewPacketCtrl.js'
                    ])
                }]
            }
        })


        //跳转到所属俱乐部页面
        .state('ownedClub', {
            url: '/ownedClub',
            templateUrl: 'modules/home/templates/ownedClub.html',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        /*'modules/home/css/memberReg.css',*/

                         'modules/home/css/ownedClub.css',
                        'modules/home/controllers/ownedClubCtrl.js'
                    ]);
                }]
            }
        })

        .state('tab.shop', {
            url: 'https://weidian.com/?userid=723031710',
            views: {
                'tab-shop': {
                    templateUrl: 'modules/shop/templates/shop.html'
                }
            }
        })

        .state('tab.release',{
            url:'/release',
            views:{
                'tab-release':{
                    templateUrl:'modules/release/templates/release.html'
                }
            },
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/release/css/release.css',
                        'modules/release/controllers/releaseCtrl.js'
                    ])
                }]
            }
        })



        .state('tab.find',{
            url:'/find',
            views:{
                'tab-find':{
                    templateUrl:'modules/find/templates/find.html'
                }
            }
        })

        .state('tab.my',{
            url:'/my',
            cache:false,
            views:{
                'tab-my':{
                    templateUrl:'modules/my/templates/my.html?v=2017021502'
                }
            },
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/my.css?v=2017021503',
                        'modules/my/controllers/myV2Ctrl.js?v=2017021502'
                    ])
                }]
            }
        })
        //跳转到修改个人单独信息
        .state('changeSingleInfo',{
            url:'/changeSingleInfo',
            cache:false,
            templateUrl:'modules/my/templates/changeSingleInfo.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/changeSingleInfo.css?v=2017021401',
                        'modules/my/controllers/changeSingleInfoCtrl.js'
                    ])
                }]
            }
        })

        //修改擅长项目
        .state('goodAtProjects',{
            url:'/goodAtProjects',
            cache:false,
            templateUrl:'modules/my/templates/goodAtProjects.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/changeSingleInfo.css',
                        'modules/my/controllers/goodAtProjectsCtrl.js'
                    ])
                }]
            }
        })

        //跳转到我的证件
        .state('myCode',{
            url:'/myCode',
            cache:false,
            templateUrl:'modules/my/templates/myCode.html?v=2017021501',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/myCode.css?v=2017021501',
                        'modules/my/controllers/myCodeCtrl.js?v=2017021501'
                    ])
                }]
            }
        })
        //跳转到修改证件
        .state('editCode',{
            url:'/editCode',
            cache:false,
            templateUrl:'modules/my/templates/editCode.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/editCode.css?v=2017021501',
                        'modules/my/controllers/editCodeCtrl.js'
                    ])
                }]
            }
        })

        //跳转到给自己定级
        .state('ownRanking',{
            url:'/ownRanking',
            cache:false,
            templateUrl:'modules/my/templates/ownRanking.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/ownRanking.css',
                        'modules/my/controllers/ownRankingCtrl.js',
                        'modules/gameClub/services/releaseGame.js'
                    ])
                }]
            }
        })
        //单打队员列表
        .state('singleRank',{
            url:'/singleRank',
            cache:false,
            templateUrl:'modules/my/templates/singleRank.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/rank.css',
                        'modules/my/controllers/rankCtrl.js',
                        'modules/my/controllers/singleRank1.js'
                    ])
                }]
            }
        })

        //双打队员列表
        .state('doubleRank',{
            url:'/doubleRank',
            cache:false,
            templateUrl:'modules/my/templates/doubleRank.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/rank.css',
                        'modules/my/controllers/rankCtrl.js',
                        'modules/my/controllers/doubleRank1.js'
                    ])
                }]
            }
        })

        //单打排名
        .state('singleRanking',{
            url:'/singleRanking',
            templateUrl:'modules/my/templates/singleRanking.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/allRanking.css',
                        'modules/my/controllers/singleRankingCtrl.js'
                    ])
                }]
            }
        })
        //双打排名
        .state('doubleRanking',{
            url:'/doubleRanking',
            templateUrl:'modules/my/templates/doubleRanking.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/allRanking.css',
                        'modules/my/controllers/doubleRankingCtrl.js'
                    ])
                }]
            }
        })
        //羽众积分规则
        .state('gradeRules',{
            url:'/gradeRules',
            templateUrl:'modules/my/templates/gradeRules.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/gradeRules.css',
                        'modules/my/controllers/gradeRulesCtrl.js'
                    ])
                }]
            }
        })

        //认证级别
            .state('authenticationLevel',{
                url:'/authenticationLevel',
                templateUrl:'modules/my/templates/authenticationLevel.html',
                resolve:{
                    loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load([
                            'modules/my/css/authenticationLevel.css',
                            'modules/my/controllers/authenticationLevelCtrl.js'
                        ])
                    }]
                }
            })
        //在线认证
        .state('rankingOnline',{
            url:'/rankingOnline',
            templateUrl:'modules/my/templates/rankingOnline.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/rankingOnline.css',
                        'modules/my/controllers/rankingOnlineCtrl.js'
                    ])
                }]
            }
        })
        //跳转到谁添加了我
        .state('whoAddMe',{
            url:'/whoAddMe',
            cache:false,
            templateUrl:'modules/my/templates/whoAddMe.html',
            resolve:{
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'modules/my/css/whoAddMe.css',
                        'modules/my/controllers/whoAddMeCtrl.js?v=201609231654'
                    ]);
                }]
            }
        })
        //跳转到创建儿童信息
        .state('createChildInfo',{
            url:'/createChildInfo',
            cache:false,
            templateUrl:'modules/my/templates/createChildInfo.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'css/DateSelector.css',
                        'modules/my/css/createChildInfo.css',
                        'js/DateSelector.js',
                        'modules/my/controllers/createChildInfoCtrl.js'
                    ])
                }]
            }
        })


        //跳转到编辑儿童信息
        .state('editChildInfo',{
            url:'/editChildInfo',
            cache:false,
            templateUrl:'modules/my/templates/editChildInfo.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/editChildInfo.css',
                        'modules/my/controllers/editChildInfoCtrl.js'
                    ])
                }]
            }
        })
        //跳转到儿童证件
        .state('childCode',{
            url:'/childCode',
            cache:false,
            templateUrl:'modules/my/templates/childCode.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/myCode.css?v=20170216',
                        'modules/my/controllers/childCodeCtrl.js'
                    ])
                }]
            }
        })
        //跳转到创建儿童证件
        .state('createChildCode',{
            url:'/createChildCode',
            cache:false,
            templateUrl:'modules/my/templates/createChildCode.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/createCode.css',
                        'modules/my/controllers/createChildCodeCtrl.js'
                    ])
                }]
            }
        })

        //跳转到创建证件
        .state('createCode',{
            url:'/createCode',
            cache:false,
            templateUrl:'modules/my/templates/createCode.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/createCode.css',
                        'modules/my/controllers/createCodeCtrl.js'
                    ])
                }]
            }
        })

        //跳转到验证身份
        .state('verifyIdentity',{
            url:'/verifyIdentity',
            templateUrl:'modules/my/templates/verifyIdentity.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/verifyIdentity.css',
                        'modules/my/controllers/verifyIdentityCtrl.js'
                    ])
                }]
            }
        })

        //跳转到修改登录密码
        .state('loginPassword',{
            url:'/loginPassword',
            templateUrl:'modules/my/templates/loginPassword.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/loginPassword.css',
                        'modules/my/controllers/loginPasswordCtrl.js'
                    ])
                }]
            }
        })

        //跳转到羽众分级积分体系
        .state('YZRank',{
            url:'/YZRank',
            templateUrl:'modules/my/templates/YZRank.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/YZRank.css',
                        'modules/my/controllers/YZRankCtrl.js'
                    ])
                }]
            }
        })

        //跳转到查看球友信息
        .state('ballFriend',{
            url:'/ballFriend',
            cache:false,
            templateUrl:'modules/my/templates/ballFriend.html?v=2017022002',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/ballFriend.css?v=2017022002',
                        'modules/my/controllers/ballFriendCtrl.js'
                    ])
                }]
            }
        })



        //羽众免责声明页面
        .state('disclaimer',{
            url:'/disclaimer',
            templateUrl:'modules/home/templates/disclaimer.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/home/css/disclaimer.css',
                        'modules/home/controllers/disclaimerCtrl.js?v=201609231654'
                    ])
                }]
            }
        })

        ///////////////////////////////////个人中心
        //完善个人信息
        .state('improveInfo',{
            url:'/improveInfo',
            cache:false,
            templateUrl:'modules/my/templates/improveInfo.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/improveInfo.css',
                        'modules/my/controllers/improveInfoCtrl.js'
                    ])
                }]
            }
        })

        //修改个人信息
        .state('changeMyInfo',{
            url:'/changeMyInfo',
            cache:false,
            templateUrl:'modules/my/templates/changeMyInfo.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'css/DateSelector.css',
                        'modules/my/css/changeMyInfo.css',
                        'js/DateSelector.js',
                        'modules/my/controllers/changeMyInfoCtrl.js'
                    ])
                }]
            }
        })
        //积分排名
        .state('rank',{
            url:'/rank',
            templateUrl:'modules/my/templates/rank.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/rank.css',
                        'modules/my/controllers/rankCtrl.js',
                        'modules/my/controllers/allRankCtrl.js',
                        'modules/my/controllers/singleRankCtrl.js',
                        'modules/my/controllers/doubleRankCtrl.js'
                    ])
                }]
            }
        })
        //单打
        .state('rank.singleRank1',{
            url:'/singleRank1',
            cache:false,
            views:{
                'rank-singleRank1':{
                    templateUrl:'modules/my/templates/singleRank1.html'
                }
            },
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/rank.css',
                        'modules/my/controllers/rankCtrl.js',
                        'modules/my/controllers/singleRankCtrl.js'
                    ])
                }]
            }
        })
        //双打
        .state('rank.doubleRank1',{
            url:'/doubleRank1',
            cache:false,
            views:{
                'rank-doubleRank1':{
                    templateUrl:'modules/my/templates/doubleRank1.html'
                }
            },
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/rank.css',
                        'modules/my/controllers/rankCtrl.js',
                        'modules/my/controllers/doubleRankCtrl.js'
                    ])
                }]
            }
        })
        //积分记录
        .state('record',{
            url:'/record',
            templateUrl:'modules/my/templates/record.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/record.css',
                        'modules/my/controllers/recordCtrl.js'
                    ])
                }]
            }
        })
        //积分记录
        .state('record.creditsLog',{
            url:'/creditsLog',
            cache:false,
            views:{
                'record-creditsLog':{
                    templateUrl:'modules/my/templates/creditsLog.html'
                }
            },
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/record.css',
                        'modules/my/controllers/recordCtrl.js',
                        'modules/my/controllers/creditsLogCtrl.js'
                    ])
                }]
            }
        })
        //积分解读
        .state('record.interpretation',{
            url:'/interpretation',
            cache:false,
            views:{
                'record-interpretation':{
                    templateUrl:'modules/my/templates/interpretation.html'
                }
            },
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/record.css',
                        'modules/my/controllers/recordCtrl.js',
                        'modules/my/controllers/interpretationCtrl.js'
                    ])
                }]
            }
        })
        //我的比赛
        .state('myGames',{
            url:'/myGames',
            cache:false,
            templateUrl:'modules/my/templates/myGames.html?v=2017021701',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/myGames.css?v=20170216',
                        'modules/my/controllers/myGamesCtrl.js',
                        'modules/my/controllers/isRegingCtrl.js',
                        'modules/my/controllers/isPlayingCtrl.js?v=2017021701',
                        'modules/my/controllers/isEndCtrl.js'
                    ])
                }]
            }
        })
        //我的球友
        .state('myPartner',{
            url:'/myPartner',
            cache:false,
            templateUrl:'modules/my/templates/myPartner.html?v=2017022001',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/myPartner.css?v=2017022001',
                        'modules/my/controllers/myPartnerCtrl.js'
                    ])
                }]
            }
        })

        //儿童信息
        .state('childrenInfo',{
            url:'/childrenInfo',
            cache:false,
            templateUrl:'modules/my/templates/childrenInfo.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/childrenInfo.css?v=2017021601',
                        'modules/my/controllers/childrenInfoCtrl.js'
                    ])
                }]
            }
        })
        //组织
        .state('myClub',{
            url:'/myClub',
            templateUrl:'modules/my/templates/myClub.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/myClub.css',
                        'modules/my/controllers/myClubCtrl.js?v=2017'
                    ])
                }]
            }
        })
        //我创建的
        .state('myClub.creatingGroup',{
            url:'/creatingGroup',
            cache:false,
            views:{
                'myClub-creatingGroup':{
                    templateUrl:'modules/my/templates/creatingGroup.html'
                }
            },
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/myClub.css',
                        'modules/my/controllers/myClubCtrl.js',
                        'modules/my/controllers/creatingGroupCtrl.js'
                    ])
                }]
            }
        })
        //我加入的
        .state('myClub.joiningGroup',{
            url:'/joiningGroup',
            cache:false,
            views:{
                'myClub-joiningGroup':{
                    templateUrl:'modules/my/templates/joiningGroup.html'
                }
            },
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/myClub.css',
                        'modules/my/controllers/myClubCtrl.js',
                        'modules/my/controllers/joiningGroupCtrl.js'
                    ])
                }]
            }
        })
        //创建团体
        .state('createGroup',{
            url:'/createGroup',
            templateUrl:'modules/my/templates/createGroup.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/createGroup.css',
                        'modules/my/controllers/createGroupCtrl.js'
                    ])
                }]
            }
        })
        //账号管理
        .state('security',{
            url:'/security',
            templateUrl:'modules/my/templates/security.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/security.css',
                        'modules/my/controllers/securityCtrl.js'
                    ])
                }]
            }
        })
        //服务中心
        .state('serviceCenter',{
            url:'/serviceCenter',
            templateUrl:'modules/my/templates/serviceCenter.html?v=2017021501',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/my/css/serviceCenter.css?v=2017021501',
                        'modules/my/controllers/serviceCenterCtrl.js'
                    ])
                }]
            }
        })

        //俱乐部等创建比赛部分

        //创建比赛
        .state('createGame',{
            url:'/createGame',
            templateUrl:'modules/gameClub/templates/createGame.html',
            cache:false,
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/createGame.css',
                        'modules/gameClub/controllers/createGameCtrl.js',
                        'modules/gameClub/services/releaseGame.js'

                    ])
                }]
            }
        })
        .state('writeGameInfo',{
            url:'/writeGameInfo',
            templateUrl:'modules/gameClub/templates/writeGameInfo.html',
            //cache:false,
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/writeGameInfo.css',
                        'css/DateSelector.css',
                        'js/DateSelector.js',
                        'modules/gameClub/controllers/writeGameInfoCtrl.js',
                        'modules/gameClub/services/releaseGame.js'
                    ])
                }]
            }
        })
        .state('choiceProject',{
            url:'/choiceProject/:formatId',
            templateUrl:'modules/gameClub/templates/choiceProject.html',
            cache:false,
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/choiceProject.css',
                        'modules/gameClub/controllers/choiceProjectCtrl.js',
                        'modules/gameClub/services/releaseGame.js'
                    ])
                }]
            }
        })
        .state('createSuccess',{
            url:'/createSuccess',
            templateUrl:'modules/gameClub/templates/createSuccess.html',
            cache:false,
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/createSuccess.css',
                        'modules/gameClub/controllers/createSuccessCtrl.js',
                        'modules/gameClub/services/releaseGame.js'
                    ])
                }]
            }
        })
        .state('createGameDetails',{
            url:'/createGameDetails',
            cache:false,
            templateUrl:'modules/gameClub/templates/createGameDetails.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/createGameDetails.css',
                        'modules/gameClub/controllers/createGameDetailsCtrl.js'
                    ])
                }]
            }
        })
        .state('regPlayers',{
            url:'/regPlayers',
            cache:false,
            templateUrl:'modules/gameClub/templates/regPlayers.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/regPlayers.css',
                        'modules/gameClub/controllers/regPlayersCtrl.js'
                    ])
                }]
            }
        })
        .state('changeGameInfo',{
            url:'/changeGameInfo/:competitionId',
            //cache:false,
            templateUrl:'modules/gameClub/templates/changeGameInfo.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/changeGameInfo.css',
                        'css/DateSelector.css',
                        'js/DateSelector.js',
                        'modules/gameClub/controllers/changeGameInfoCtrl.js',
                        'modules/gameClub/services/releaseGame.js'
                    ])
                }]
            }
        })
        .state('choiceGrade',{
            url:'/choiceGrade/:cProjectId',
            cache:false,
            templateUrl:'modules/gameClub/templates/choiceGrade.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/choiceGrade.css',
                        'modules/gameClub/controllers/choiceGradeCtrl.js',
                        'modules/gameClub/services/releaseGame.js'
                    ])
                }]
            }
        })
        .state('locationList',{
            url:'/locationList',
            templateUrl:'modules/gameClub/templates/locationList.html',
            cache:false,
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/locationList.css',
                        'modules/gameClub/controllers/locationListCtrl.js',
                        'modules/gameClub/services/releaseGame.js'
                    ])
                }]
            }
        })
        .state('addLocation',{
            url:'/addLocation',
            //cache:false,
            templateUrl:'modules/gameClub/templates/addLocation.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/addLocation.css',
                        'modules/gameClub/controllers/addLocationCtrl.js'
                    ])
                }]
            }
        })
        //比赛详情（用户）
        .state('clubGameDetails',{
            url:'/clubGameDetails/:competitionId',
            cache:false,
            templateUrl:'modules/gameClub/templates/clubGameDetails.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/clubGameDetails.css',
                        'modules/gameClub/controllers/clubGameDetailsCtrl.js'
                    ])
                }]
            }
        })
        //比赛详情(发布者)
        .state('GameDetailsAdmin',{
            url:'/GameDetailsAdmin/:competitionId',
            cache:false,
            templateUrl:'modules/gameClub/templates/GameDetailsAdmin.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/clubGameDetails.css',
                        'modules/gameClub/controllers/GameDetailsAdminCtrl.js'
                    ])
                }]
            }
        })
        //俱乐部发布比赛报名
        .state('clubUserReg',{
            url:'/clubUserReg',
            cache:false,
            templateUrl:'modules/gameClub/templates/clubUserReg.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/clubUserReg.css',
                        'modules/gameClub/controllers/clubUserRegCtrl.js'
                    ])
                }]
            }
        })
        //设置等级
        .state('setLevel',{
            url:'/setLevel/:projectId',
            cache:false,
            templateUrl:'modules/gameClub/templates/setLevel.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/setLevel.css',
                        'modules/gameClub/controllers/setLevelCtrl.js'
                    ])
                }]
            }
        })
        //设置等级
        .state('clubMyProject',{
            url:'/clubMyProject/:projectId',
            cache:false,
            templateUrl:'modules/gameClub/templates/clubMyProject.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/clubMyProject.css',
                        'modules/gameClub/controllers/clubMyProjectCtrl.js'
                    ])
                }]
            }
        })
        //全部队员
        .state('clubAllPlayers',{
            url:'/clubAllPlayers/:projectId',
            cache:false,
            templateUrl:'modules/gameClub/templates/clubAllPlayers.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/clubAllPlayers.css',
                        'modules/gameClub/controllers/clubAllPlayersCtrl.js'
                    ])
                }]
            }
        })
        .state('allPlayersAdmin',{
            url:'/allPlayersAdmin/:projectId',
            cache:false,
            templateUrl:'modules/gameClub/templates/allPlayersAdmin.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/clubAllPlayers.css',
                        'modules/gameClub/controllers/clubAllPlayersCtrl.js'
                    ])
                }]
            }
        })
        //删除队员
        .state('deletePlayers',{
            url:'/deletePlayers/:projectId',
            cache:false,
            templateUrl:'modules/gameClub/templates/deletePlayers.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/clubAllPlayers.css',
                        'modules/gameClub/controllers/deletePlayersCtrl.js'
                    ])
                }]
            }
        })
        //裁判
        .state('referee',{
            url:'/referee/:competitionId',
            cache:false,
            templateUrl:'modules/gameClub/templates/referee.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/referee.css',
                        'modules/gameClub/controllers/refereeCtrl.js'
                    ])
                }]
            }
        })
        .state('addReferee',{
            url:'/addReferee/:competitionId',
            cache:false,
            templateUrl:'modules/gameClub/templates/addReferee.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/addBallFriend.css',
                        'modules/gameClub/controllers/addRefereeCtrl.js'
                    ])
                }]
            }
        })
        .state('inviteReferee',{
            url:'/inviteReferee',
            cache:false,
            templateUrl:'modules/gameClub/templates/inviteReferee.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/home/css/invite.css',
                        'modules/gameClub/controllers/inviteRefereeCtrl.js'
                    ])
                }]
            }
        })
        //添加球友
        .state('addBallFriend',{
            url:'/addBallFriend/:projectId',
            cache:false,
            templateUrl:'modules/gameClub/templates/addBallFriend.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/addBallFriend.css',
                        'modules/gameClub/controllers/addBallFriendCtrl.js'
                    ])
                }]
            }
        })
        //添加新球友
        .state('addNewFriend',{
            url:'/addNewFriend/:projectId',
            cache:false,
            templateUrl:'modules/gameClub/templates/addNewFriend.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/addBallFriend.css',
                        'modules/gameClub/controllers/addNewFriendCtrl.js'
                    ])
                }]
            }
        })
        //添加新球友
        .state('editNewFriend',{
            url:'/editNewFriend/:projectId',
            cache:false,
            templateUrl:'modules/gameClub/templates/editNewFriend.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/editNewFriend.css',
                        'modules/gameClub/controllers/editNewFriendCtrl.js',
                        'modules/gameClub/services/releaseGame.js'
                    ])
                }]
            }
        })
        //添加新球友
        .state('matchPartner',{
            url:'/matchPartner/:projectId',
            cache:false,
            templateUrl:'modules/gameClub/templates/matchPartner.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/matchPartner.css',
                        'modules/gameClub/controllers/matchPartnerCtrl.js'
                    ])
                }]
            }
        })
        //分组
        .state('grouping',{
            url:'/grouping/:projectId',
            cache:false,
            templateUrl:'modules/gameClub/templates/grouping.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/grouping.css',
                        'modules/gameClub/controllers/groupingCtrl.js',
                        'modules/gameClub/services/releaseGame.js'
                    ])
                }]
            }
        })
        //选择种子
        .state('setSeed',{
            url:'/setSeed/:projectId',
            cache:false,
            templateUrl:'modules/gameClub/templates/setSeed.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/setSeed.css',
                        'modules/gameClub/controllers/setSeedCtrl.js',
                        'modules/gameClub/services/releaseGame.js'
                    ])
                }]
            }
        })

        .state('seed',{
            url:'/seed/:projectId',
            cache:false,
            templateUrl:'modules/gameClub/templates/seed.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/seed.css',
                        'modules/gameClub/controllers/seedCtrl.js',
                        'modules/gameClub/services/releaseGame.js'
                    ])
                }]
            }
        })
        //俱乐部成绩与分组
        .state('clubGradeGroup',{
            url:'/clubGradeGroup',
            cache:false,
            templateUrl:'modules/gameClub/templates/clubGradeGroup.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/clubGradeGroup.css?v=0.1',
                        'modules/gameClub/controllers/clubGradeGroupCtrl.js'
                    ])
                }]
            }
        })

        //小组赛
        .state('clubGradeGroup.clubGroupMatch', {
            url: '/clubGroupMatch',
            cache:false,
            views: {
                'clubGradeGroup-clubGroupMatch': {
                    templateUrl: 'modules/gameClub/templates/clubGroupMatch.html'
                }
            },
            resolve:{
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/clubGradeGroup.css?v=0.1',
                        'modules/gameClub/controllers/clubGradeGroupCtrl.js',
                        'modules/gameClub/controllers/clubGroupMatchCtrl.js'
                    ]);
                }]
            }
        })

        //淘汰赛
        .state('clubGradeGroup.clubKnockout', {
            url: '/clubKnockout',
            cache:false,
            views: {
                'clubGradeGroup-clubKnockout': {
                    templateUrl: 'modules/gameClub/templates/clubKnockout.html'
                }
            },
            resolve:{
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/clubGradeGroup.css?v=0.1',
                        'modules/gameClub/controllers/clubGradeGroupCtrl.js',
                        'modules/gameClub/controllers/clubKnockoutCtrl.js'
                    ]);
                }]
            }
        })

        //循环赛
        .state('clubGradeGroup.clubRoundRobin', {
            url: '/clubRoundRobin',
            cache:false,
            views: {
                'clubGradeGroup-clubRoundRobin': {
                    templateUrl: 'modules/gameClub/templates/clubRoundRobin.html'
                }
            },
            resolve:{
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/clubGradeGroup.css?v=0.1',
                        'modules/gameClub/controllers/clubGradeGroupCtrl.js',
                        'modules/gameClub/controllers/clubGroupMatchCtrl.js'
                    ]);
                }]
            }
        })
        //成绩
        .state('clubGradeGroup.clubGrade', {
            url: '/clubGrade',
            cache:false,
            views: {
                'clubGradeGroup-clubGrade': {
                    templateUrl: 'modules/gameClub/templates/clubGrade.html'
                }
            },
            resolve:{
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/clubGradeGroup.css?v=0.1',
                        'modules/gameClub/controllers/clubGradeGroupCtrl.js',
                        'modules/gameClub/controllers/clubGradeCtrl.js'
                    ]);
                }]
            }
        })
        //俱乐部成绩与分组
        .state('userGradeGroup',{
            url:'/userGradeGroup',
            cache:false,
            templateUrl:'modules/gameClub/templates/userGradeGroup.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/clubGradeGroup.css?v=0.1',
                        'modules/gameClub/controllers/clubGradeGroupCtrl.js'
                    ])
                }]
            }
        })

        //小组赛
        .state('userGradeGroup.userGroupMatch', {
            url: '/userGroupMatch',
            cache:false,
            views: {
                'userGradeGroup-userGroupMatch': {
                    templateUrl: 'modules/gameClub/templates/userGroupMatch.html'
                }
            },
            resolve:{
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/clubGradeGroup.css?v=0.1',
                        'modules/gameClub/controllers/clubGradeGroupCtrl.js',
                        'modules/gameClub/controllers/clubGroupMatchCtrl.js'
                    ]);
                }]
            }
        })

        //淘汰赛
        .state('userGradeGroup.userKnockout', {
            url: '/userKnockout',
            cache:false,
            views: {
                'userGradeGroup-userKnockout': {
                    templateUrl: 'modules/gameClub/templates/userKnockout.html'
                }
            },
            resolve:{
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/clubGradeGroup.css?v=0.1',
                        'modules/gameClub/controllers/clubGradeGroupCtrl.js',
                        'modules/gameClub/controllers/clubKnockoutCtrl.js'
                    ]);
                }]
            }
        })

        //循环赛
        .state('userGradeGroup.userRoundRobin', {
            url: '/userRoundRobin',
            cache:false,
            views: {
                'userGradeGroup-userRoundRobin': {
                    templateUrl: 'modules/gameClub/templates/userRoundRobin.html'
                }
            },
            resolve:{
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/clubGradeGroup.css?v=0.1',
                        'modules/gameClub/controllers/clubGradeGroupCtrl.js',
                        'modules/gameClub/controllers/clubGroupMatchCtrl.js'
                    ]);
                }]
            }
        })
        //成绩
        .state('userGradeGroup.clubGrade', {
            url: '/clubGrade',
            cache:false,
            views: {
                'userGradeGroup-clubGrade': {
                    templateUrl: 'modules/gameClub/templates/clubGrade.html'
                }
            },
            resolve:{
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/clubGradeGroup.css?v=0.1',
                        'modules/gameClub/controllers/clubGradeGroupCtrl.js',
                        'modules/gameClub/controllers/clubGradeCtrl.js'
                    ]);
                }]
            }
        })
        //录入比分
        .state('entryScore',{
            url:'/entryScore/:projectId',
            cache:false,
            templateUrl:'modules/gameClub/templates/entryScore.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/entryScore.css',
                        'modules/gameClub/controllers/entryScoreCtrl.js'
                    ])
                }]
            }
        })
        //赛制描述
        //单淘汰赛制
        .state('singleKnockout',{
            url:'/singleKnockout',
            cache:false,
            templateUrl:'modules/gameClub/templates/singleKnockout.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/format.css'
                    ])
                }]
            }
        })
        //循环淘汰赛制
        .state('cycleElimination',{
            url:'/cycleElimination',
            cache:false,
            templateUrl:'modules/gameClub/templates/cycleElimination.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/format.css'
                    ])
                }]
            }
        })
        //循环赛制
        .state('singleRound',{
            url:'/singleRound',
            cache:false,
            templateUrl:'modules/gameClub/templates/singleRound.html',
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'modules/gameClub/css/format.css'
                    ])
                }]
            }
        });












        $urlRouterProvider.otherwise('/tab/home_v2')

    });
