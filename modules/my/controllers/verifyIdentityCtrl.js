/**
 * Created by Administrator on 2016/11/3 0003.
 */
app.controller('verifyIdentityCtrl',function($scope,$state,$http,$interval,$ionicPopup){
    $scope.codeShow = true;
    $scope.codeAgianShow = false
    //获取手机号
    $scope.mobile = null
    $http.get(SITE_SUFFIX+'api/ucenter/profile/getByMobile').success( function (response) {
        console.log(response)
        if(response.result == 0){
            $scope.mobile = response.message
            var verifyCode = {}
            verifyCode.mobile =$scope.mobile
            verifyCode.func = 2
            $scope.getCode = function () {
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
                                $scope.codeAgianShow = false

                            } else {
                                $scope.second--;
                                $scope.codeShow = false;
                                $scope.codeAgianShow = true
                            }
                        }, 1000, 100);
                    }
                })
            }
        }
        if(response.result == 20002){
            $state.go('tab.my')
        }
        if(response.result>0 && response.result != 20002){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: response.message,
                okText:'确定'
            });
        }
    })



    //验证验证码
    $scope.myCode = $scope
    $scope.toLoginPassword = function(){
        var code = $scope.myCode.code
        if(code == null){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请填写验证码',
                okText:'确定'
            });
            return;
        }

        $http({
            url:SITE_SUFFIX+'api/ucenter/profile/verifyMobile',
            method:'post',
            params:{code:code}
        }).success(function (response) {
            if(response.result != 0){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: response.message,
                    okText:'确定'
                });
                return;
            }
            $state.go('loginPassword')
        })

    }

})