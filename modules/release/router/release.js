/**
 * Created by Administrator on 2016/8/5 0005.
 */
angular.module('yuZoneApp')
.config(['$stateProvider',function ($stateProvider) {
        $stateProvider
            .state('releaseGroupGame',{
                url:'tab/release/releaseGroupGame',
                templateUrl:'modules/release/templates/releaseGroupGame.html',
                controller:'releaseGroupGameCtrl',
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

            .state('releaseSingleGame',{
                url:'/releaseSingleGame',
                templateUrl:'modules/release/templates/releaseSingleGame.html',
                controller:'releaseSingleGameCtrl',
                resolve:{
                    loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load([

                            'modules/release/css/releaseSingleGame.css',
                            'modules/release/controllers/releaseSingleGameCtrl.js'
                        ])
                    }]
                }
            })
        }
    ])