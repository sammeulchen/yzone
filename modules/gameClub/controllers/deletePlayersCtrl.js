/**
 * Created by Administrator on 2017/3/28 0028.
 */
app.controller('deletePlayersCtrl', function ($scope,$http,$stateParams,$ionicPopup) {
    $scope.projectId = $stateParams.projectId
    //获取列表
    $http({
        url:SITE_SUFFIX+'api/club/competition/getApplyerlist/'+$scope.projectId,
        method:'get',
        params:{isCompined:false}
    }).success(function (response) {
        $scope.playerLists = response.message.list
      console.log(response)
    })
    //删除
    $scope.deletePlayer = function (id,index) {
        var confirmPopup = $ionicPopup.confirm({
            template: '确定删除该选手?',
            okText:'确定',
            cancelText:'取消'
        });
        confirmPopup.then(function(res) {
            if (res) {
                $http.get(SITE_SUFFIX + 'api/club/comopetition/member/remove/' + id).success(function (response) {
                    if(response.result != 0){
                        var alertPopup = $ionicPopup.alert({
                            title: '提示信息',
                            template: response.message,
                            okText:'确定'
                        });
                        return
                    }
                    $scope.playerLists.splice(index,1)
                })
            }
        })
    }
})