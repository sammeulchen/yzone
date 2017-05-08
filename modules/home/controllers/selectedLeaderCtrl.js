/**
 * Created by Administrator on 2017/3/1 0001.
 */
app.controller('selectedLeaderCtrl', function ($scope,$state,$stateParams,$http,$window) {
    $scope.competitionId = $stateParams.competitionId;
    $scope.orderId = $window.sessionStorage.orderId;
    //获取列表
    $http({
        url:SITE_SUFFIX+'api/ucenter/paterner/list',
        method:'get',
        params:{orderId:-1}
    }).success(function (response) {
        console.log(response)
        if (response.result != 0) {
            return;
        }
        $scope.partnerLists = response.message
        //选择搭档完
        $scope.partnerL = $scope
        $scope.submitLeader = function () {
            var partnerId = $scope.partnerL.paternerId
            console.log(partnerId)
            if(partnerId == null){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: '请先选择你要更换的领队',
                    okText: '确定'
                });
                return;
            }
            var data = {orderId:$scope.orderId,pid:partnerId}
            console.log(data)
            $http({
                url:SITE_SUFFIX+'api/competition/order/updateTeamLeader',
                method:'post',
                params:data
            }).success(function (response) {
                if(response.result != 0){
                    var alertPopup = $ionicPopup.alert({
                        title: '提示信息',
                        template: response.message,
                        okText: '确定'
                    });
                    return;
                }
                $state.go('groupDetails_v2',{competitionId:$scope.competitionId})
            })
        }
    })
   /* $scope.addNewLeader = function () {
        $state.go('wxInviteLeader',{competitionId:$scope.competitionId})
    }*/


})