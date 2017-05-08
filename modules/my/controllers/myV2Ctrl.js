/**
 * Created by Administrator on 2016/10/20 0020.
 */
app.controller('myCtrl', function ($scope, $state,$http,$ionicPopup,$window,$rootScope) {

    $http.get(SITE_SUFFIX+'api/ucenter/account').success(function (response) {
        if(response.result != 0 && response.result != 20002){
            return
        }
        if(response.result == 0){
            $scope.profile = response.message.profile
            $scope.level = response.message.level

            //设置级别字体颜色
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



            //跳转到给自己定级
            $scope.toOwnRanking1 = function () {
                $rootScope.singleLvel = 1
                $state.go('ownRanking')
            }
            $scope.toOwnRanking2 = function () {
                $rootScope.singleLvel = 2
                $state.go('ownRanking')
            }


            //跳转到俱乐部
            $scope.toMyClub = function () {
                $state.go('myClub')
               /* var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: '该功能暂未开放，敬请期待！',
                    okText:'确定'
                });*/
            }
        }
        if(response.result == 20002){
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
            //$window.sessionStorage.friendMsgCount = $scope.userInfo.friendMsgCount
            $state.go('myPartner')
        }
        console.log(response)
    })



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
    //发布比赛
    $scope.toReleaseGame = function () {
        $window.location.href = SITE_SUFFIX+'competition/publish'
    }
    //管理比赛
    $scope.toControlGame = function () {
        $window.location.href = SITE_SUFFIX+'competition/manage'
    }
});


app.stateProvider

    //完善个人信息
    /*.state('improveInfo',{
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
        templateUrl:'modules/my/templates/serviceCenter.html',
        resolve:{
            loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                return $ocLazyLoad.load([
                    'modules/my/css/serviceCenter.css',
                    'modules/my/controllers/serviceCenterCtrl.js'
                ])
            }]
        }
    })
*/