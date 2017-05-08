/**
 * Created by Administrator on 2016/8/3 0003.
 */
app.controller('allPlayersCtrl', function ($scope, $state, $stateParams,$http,$window,$ionicPopup) {
    var teamId = $stateParams.teamId

    var applyEnd = $window.sessionStorage.applyEnd
    $http({
        url:SITE_SUFFIX+'api/competition/team/member/list',
        method:'post',
        params:{teamId:teamId}
    }).success(function (response) {
        console.log(response)
        $scope.playersInfos = response.message
        //判断是否是羽众会员
        $scope.users1 = []
        $scope.users2 = []
        for(var i = 0;i<$scope.playersInfos.length;i++){
            if($scope.playersInfos[i].yzoneId == null){
               /* $scope.notUser = true*/
                $scope.users1.push($scope.playersInfos[i])
            }else{
                $scope.users2.push($scope.playersInfos[i])
            }

            mobile = $scope.playersInfos[i].mobile
            if(applyEnd){
                mobile = mobile.replace(/(\d{3})\d{5}(\d{3})/, '$1*****$2');
            }
            $scope.playersInfos[i].mobile = mobile
        }
    })
    //查看球友信息
    $scope.toBallFriend = function (userId) {
        console.log(userId)
        if(userId == null){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '该用户未在羽众平台完善信息',
                okText: '确定'
            });
            return
        }
        $window.sessionStorage.userId = userId
        $state.go('ballFriend')
    }
});