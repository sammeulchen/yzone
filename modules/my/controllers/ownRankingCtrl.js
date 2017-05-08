/**
 * Created by Administrator on 2016/11/16 0016.
 */
app.controller('ownRankingCtrl', function ($scope,$state,$rootScope,$http,$ionicPopup,$window,GameInfo) {
    $scope.rankings = [
        {id:1,picImg:'wind-rank.png'},
        {id:2,picImg:'forest-rank.png'},
        {id:3,picImg:'fire-rank.png'},
        {id:4,picImg:'mount-rank.png'}
    ]
    $scope.groupDesces = [
        {id:1,class:'风级',picImg:'wind.gif',desc:'最近3年中，每年最多参加过2次单项人数在16人及以上的业余羽毛球比赛。'},
        {id:2,class:'林级',picImg:'forest.gif',desc:'最近3年中，至少满足以下一项：1.至少参加3次16人以上的业余比赛。2.参加过俱乐部间联谊赛、社会比赛。3.至少参加过1次省级规模业余比赛。'},
        {id:3,class:'火级',picImg:'fire.gif',desc:'最近3年至少参加过1次省级规模的业余比赛，且小组出现的概率在80%以上。'},
        {id:4,class:'山级',picImg:'mount.gif',desc:'最近3年至少参加过1次省级以上大规模的业余比赛，且获得前8名的概率在80%以上，或持有二级运动员证书。'}
    ]
    var level = -1
    $scope.setSingleShow = false
    $scope.setDoubleShow = false

    $scope.singleLevel =  $rootScope.singleLvel
    $scope.parentLevel =  $rootScope.parentLevel
    $scope.user =  $rootScope.user

    if($scope.singleLevel == 1){
        $scope.setSingleShow = true
    }
    if($scope.singleLevel == 2){
        $scope.setDoubleShow = true
    }

    if($scope.parentLevel != null){
        $scope.changeLevelNum = $scope.parentLevel -1
        level = ($scope.parentLevel - 1) * 3 +1
    }else{
        level = -1
    }
    //选取等级

    $scope.getLevel = function (num,id) {
        $scope.changeLevelNum = num
        level = num * 3 + 1

    }
    
    $scope.submitLevel = function () {
        if(level == -1){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请您先选择等级',
                okText:'确定'
            })
            return
        }
        if($scope.user == false){
            if($scope.singleLevel == 1){
                GameInfo.addSingleLevel(level);
                $window.history.back()
                return;
            }
            if($scope.singleLevel == 2){
                GameInfo.addDoubleLevel(level);
                $window.history.back()
                return;
            }

        }
        $http({
            url: SITE_SUFFIX + 'api/ucenter/level/setInitLevel',
            method: 'get',
            params: {category: $scope.singleLevel,level:level}
        }).success(function (response) {
            if(response.result != 0 && response.result != 10009){
                var confirmPopup = $ionicPopup.confirm({
                    template: response.message,
                    okText: '确定',
                    cancelText: '取消'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        $window.history.back()
                       /* if($scope.singleLevel == 1){
                            $state.go('rank.singleRank1')
                        }
                        if($scope.singleLevel == 2){
                            $state.go('rank.doubleRank1')
                        }*/
                    }
                })
            }
            if(response.result == 0){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: '自己设置参考等级将作为参赛依据，第二次参加分级赛前，您还有N次修改机会。',
                    okText: '确定'
                })
                alertPopup.then(function (res) {
                    $window.history.back()
                });
            }
            /*if (response.result == 0) {
                var confirmPopup = $ionicPopup.confirm({
                    template: '自己设置参考等级将作为参赛依据，第二次参加分级赛前，您还有N次修改机会。',
                    okText: '确定',
                    cancelText: '取消'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        $http({
                            url: SITE_SUFFIX + 'api/ucenter/setLevel',
                            method: 'post',
                            params: {singleLevel: $scope.level}
                        }).success(function (response) {
                            if (response.result != 0 && response.result != 10009) {
                                var alertPopup = $ionicPopup.alert({
                                    title: '提示信息',
                                    template: response.message,
                                    okText: '确定'
                                })
                                return
                            }
                            var alertPopup = $ionicPopup.alert({
                                title: '提示信息',
                                template: response.message,
                                okText: '确定'
                            })
                            alertPopup.then(function (res) {
                                $window.history.back()
                            });
                        })


                    }


                });*/
            //}
        })
    }

        
        /*//完成等级设定
        $scope.submitLevel = function (imgUrl) {
            if(imgUrl != "mount-rank.png" && imgUrl != 'fire-rank.png' && imgUrl != 'forest-rank.png' && imgUrl != 'wind-rank.png'){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: '请您先选择等级',
                    okText:'确定'
                })
                return
            }
            $http({
                url:SITE_SUFFIX+'api/ucenter/setLevel',
                method:'post',
                params:{singleLevel:$scope.singleLevel,doubleLevel:$scope.level}
            }).success(function (response) {
                if(response.result != 0 && response.result != 10009){
                    var alertPopup = $ionicPopup.alert({
                        title: '提示信息',
                        template: response.message,
                        okText:'确定'
                    })
                    return
                }
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: response.message,
                    okText:'确定'
                })
                alertPopup.then(function(res) {
                    $window.history.back()
                });
            })
        }




    //提交选取的单打等级
    $scope.submitSingleLevel = function (imgUrl) {
        if (imgUrl != "mount-rank.png" && imgUrl != 'fire-rank.png' && imgUrl != 'forest-rank.png' && imgUrl != 'wind-rank.png') {
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请您先选择等级',
                okText: '确定'
            })
            return
        }
        $http({
            url: SITE_SUFFIX + 'api/ucenter/level/remain',
            method: 'get',
            params: {category: 1}
        }).success(function (response) {
            if (response.result == 0) {
                var confirmPopup = $ionicPopup.confirm({
                    template: '自定义级别共有三次修改机会，您还能修改' + response.message + '次，确定为自己定为该级吗？',
                    okText: '确定',
                    cancelText: '取消'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        $http({
                            url: SITE_SUFFIX + 'api/ucenter/setLevel',
                            method: 'post',
                            params: {singleLevel: $scope.level}
                        }).success(function (response) {
                            if (response.result != 0 && response.result != 10009) {
                                var alertPopup = $ionicPopup.alert({
                                    title: '提示信息',
                                    template: response.message,
                                    okText: '确定'
                                })
                                return
                            }
                            var alertPopup = $ionicPopup.alert({
                                title: '提示信息',
                                template: response.message,
                                okText: '确定'
                            })
                            alertPopup.then(function (res) {
                                $window.history.back()
                            });
                        })


                    }


                });
            }
        })

    }




    //提交选取的双打等级
    $scope.submitDoubleLevel = function (imgUrl) {
        if (imgUrl != "mount-rank.png" && imgUrl != 'fire-rank.png' && imgUrl != 'forest-rank.png' && imgUrl != 'wind-rank.png') {
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请您先选择等级',
                okText: '确定'
            })
            return
        }
        $http({
            url: SITE_SUFFIX + 'api/ucenter/level/remain',
            method: 'get',
            params: {category: 2}
        }).success(function (response) {
            if (response.result == 0) {
                var confirmPopup = $ionicPopup.confirm({
                    template: '自定义级别共有三次修改机会，您还能修改' + response.message + '次，确定为自己定为该级吗？',
                    okText: '确定',
                    cancelText: '取消'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        $http({
                            url: SITE_SUFFIX + 'api/ucenter/setLevel',
                            method: 'post',
                            params: {doubleLevel: $scope.level}
                        }).success(function (response) {
                            if (response.result != 0 && response.result != 10009) {
                                var alertPopup = $ionicPopup.alert({
                                    title: '提示信息',
                                    template: response.message,
                                    okText: '确定'
                                })
                                return
                            }
                            var alertPopup = $ionicPopup.alert({
                                title: '提示信息',
                                template: response.message,
                                okText: '确定'
                            })
                            alertPopup.then(function (res) {
                                $window.history.back()
                            });
                        })


                    }


                });
            }
        })

    }*/


    //提交全部等级


    //查看积分规则
    $scope.toGradeRules = function () {
        $state.go('YZRank')
    }




})