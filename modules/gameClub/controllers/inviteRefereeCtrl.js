/**
 * Created by Administrator on 2017/3/31 0031.
 */
app.controller('inviteRefereeCtrl', function ($scope,$http,$state,$ionicPopup) {
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    $scope.competitionId = getQueryString('id')

    $http.get(SITE_SUFFIX+'api/club/referee/competition/'+$scope.competitionId).success(function (response) {

        $scope.applyerInfo = response.message
        $scope.compInfo = response.message.competition
        console.log(response)
    })

    $scope.toReg = function () {
        $http.get(SITE_SUFFIX+'api/club/referee/accept/'+$scope.competitionId).success(function (response) {
            console.log(response)
            if(response.result != 0){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: response.message,
                    okText:'确定'
                });
                return;
            }
            $state.go('GameDetailsAdmin',{competitionId:$scope.competitionId})
        })
    }

})