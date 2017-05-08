/**
 * Created by Administrator on 2017/2/22 0022.
 */
app.controller('recordCtrl', function ($scope,$state,$window) {

    $scope.backToPre = function () {
        $state.go('rank.singleRank1')
    }
})