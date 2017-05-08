/**
 * Created by Chen Sammeul on 2017/3/26.
 */
app.controller('refereeCtrl',function ($scope,$stateParams,$state,$http,$ionicPopup) {
    $scope.competitionId = $stateParams.competitionId
    //获取裁判列表
    $http.get(SITE_SUFFIX+'api/club/referee/list/'+$scope.competitionId).success(function(response){
        console.log(response)
        $scope.referees = response.message
        //删除
        $scope.deleteReferee = function (id,index) {
            var confirmPopup = $ionicPopup.confirm({
                title: '提示信息',
                template: '你确定删除该裁判吗?',
                okText:'确定',
                cancelText:'取消'
            });
            confirmPopup.then(function(res) {
                if(res) {
                    $http({
                        url:SITE_SUFFIX+'api/club/referee/delete/'+id,
                        method:'post'
                    }).success(function (response) {
                        console.log(response)
                        if(response.result != 0){
                            return
                        }
                        $scope.referees.splice(index,1)
                    })

                }
            });
        }
    })
    //添加
    $scope.toShare = function () {
        $state.go('addReferee',{competitionId:$scope.competitionId})
    }

    /*$scope.shareShow = false;
    //点击添加裁判

    $scope.shareMiss = function () {
        $scope.shareShow = false;
    }*/
})