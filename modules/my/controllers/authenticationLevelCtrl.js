/**
 * Created by Administrator on 2016/11/16 0016.
 */
app.controller('authenticationLevelCtrl', function ($scope,$state) {


    ///跳转到在线认证
    $scope.toRankingOnline = function () {
        $state.go('rankingOnline')
    }
})