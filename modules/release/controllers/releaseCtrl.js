/**
 * Created by Administrator on 2016/8/5 0005.
 */
app.controller('releaseCtrl',function($scope,$state){
    $scope.toReleaseGroupGame = function () {
        $state.go('releaseGroupGame')
    }
    $scope.toReleaseSingleGame = function () {
        $state.go('releaseSingleGame')
    }
})
app.stateProvider
//release game

    // release group game
    .state('releaseGroupGame',{
        url:'/releaseGroupGame',
        templateUrl:'modules/release/templates/releaseGroupGame.html',
        resolve:{
            loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                return $ocLazyLoad.load([
                    'modules/release/css/releaseSingleGame.css',
                    'modules/release/css/releaseGroupGame.css',
                    'modules/release/controllers/releaseGroupGameCtrl.js'
                ])
            }]
        }
    })
    //比赛规程及注意事项
    .state('competitionRules',{
        url:'/competitionRules',
        templateUrl:'modules/release/templates/competitionRules.html',
        resolve:{
            loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                return $ocLazyLoad.load([
                    'modules/release/css/competitionRules.css',
                    'modules/release/controllers/competitionRulesCtrl.js'
                ])
            }]
        }
    })
    //赛事级别
    .state('tournamentLevel',{
        url:'/tournamentLevel',
        templateUrl:'modules/release/templates/tournamentLevel.html',
        resolve:{
            loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                return $ocLazyLoad.load([
                    'modules/release/css/tournamentLevel.css',
                    'modules/release/controllers/tournamentLevelCtrl.js'
                ])
            }]
        }
    })
    //release single game
    .state('releaseSingleGame',{
        url:'/releaseSingleGame',
        templateUrl:'modules/release/templates/releaseSingleGame.html',
        resolve:{
            loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                return $ocLazyLoad.load([
                    'modules/release/css/releaseSingleGame.css',
                    'modules/release/controllers/releaseSingleGameCtrl.js'
                ])
            }]
        }
    })

    //group setting 单项报名时跳转
    .state('groupSetting',{
        url:'/groupSetting',
        cache:false,
        templateUrl:'modules/release/templates/groupSetting.html',
        resolve:{
            loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                return $ocLazyLoad.load([

                    'modules/release/css/groupSetting.css',
                    'modules/release/controllers/groupSettingCtrl.js',
                    'modules/release/services/projectSetting.js'
                ])
            }]
        }
    })
    //设置完项目后的页面
    .state('eventsDetailsSetting',{
        url:'/eventsDetailsSetting',
        // cache:false,
        templateUrl:'modules/release/templates/eventsDetailsSetting.html',
        resolve:{
            loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                return $ocLazyLoad.load([

                    'modules/release/css/eventsDetailsSetting.css',
                    'modules/release/controllers/eventsDetailsSettingCtrl.js',
                    'modules/release/services/projectSetting.js'
                ])
            }]
        }
    })

    .state('eventsGrade',{
        url:'/eventsGrade',
        templateUrl:'modules/release/templates/eventsGrade.html',
        resolve:{
            loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                return $ocLazyLoad.load([

                    'modules/release/css/eventsGrade.css',
                    'modules/release/controllers/eventsGradeCtrl.js'
                ])
            }]
        }
    })
    //跳转到地点页面
    .state('gameLocation',{
        url:'/gameLocation',
        templateUrl:'modules/release/templates/gameLocation.html',
        controller:'gameLocationCtrl',
        resolve:{
            loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                return $ocLazyLoad.load([

                    'modules/release/css/gameLocation.css',
                    /* 'modules/release/controllers/gameLocation.js',*/
                    'modules/release/controllers/gameLocationCtrl.js'
                ])
            }]
        }
    })
    //团体赛报名时跳转
    .state('groupSettingGroup',{
        url:'/groupSettingGroup',
        templateUrl:'modules/release/templates/groupSettingGroup.html',
        resolve:{
            loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                return $ocLazyLoad.load([

                    'modules/release/css/groupSetting.css',
                    'modules/release/controllers/groupSettingGroupCtrl.js'
                ])
            }]
        }
    })
    //比赛时间

    .state('gameTime',{
        url:'/gameTime',
        templateUrl:'modules/release/templates/gameTime.html',
        resolve:{
            loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                return $ocLazyLoad.load([
                    'modules/release/css/gameTime.css',
                    'modules/release/controllers/gameTimeCtrl.js'
                ])
            }]
        }
    })

    .state('eventsGradeGroup',{
        url:'/eventsGradeGroup',
        templateUrl:'modules/release/templates/eventsGradeGroup.html',
        resolve:{
            loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                return $ocLazyLoad.load([

                    'modules/release/css/eventsGradeGroup.css',
                    'modules/release/controllers/eventsGradeGroupCtrl.js'
                ])
            }]
        }
    })

    .state('eventsDetailsGroupMan',{
        url:'/eventsDetailsGroupMan',
        cache:false,
        templateUrl:'modules/release/templates/eventsDetailsGroupMan.html',
        resolve:{
            loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                return $ocLazyLoad.load([

                    'modules/release/css/eventsDetailsGroupMan.css',
                    'modules/release/controllers/eventsDetailsGroupManCtrl.js'
                ])
            }]
        }
    })
