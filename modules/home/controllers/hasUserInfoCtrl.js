/**
 * Created by Administrator on 2016/12/29 0029.
 */
app.controller('hasUserInfoCtrl', function ($scope,$http,$rootScope,$state) {

    //修改个人信息
    $scope.changeName= function (name) {
        $rootScope.realname = name
        $state.go('changeUserInfo')
    }

    //获取用户信息提交

})