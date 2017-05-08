/**
 * Created by Administrator on 2017/3/29 0029.
 */
app.controller('setSeedCtrl',function($scope,$http,$stateParams,$rootScope,GameInfo,$state,$ionicPopup){
    $scope.projectId = $stateParams.projectId
    $scope.seedCodeNum = $rootScope.seedCodeNum
    $scope.seedIndex = $rootScope.seedIndex
    $scope.seeds = GameInfo.seedCount
    $scope.hasmore = true
    $scope.page = 1
    $http.get(SITE_SUFFIX+'api/club/competition/getApplyerlist/'+$scope.projectId).success(function (response) {
        console.log(response)
        $scope.category = response.message.category
        $scope.playerLists = response.message.list

        if($scope.playerLists.length < 20){
            $scope.hasmore = false
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
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
        //提交种子
        $scope.dPlayerList = $scope
        $scope.evSeed = {}
        $scope.submitSeed = function () {
            $scope.evSeed.number = $scope.seedCodeNum
            $scope.evSeed.orderId = $scope.dPlayerList.ids
            console.log($scope.evSeed)
            if($scope.evSeed.orderId == null){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: '请选择您所要设置的种子',
                    okText:'确定'
                });
                return
            }
            if($scope.category == 2){
                for(var i=0;i<$scope.playerLists.length;i++){
                    if($scope.playerLists[i].id == $scope.evSeed.orderId){
                        $scope.evSeed.name = $scope.playerLists[i].nickname+'、'+ $scope.playerLists[i].paterner.nickname
                    }
                }
            }
            if($scope.category == 1){
                for(var i=0;i<$scope.playerLists.length;i++){
                    if($scope.playerLists[i].id == $scope.evSeed.orderId){
                        $scope.evSeed.name = $scope.playerLists[i].nickname
                    }
                }
            }
            console.log(GameInfo.seedCount)
            console.log($scope.evSeed)
            if($scope.seedIndex != null){
                for(var i=0;i<$scope.seeds.length;i++){
                    console.log($scope.seeds[i].orderId)
                    console.log($scope.evSeed.orderId)
                    if($scope.seeds[i].orderId == $scope.evSeed.orderId){
                        var alertPopup = $ionicPopup.alert({
                            title: '提示信息',
                            template: '不能重复设置种子',
                            okText:'确定'
                        });
                        return
                    }
                }
                $scope.seeds[$scope.seedIndex] = $scope.evSeed
            }else{
                for(var i=0;i<$scope.seeds.length;i++){
                    console.log($scope.seeds[i].orderId)
                    console.log($scope.evSeed.orderId)
                    if($scope.seeds[i].orderId == $scope.evSeed.orderId){
                        var alertPopup = $ionicPopup.alert({
                            title: '提示信息',
                            template: '不能重复设置种子',
                            okText:'确定'
                        });
                        return
                    }
                }
                GameInfo.addSeedCount($scope.evSeed)
            }

            $state.go('seed',{projectId:$scope.projectId})
            console.log(GameInfo.seedCount)

        }


    })

    $scope.submitGroup = function(){
        $http.get(SITE_SUFFIX+'api/club/competition/group/drawlog/'+$scope.projectId).success(function (response) {
            if(response.result != 0){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: response.message,
                    okText:'确定'
                });
                return
            }
            $state.go('clubGradeGroup')
        })
    }


})