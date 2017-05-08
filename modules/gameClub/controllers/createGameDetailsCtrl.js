/**
 * Created by Administrator on 2017/3/16 0016.
 */
app.controller('createGameDetailsCtrl', function ($scope,$state,$http,$window,$ionicPopup) {
    //获取个人信息
   /* $http.get(SITE_SUFFIX+'api/ucenter/account').success(function (response) {
        console.log(response)
        if (response.result == 20002) {
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '您的信息还未完善，请先去完善您的信息',
                okText: '确定'
            });
            alertPopup.then(function (res) {
                $state.go('improveInfo')
            });
        }
    })*/
    $scope.hasmore = true
    $scope.page = 1
    //获取发布的赛事列表
    $http({
        url: SITE_SUFFIX + 'api/club/competition/list',
        method: 'get'
    }).success(function (response) {
        console.log(response)
        if(response.result != 0){
            return;
        }
        $scope.gameLists = response.message
        if($scope.gameLists.length < 20){
            $scope.hasmore = false
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
        //上拉加载更多
        $scope.loadMore = function () {
            $scope.page +=1
            $http({
                url:SITE_SUFFIX+'api/club/competition/list',
                method:'get',
                params:{page:$scope.page}
            }).success(function (response) {
                console.log(response)
                if(response.result != 0){
                    return;
                }
                for(var i=0;i<response.message.length;i++){
                    $scope.gameLists.push(response.message[i])
                }
                if(response.message.length < 20){
                    $scope.hasmore = false
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
            })
        }
    });

    //跳转到比赛详情页
    $scope.toGroupDetails = function (competitionId) {
        $state.go('GameDetailsAdmin',{competitionId:competitionId})
    }

    //代报名
    $scope.toAddPartner = function (pjId,competitionId) {
        $window.sessionStorage.competitionId = competitionId
        $state.go('addBallFriend',{projectId:pjId})
    }
    //裁判
    $scope.toReferee = function (competitionId) {
        $state.go('referee',{competitionId:competitionId})
    }
    //登记比分
    $scope.addScore = function (projectId) {
        $window.sessionStorage.pjId = projectId
        $window.sessionStorage.pageType = 1
        $state.go('clubGradeGroup')
    }
    //查看排名
    $scope.getRank = function (projectId) {
        $window.sessionStorage.pjId = projectId
        $window.sessionStorage.pageType = 1
        $state.go('clubGradeGroup.clubGrade')
    }
    //分组
    $scope.toGrouping = function (pjId) {
        $state.go('grouping',{projectId:pjId})
    }

})