/**
 * Created by Administrator on 2017/2/20 0020.
 */
app.controller('creatingGroupCtrl', function ($scope,$state) {
    $scope.toCreateGroup = function () {
        $state.go('createGroup')
    }

})