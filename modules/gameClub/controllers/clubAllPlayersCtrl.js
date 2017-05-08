/**
 * Created by Administrator on 2017/3/24 0024.
 */
app.controller('clubAllPlayersCtrl', function ($scope,$window,$http,$stateParams,$ionicPopup,$state) {
    $scope.projectId = $stateParams.projectId
    $scope.competitionId = $window.sessionStorage.competitionId
    //获取报名人员
    var getPlayerLists = function () {
        $scope.hasmore = true
        $scope.page = 1
        $http.get(SITE_SUFFIX+'api/club/competition/getApplyerlist/'+$scope.projectId).success(function (response) {
            console.log(response)
            $scope.category = response.message.category
            $scope.isAdmin = response.message.isAdmin
            $scope.playerLists = response.message.list
            //上拉加载更多
            $scope.loadMore = function () {
                $scope.page +=1
                $http({
                    url:SITE_SUFFIX+'api/club/competition/getApplyerlist/'+$scope.projectId,
                    method:'get',
                    params:{page:$scope.page}
                }).success(function (response) {
                    console.log(response)
                    if(response.result != 0){
                        return;
                    }
                    for(var i=0;i<response.message.list.length;i++){
                        $scope.playerLists.push(response.message.list[i])
                    }
                    if(response.message.list.length < 20){
                        $scope.hasmore = false
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                })
            }

        })
    }
    getPlayerLists()

    //删除搭档
    $scope.removePartner = function (pid,index) {
        console.log(pid)
        var confirmPopup = $ionicPopup.confirm({
            template: '确定拆开这对选手?',
            okText:'确定',
            cancelText:'取消'
        });
        confirmPopup.then(function(res) {
            if(res) {
                $http({
                    url:SITE_SUFFIX+'api/club/competition/removePaterner/'+pid,
                    method:'post'
                }).success(function (response) {
                    if(response.result != 0){
                        var alertPopup = $ionicPopup.alert({
                            title: '提示信息',
                            template: response.message,
                            okText:'确定'
                        });
                        return
                    }
                    getPlayerLists()
                })
            }
        });
    }
    $scope.toBePartner = function (id,projectId) {
        console.log(id)
        console.log(projectId)
        $http({
            url:SITE_SUFFIX+'api/club/competition/addPaterner',
            method:'post',
            params:{id:id,projectId:projectId}
        }).success(function (response) {
            if(response.result != 0){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: response.message,
                    okText:'确定'
                });
                return;
            }
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '添加成功',
                okText:'确定'
            });
            $http.get(SITE_SUFFIX+'api/club/competition/getApplyerlist/'+$scope.projectId).success(function (response) {
                $scope.category = response.message.category
                if(response.message.category == 1){
                    $scope.playerLists = response.message.list
                }
                if(response.message.category ==2){
                    $scope.playerLists = response.message.list
                }


            })

        })
    }
    //删除
    $scope.deletePlayers = function () {
        $state.go('deletePlayers',{projectId:$scope.projectId})
    }
    //返回
    $scope.backToDetails = function () {
        $state.go('GameDetailsAdmin',{competitionId:$scope.competitionId})
    }


})