/**
 * Created by Administrator on 2016/10/20 0020.
 */
app.controller('myCtrl', function ($scope, $state,$http,$ionicPopup,$window,$rootScope) {
    $scope.noMsgShow = false
    $scope.competitionShow = false
    $scope.friendShow = false
    $scope.manShow = false
    $scope.womanShow = false
    $scope.myAgeShow = false
    $scope.singleGradeShow = false
    $scope.doubleGradeShow = false
    $scope.singleAuthShow = false
    $scope.doubleAuthShow = false
    $http.get(SITE_SUFFIX+'api/ucenter/account').success(function (response) {
        if(response.result != 0 && response.result != 20002){
            return
        }
        if(response.result == 0){
            $scope.userInfo = response.message
            if($scope.userInfo.unreadMsgCount > 0){
                $scope.noMsgShow = true
            }
            if($scope.userInfo.competitonUpdateCount > 0){
                $scope.competitionShow = true
            }
            if($scope.userInfo.friendMsgCount > 0){
                $scope.friendShow = true
            }
            if($scope.userInfo.gender == 1){
                $scope.manShow = true
            }
            if($scope.userInfo.gender == 0){
                $scope.womanShow = true
            }
            if($scope.userInfo.age >= 0){
                $scope.myAgeShow = true
            }
            if($scope.userInfo.totalPoint == 0){
                $scope.userInfo.totalPoint = '敬请期待'
                $scope.toMyExperience = function () {
                    var alertPopup = $ionicPopup.alert({
                        title: '提示信息',
                        template: '该功能暂未开放，敬请期待！',
                        okText:'确定'
                    });
                }
            }
            //判断是否认证
            if(!$scope.userInfo.singleAuth){
                $scope.singleAuthShow = true
            }else{
                $scope.singleAuthShow = false
            }
            if(!$scope.userInfo.doubleAuth){
                $scope.doubleAuthShow = true
            }else{
                $scope.doubleAuthShow = false
            }

            //判断头像背景
            $scope.setBg = function (singleClassLevel) {
                var p = "";
                var t = "";
                if(singleClassLevel == '风级'){
                    p='url("img/wind-top.png") no-repeat'
                    t = "66px 33px"
                    $scope.singleLevelPic = "wind-white.gif"
                }
                if(singleClassLevel == '林级'){
                    p='url("img/forest-top.png") no-repeat'
                    t = "66px 33px"
                    $scope.singleLevelPic = "forest-white.gif"
                }
                if(singleClassLevel == '火级'){
                    p='url("img/fire-top.png") no-repeat'
                    t = "66px 33px"
                    $scope.singleLevelPic = "fire-white.gif"
                }
                if(singleClassLevel == '山级'){
                    p='url("img/mount-top.png") no-repeat'
                    t = "66px 33px"
                    $scope.singleLevelPic = "mount-white.gif"
                }
                return {"background": p,"background-size":t};

            }
            $scope.setBg1 = function (doubleClassLevel) {
                var p = "";
                var t = "";
                if(doubleClassLevel == '风级'){
                    p='url("img/wind-btm.png") no-repeat'
                    t = "66px 33px"
                    $scope.doubleLevelPic = "wind-white.gif"
                }
                if(doubleClassLevel == '林级'){
                    p='url("img/forest-btm.png") no-repeat'
                    t = "66px 33px"
                    $scope.doubleLevelPic = "forest-white.gif"
                }
                if(doubleClassLevel == '火级'){
                    p='url("img/fire-btm.png") no-repeat'
                    t = "66px 33px"
                    $scope.doubleLevelPic = "fire-white.gif"
                }
                if(doubleClassLevel == '山级'){
                    p='url("img/mount-btm.png") no-repeat'
                    t = "66px 33px"
                    $scope.doubleLevelPic = "mount-white.gif"
                }
                return {"background": p,"background-size":t};

            }

            //设置界别字体颜色
            $scope.setColor = function (status) {
                p = "";
                if(status == '风级'){
                    p = '#00A0E9'
                }
                if(status == '林级'){
                    p = '#00A040'
                }
                if(status == '火级'){
                    p = '#D6000F'
                }
                if(status == '山级'){
                    p = '#43403F'
                }
                return {"color":p}
            }



            //判断是否定级
            $scope.rankBeforeShow = false
            $scope.rankLastShow = false
            if($scope.userInfo.singleLevelSet == true){
                $scope.rankLastShow1 = true
            }else{
                $scope.rankBeforeShow1 = true
            }
            if($scope.userInfo.doubleLevelSet == true){
                $scope.rankLastShow2 = true
            }else{
                $scope.rankBeforeShow2 = true
            }

            //判断等级显示
            if($scope.userInfo.singleClassLevel == null || $scope.userInfo.singleClassLevel == "" || $scope.userInfo.singleClassLevel == " "){
                $scope.singleGradeShow = false
            }else{
                $scope.singleGradeShow = true
            }
            if($scope.userInfo.doubleClassLevel == null || $scope.userInfo.doubleClassLevel == "" || $scope.userInfo.doubleClassLevel == " "){
                $scope.doubleGradeShow = false
            }else{
                $scope.doubleGradeShow = true
            }

            //跳转到给自己定级
            $scope.toOwnRanking1 = function () {
                $rootScope.singleLevel = 1
                $state.go('ownRanking')
            }
            $scope.toOwnRanking2 = function () {
                $rootScope.singleLevel = 2
                $state.go('ownRanking')
            }


            //跳转到俱乐部
            $scope.toMyClub = function () {
                //$state.go('myClub')
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: '该功能暂未开放，敬请期待！',
                    okText:'确定'
                });
            }
        }
        if(response.result != 20002){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '您的信息还未完善，请先去完善您的信息',
                okText:'确定'
            });
            alertPopup.then(function(res) {
                $state.go('improveInfo')
            });
        }

        //跳转到我的搭档页面
        $scope.toMyPartner = function () {
            $window.sessionStorage.friendMsgCount = $scope.userInfo.friendMsgCount
            $state.go('myPartner')
        }
        console.log(response)
    })

    $scope.setBorder = function (status,level) {
        var p = ""
        var t = ""
        if(status == true){
            t = 'none'
            if(level == '风级'){
                p = '#00A0E9'
            }
            if(level == '林级'){
                p = '#00A040'
            }
            if(level == '火级'){
                p = '#D6000F'
            }
            if(level == '山级'){
                p = '#43403F'
            }
        }else{
            p = '#B5B6B6'
            if(level == '风级'){
                t = '2px solid #00A0E9'
            }
            if(level == '林级'){
                t = '2px solid #00A040'
            }
            if(level == '火级'){
                t = '2px solid #D6000F'
            }
            if(level == '山级'){
                t = '2px solid #43403F'
            }
        }
        return {"background":p,"border":t}
    }
    
    //跳转到我的信息页面
    $scope.myInfoDetails = function () {
        $state.go('changeMyInfo')
    }



    //查看积分排名
    $scope.toRank1 = function () {
        $state.go('rank.singleRank1')
    }
    $scope.toRank2 = function () {
        $state.go('rank.doubleRank1')
    }

    //跳转到我的比赛页面
    $scope.toMyGames = function () {
        $state.go('myGames')
    }
    //跳转到我的搭档页面
    $scope.toMyPartner = function () {
        $state.go('myPartner')
    }

    //跳转到收藏页面
    $scope.toMyCollection = function () {
        $state.go('myCollection')
    }
    //跳转到管理儿童信息
    $scope.toChildrenInfo = function () {
        $state.go('childrenInfo')
    }
    //跳转到账号管理
    $scope.toSecurity = function () {
        $state.go('security')
    }
    //跳转到服务中心页面
    $scope.toServiceCenter = function () {
        $state.go('serviceCenter')
    }
});

    app.stateProvider

   /* //完善个人信息
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
                    'modules/my/css/changeMyInfo.css',
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
    //我的比赛
    .state('myGames',{
        url:'/myGames',
        templateUrl:'modules/my/templates/myGames.html',
        resolve:{
            loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                return $ocLazyLoad.load([
                    'modules/my/css/myGames.css',
                    'modules/my/controllers/myGamesCtrl.js',
                    'modules/my/controllers/isRegingCtrl.js',
                    'modules/my/controllers/isPlayingCtrl.js',
                    'modules/my/controllers/isEndCtrl.js'
                ])
            }]
        }
    })
    //我的球友
    .state('myPartner',{
        url:'/myPartner',
        cache:false,
        templateUrl:'modules/my/templates/myPartner.html',
        resolve:{
            loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                return $ocLazyLoad.load([
                    'modules/my/css/myPartner.css',
                    'modules/my/controllers/myPartnerCtrl.js'
                ])
            }]
        }
    })
    //我的收藏
    .state('myCollection',{
        url:'/myCollection',
        templateUrl:'modules/my/templates/myCollection.html',
        resolve:{
            loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                return $ocLazyLoad.load([
                    'modules/my/css/myCollection.css',
                    'modules/my/controllers/myCollectionCtrl.js'
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
                    'modules/my/css/childrenInfo.css',
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
                    'modules/my/controllers/myClubCtrl.js'
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
    })*/
