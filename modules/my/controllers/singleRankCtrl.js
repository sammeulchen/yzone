/**
 * Created by Administrator on 2016/11/18 0018.
 */
app.controller('singleRankCtrl', function ($scope,$state,$http,$rootScope,$ionicPopup,$window) {

    var rank = -1
    var gender = -1
    $scope.selectRank = $scope
    $scope.selectSex = $scope
    $scope.sexs = [
        {id:-1,text:'全部性别'},
        {id:1,text:'男'},
        {id:0,text:'女'}
    ]
    $scope.rankingGrades = [
        {id:1,name:'风级',picUrl:'wind-white.gif'},
        {id:2,name:'林级',picUrl:'forest-white.gif'},
        {id:3,name:'火级',picUrl:'fire-white.gif'},
        {id:4,name:'山级',picUrl:'mount-white.gif'}
    ]

    //获取等级信息
    $http.get(SITE_SUFFIX+'api/ucenter/level/get').success(function (response) {
        if (response.result != 0) {
            return
        }
        $scope.singleLevel = response.message.singleLevel
        //$scope.doubleLevel = response.message.doubleLevel
        for (var i in $scope.rankingGrades) {
            $scope.selectRank.rank = $scope.rankingGrades[$scope.singleLevel.parentLevel - 1];
        }
        rank = $scope.singleLevel.parentLevel


        //获取排名
        $scope.hasmore = true
        $scope.page = 1
        $http({
            url: SITE_SUFFIX + 'api/ucenter/level/rank',
            method: 'get',
            params: {level: rank, gender: gender, category: 1}
        }).success(function (response) {
            console.log(response)
            if (response.result == 0) {
                $scope.singlePlayers = response.message
                $scope.loadMore = function () {
                    console.log(111)

                    $scope.page += 1
                    $http({
                        url: SITE_SUFFIX + 'api/ucenter/level/rank',
                        method: 'get',
                        params: {level: rank, gender: gender, category: 1, page: $scope.page}
                    }).success(function (response) {
                        console.log(response)
                        if (response.result == 0) {
                            $window.sessionStorage.level = rank
                            $window.sessionStorage.gender = gender
                            $state.go('singleRank')
                        }
                    })
                }
            }

        })
        $scope.changeRank = function () {
            rank = $scope.selectRank.rank.id
            $scope.setColor = function () {
                var p = '';
                if (rank == 1) {
                    p = '#28A7E1'
                }
                if (rank == 2) {
                    p = '#009F40'
                }
                if (rank == 3) {
                    p = '#E84518'
                }
                if (rank == 4) {
                    p = '#7B776E'
                }
                return{color: p}
            }
            $http({
                url: SITE_SUFFIX + 'api/ucenter/level/rank',
                method: 'get',
                params: {level: rank, gender: gender, category: 1}
            }).success(function (response) {
                console.log(response)
                if (response.result == 0) {
                    $scope.singlePlayers = response.message
                }
            })
        }

        //设置名次积分显示部分背景
        $scope.setBg = function (parentLvel) {
            var p = ""
            if (parentLvel == 1) {
                p = '#2DA7E0'
            }
            if (parentLvel == 2) {
                p = '#009F40'
            }
            if (parentLvel == 3) {
                p = '#D7000F'
            }
            if (parentLvel == 4) {
                p = '#717071'
            }
            return {"background": p}
        }
        var rank1 = 100000; //风丙
        var rank2 = 102679; //风乙
        var rank3 = 105358; //风甲
        var rank4 = 108037; //林丙
        var rank5 = 113811; //林乙
        var rank6 = 119585; //林甲
        var rank7 = 125359; //火丙
        var rank8 = 135359; //火乙
        var rank9 = 145359; //火甲
        var rank10 = 162680; //山丙
        var rank11 = 180001; //山乙
        var rank12 = 217322; //山甲

        $scope.setBg1 = function (le) {
            var a = '';
            if (le == rank1) {
                a = '#D1E5F7';
            }
            if (le > rank1) {
                a = '#28A7E1'
            }
            return {background: a}
        }
        $scope.setBg2 = function (le) {
            var b = '';
            if (le < rank2) {
                b = '#D1E5F7';
            }
            if (le >= rank2) {
                b = '#28A7E1'
            }
            return {background: b}
        }
        $scope.setBg3 = function (le) {
            var c = '';
            if (le < rank2) {
                c = '#D1E5F7'
            }
            if (le >= rank2 && le < rank4) {
                c = '#28A7E1';
            }
            if (le == rank4) {
                c = '#E2EEC5'
            }
            if (le > rank4) {
                c = '#009F40'
            }
            return {background: c}
        }
        $scope.setBg4 = function (le) {
            var d = '';
            if (le < rank3) {
                d = '#D1E5F7';
            }
            if (le >= rank3 && le < rank4) {
                d = '#28A7E1'
            }
            if (le >= rank4 && le < rank5) {
                d = '#E2EEC5'
            }
            if (le >= rank5) {
                d = '#009F40'
            }
            return {background: d}
        }
        $scope.setBg5 = function (le) {
            var e = '';
            if (le < rank3) {
                e = '#D1E5F7';
            }
            if (le >= rank3 && le < rank4) {
                e = '#28A7E1'
            }
            if (le >= rank4 && le < rank5) {
                e = '#E2EEC5'
            }
            if (le >= rank5 && le < rank7) {
                e = '#009F40'
            }
            if (le == rank7) {
                e = '#F8C6AD'
            }
            if (le > rank7) {
                e = '#E84518'
            }
            return {background: e}
        }
        $scope.setBg6 = function (le) {
            var f = '';
            if (le < rank4) {
                f = '#D1E5F7';
            }
            if (le >= rank4 && le < rank6) {
                f = '#E2EEC5'
            }
            if (le >= rank6 && le < rank7) {
                f = '#28A7E1'
            }
            if (le == rank7) {
                f = '#F8C6AD'
            }
            if (le > rank7) {
                f = '#E84518'
            }
            return {background: f}
        }
        $scope.setBg7 = function (le) {
            var g = '';
            if (le < rank6) {
                g = '#E2EEC5';
            }
            if (le >= rank6 && le < rank7) {
                g = '#009F40'
            }
            if (le >= rank7 && le < rank8) {
                g = '#F8C6AD'
            }
            if (le >= rank8 && le <= rank10) {
                g = '#E84518'
            }
            if (le == rank10) {
                g = '#D4CEC5'
            }
            if (le > rank10) {
                g = '#7B776E'
            }
            return {background: g}
        }
        $scope.setBg8 = function (le) {
            h = '';
            if (le < rank7) {
                h = '#E2EEC5';
            }
            if (le >= rank7 && le < rank9) {
                h = '#F8C6AD'
            }
            if (le >= rank9 && le < rank10) {
                h = '#E84518'
            }
            if (le >= rank10 && le < rank11) {
                h = '#D4CEC5'
            }
            if (le >= rank11) {
                h = '#7B776E'
            }
            return {background: h}
        }
        $scope.setBg9 = function (le) {
            var i = '';
            if (le < rank8) {
                i = '#F8C6AD';
            }
            if (le >= rank8 && le < rank10) {
                i = '#E84518'
            }
            if (le >= rank10 && le < rank11) {
                i = '#D4CEC5'
            }
            if (le > rank11) {
                i = '#7B776E'
            }
            return {background: i}
        }
        $scope.setBg10 = function (le) {
            var j = '';
            if (le < rank10) {
                j = '#F8C6AD';
            }
            if (le >= rank10 && le < rank11) {
                j = '#D4CEC5'
            }
            if (le > rank11) {
                j = '#7B776E'
            }
            return {background: j}
        }
        $scope.setBg11 = function (le) {
            var k = '';
            if (le < rank11) {
                k = '#D4CEC5';
            }
            if (le >= rank11) {
                k = '#7B776E'
            }
            return {background: k}
        }
        $scope.setBg12 = function (le) {
            var l = '';
            if (le < rank12) {
                l = '#D4CEC5'
            }
            if (le >= rank12) {
                l = '#7B776E'
            }
            return {background: l}
        }

        $scope.sexs = [
            {id: -1, text: '全部性别'},
            {id: 1, text: '男'},
            {id: 0, text: '女'}
        ]
        for (var i in $scope.sexs) {
            $scope.selectSex.sex = $scope.sexs[0];
        }
        $scope.changeSex = function () {
            gender = $scope.selectSex.sex.id
            $http({
                url: SITE_SUFFIX + 'api/ucenter/level/rank',
                method: 'get',
                params: {level: rank, gender: gender, category: 1}
            }).success(function (response) {
                if (response.result != 0) {
                    return;
                }
                $scope.singlePlayers = response.message
                console.log(response)
            })
        }

        $scope.toSingleRanking = function () {
            $window.sessionStorage.levelId = 1
            $state.go('record.creditsLog')
        }

        $scope.toYZRank = function () {
            $state.go('YZRank')
        }

        //跳转到修改级别
        $scope.toOwnRanking = function () {
            $rootScope.singleLvel = 1
            $state.go('ownRanking')
        }

        //名次背景
        $scope.setRankBg = function (rank) {
            var p = "";
            var t = "";
            var s = "";
            if (rank == 1) {
                p = "url(img/rank-one.png) center top no-repeat"
                t = "19px 19px"
                s = "#ffffff"
            }
            if (rank == 2) {
                p = "url(img/rank-two.png) center top no-repeat"
                t = "19px 19px"
                s = "#ffffff"
            }
            if (rank == 3) {
                p = "url(img/rank-three.png) center top no-repeat"
                t = "19px 19px"
                s = "#ffffff"
            }
            return {"background": p, "background-size": t, "color": s}
        }

        $scope.toBallFriend = function (current, userId) {
            if (current) {
                $state.go("tab.my")
            } else {
                $window.sessionStorage.friendId = userId
                $state.go('ballFriend')
            }
        }

        //留在该级
        $scope.stayClass = function () {
            var confirmPopup = $ionicPopup.confirm({
                template: '留在该级后，您将不能修改，确定留在该级？',
                okText: '确定',
                cancelText: '取消'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    $http({
                        url: SITE_SUFFIX + 'api/ucenter/level/op',
                        method: 'post',
                        params: {category: 1, func: 2}
                    }).success(function (response) {
                        console.log(response)
                        if (response.result != 0) {
                            return;
                        }
                        $http.get(SITE_SUFFIX + 'api/ucenter/level/get').success(function (response) {
                            if (response.result != 0) {
                                return
                            }
                            $scope.singleLevel = response.message.singleLevel
                            for (var i in $scope.rankingGrades) {
                                $scope.selectRank.rank = $scope.rankingGrades[$scope.singleLevel.parentLevel - 1];
                            }
                            rank = $scope.singleLevel.parentLevel

                        })
                    })
                }
            })
        }

        //下降一级
        $scope.downClass = function () {
            var confirmPopup = $ionicPopup.confirm({
                template: '降级后不能修改，确定降级？',
                okText: '确定',
                cancelText: '取消'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    $http({
                        url: SITE_SUFFIX + 'api/ucenter/level/op',
                        method: 'post',
                        params: {category: 1, func: 1}
                    }).success(function (response) {
                        console.log(response)
                        if (response.result != 0) {
                            return;
                        }
                        $http.get(SITE_SUFFIX + 'api/ucenter/level/get').success(function (response) {
                            if (response.result != 0) {
                                return
                            }
                            $scope.singleLevel = response.message.singleLevel
                            for (var i in $scope.rankingGrades) {
                                $scope.selectRank.rank = $scope.rankingGrades[$scope.singleLevel.parentLevel - 1];
                            }
                            rank = $scope.singleLevel.parentLevel

                        })
                    })
                }
            })
        }

        //修改等级
        $scope.changeClass = function (parentLevel) {
            $rootScope.singleLvel = 1
            $rootScope.parentLevel = parentLevel
            $state.go('ownRanking')
        }
    })

})