/**
 * Created by Administrator on 2017/3/28 0028.
 */
app.controller('groupingCtrl', function ($scope,$stateParams,$http,$ionicPopup,$state,GameInfo,$rootScope) {
    $scope.projectId = $stateParams.projectId

    $scope.counts = [
        {id:0,text:'1'},
        {id:1,text:'2'}
    ]


    $scope.promotion = $scope
    if($scope.promotion.count == null){
        $scope.promotion.count = 0
    }
    //获取
    $http.get(SITE_SUFFIX+'api/club/competition/group/getConfig/'+$scope.projectId).success(function (response) {
        $scope.applyCount = response.message.applyCount
        if(response.message.groupCount != -1){
            $scope.promotion.count = response.message.groupCount
        }
        if(response.message.riseCount != -1){
            $scope.countNum = response.message.riseCount -1
        }
        $scope.countNum = 1
        $scope.riseCount = 2
        $scope.getCount = function (num) {
            console.log(num)
            $scope.countNum = num;
            $scope.riseCount = $scope.countNum + 1
        }

    })
    //点击减少人数
    $scope.reduceCount = function () {
        $scope.promotion.count --
        if($scope.promotion.count <= 0){
            $scope.promotion.count = 0
        }
    }
    //点击增加人数
    $scope.addCount = function () {
        $scope.promotion.count ++
    }
    //提交
    $scope.submitGroupCount = function () {
        if($scope.promotion.count == 0){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请您填写计划组数',
                okText:'确定'
            });
            return;
        }
        $http({
            url:SITE_SUFFIX+'api/club/competition/group/addConfig',
            method:'post',
            params:{projectId:$scope.projectId,groupCount:$scope.promotion.count,riseCount:$scope.riseCount}
        }).success(function (response) {
            if(response.result != 0){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: response.message,
                    okText:'确定'
                });
                return;
            }
            $scope.seedCount = GameInfo.seedCount
            console.log($scope.seedCount)
            if($scope.seedCount.length == 0){
                $rootScope.seedCodeNum = 1
            }
            $state.go('setSeed',{projectId:$scope.projectId})
        })
    }


})