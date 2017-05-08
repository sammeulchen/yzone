/**
 * Created by Administrator on 2016/9/13 0013.
 */
app.controller('playersListCtrl',function ($scope,$state,$stateParams,$rootScope,$http,$timeout,$window) {
    var projectId = $stateParams.projectId
    $scope.singleShow = false;
    $scope.doublesShow = false;
    var page = 1

    $scope.groupShow = false

    $scope.hasmore = true
    $scope.page = 1
    //获取赛事列表
    $http({
        url: SITE_SUFFIX + 'api/competition/applylist',
        method: 'get',
        params: {projectId: projectId,page:$scope.page}
    }).success(function (response) {
        console.log(response)
        if(response.result != 0){
            return;
        }
        $scope.title = response.message.title
        if (response.message.dataType == 1) {
            $scope.singleShow = true;
            $scope.playersLists = response.message.data
        }
        if (response.message.dataType == 2) {
            $scope.doublesShow = true
            $scope.playersLists = response.message.data
        }
        if(response.message.dataType ==3){
            $scope.groupShow = true
            $scope.playersLists = response.message.data
        }
        //上拉加载更多

        $scope.loadMore = function () {
            $scope.page +=1
            console.log($scope.page)
            $http({
                url:SITE_SUFFIX+'api/competition/applylist',
                method:'get',
                params:{projectId: projectId,page:$scope.page}
            }).success(function (response) {
                console.log(response)
                console.log(response.message.data.length)
                if(response.result != 0){
                    return;
                }
                for(var i=0;i<response.message.data.length;i++){
                    $scope.playersLists.push(response.message.data[i])
                }
                if(response.message.data.length < 20){
                    $scope.hasmore = false
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
            })
        }
    });
    $scope.toTeamAllPlayers = function (teamId) {
        $state.go('allPlayers',{teamId:teamId})
    }

    //查看球友信息
    $scope.toBallFriend = function (userId) {
        $window.sessionStorage.userId = userId
        $state.go('ballFriend')
    }



})
