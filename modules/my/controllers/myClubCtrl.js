/**
 * Created by Administrator on 2016/10/24 0024.
 */
app.controller('myClubCtrl', function ($scope,$state) {
    $scope.backToPre = function () {
        $state.go('tab.my')
    }
})