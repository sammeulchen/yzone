/**
 * Created by Administrator on 2016/10/20 0020.
 */
app.controller('securityCtrl', function ($scope,$state) {
    $scope.toVerifyIdentity = function () {
        $state.go('verifyIdentity')
    }

})