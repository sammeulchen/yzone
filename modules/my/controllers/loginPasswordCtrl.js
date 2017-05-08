/**
 * Created by Administrator on 2016/11/3 0003.
 */
app.controller('loginPasswordCtrl',function($scope,$state,$http,$ionicPopup,$interval){

    $scope.codeShow = true;
    $scope.codeAgainShow = false
    $scope.myCode = $scope
    var verifyCode = {}

    $scope.getCode = function () {
        verifyCode.mobile =$scope.myCode.mobile
        verifyCode.func = 2
        //判断手机号
        var telReg = /^1[3|4|5|7|8]\d{9}$/
        if (verifyCode.mobile == null) {
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请输入手机号',
                okText:'确定'
            });
            return;
        }
        if (!telReg.test(verifyCode.mobile)) {
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请输入正确的手机号',
                okText:'确定'
            });
            return;
        }
        $http({
            url: SITE_SUFFIX + 'api/verifycode/send',
            method: 'post',
            params: verifyCode
        }).success(function (response) {
            console.log(response)
            if (response.result == 0) {
                $scope.second = 60,
                    timePromise = undefined;

                timePromise = $interval(function () {
                    if ($scope.second <= 0) {
                        $interval.cancel(timePromise);
                        timePromise = undefined;

                        $scope.second = 60;
                        $scope.codeShow = true;
                        $scope.codeAgainShow = false

                    } else {
                        $scope.second--;
                        $scope.codeShow = false;
                        $scope.codeAgainShow = true
                    }
                }, 1000, 100);
            }
        })
    }
    $scope.completeVerifty = function () {
        var code =$scope.myCode.code
        var mobile =$scope.myCode.mobile
        //判断手机号
        var telReg = /^1[3|4|5|7|8]\d{9}$/
        if (mobile == null) {
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请输入手机号',
                okText:'确定'
            });
            return;
        }
        if (!telReg.test(mobile)) {
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请输入正确的手机号',
                okText:'确定'
            });
            return;
        }
        if(code == null){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请输入验证码',
                okText:'确定'
            });
            return;
        }

        $http({
            url:SITE_SUFFIX+'api/ucenter/profile/sNewMobile',
            method:'post',
            params:{newMobile:mobile,code:code}
        }).success(function (response) {
            if(response.result != 0){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: response.message,
                    okText:'确定'
                });
                return;
            }
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: response.message,
                okText:'确定'
            });
            $state.go('security')
        })

    }
})