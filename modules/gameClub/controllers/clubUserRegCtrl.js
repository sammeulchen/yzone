/**
 * Created by Administrator on 2017/3/23 0023.
 */
app.controller('clubUserRegCtrl', function ($scope,$state,$http,$ionicLoading,$interval,$ionicPopup,$window) {
    $scope.projectId = $window.sessionStorage.pjId;
    //获取用户信息
    $scope.sexs = [
        {id:1,text:'男'},
        {id:0,text:'女'}
    ]

    $scope.selectSex = $scope

    var gender = 1
    for(var i in $scope.sexs){
        $scope.selectSex.sex=$scope.sexs[0];
    }
    $scope.changeSex = function () {
        gender = $scope.selectSex.sex.id
    }
    $http({
        url:SITE_SUFFIX+'api/competition/profile/get',
        method:'get'
    }).success( function (response) {
        console.log(response)
        $scope.members = response.message
        //有用户信息显示的性别
        if($scope.members.mobile != null){
            if($scope.members.gender != null){
                if($scope.members.gender == 1){
                    $scope.selectSex.sex=$scope.sexs[0];
                    gender =1;
                }
                if($scope.members.gender == 0){
                    $scope.selectSex.sex=$scope.sexs[1];
                    gender =0;
                }
            }
        }


        //验证码
        var verifyCode= {

        }
        $scope.userInf = $scope
        $scope.paracont = "获取验证码";
        $scope.paraclass = "send-code";
        $scope.paraevent = true;
        $scope.getCode = false;
        $scope.sendCode = function () {

            //verifyCode.mobile = ($scope.userInf.mobile).replace(/-/g,'')
            verifyCode.mobile = $scope.userInf.mobile
            console.log(verifyCode.mobile )
            verifyCode.func = 2
            //判断手机号
            var telReg = /^1[3|4|5|7|8]\d{9}$/
            if (verifyCode.mobile == null || verifyCode.mobile == "") {
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: '电话号码不能为空',
                    okText:'确定'
                });
                return
            }
            if (!telReg.test(verifyCode.mobile)) {
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: '请填写正确的电话号码',
                    okText:'确定'
                });
                return
            }
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                noBackdrop:true
            });
            $http({
                url: SITE_SUFFIX + 'api/verifycode/send',
                method: 'post',
                params: verifyCode
            }).success(function (response) {
                $ionicLoading.hide()
                console.log(response)
                if (response.result == 0) {

                    var second = 60,
                        timePromise = undefined;

                    timePromise = $interval(function () {
                        if (second <= 0) {
                            $interval.cancel(timePromise);
                            timePromise = undefined;

                            second = 60;
                            $scope.paracont = "获取验证码";
                            $scope.getCode = false;
                            $scope.paraclass = "send-code";
                            $scope.paraevent = true;
                        } else {
                            $scope.paracont = second + "s后重新获取";
                            $scope.getCode = true;
                            $scope.paraclass = "send-code-click";
                            second--;
                        }
                    }, 1000, 100);
                } else {
                    var alertPopup = $ionicPopup.alert({
                        title: '提示信息',
                        template: response.message
                    });
                    alertPopup.then(function(res) {
                    });
                    $scope.showTimer = false
                }
            })
        }
        $scope.changeMobile = function () {
            $state.go('verifyIdentity')
        }
        //判断羽众申明状态
        $scope.isDisabled = true;
        $scope.changeStates = function () {
            if($scope.isDisabled == true) {
                $scope.isDisabled = false;
            }else{
                $scope.isDisabled = true;
            }
        }
        //查看羽众免责声明
        $scope.toDisclaimer = function () {
            $state.go('disclaimer')
        }
        //提交填写的信息
        var submitInfo = {}
        $scope.toSetLevel = function (mobile) {

            //submitInfo.projectId = $scope.projectId
            submitInfo.nickName = $scope.members.nickName
            submitInfo.gender = gender
            submitInfo.mobile = $scope.userInf.mobile
            submitInfo.verifyCode = $scope.members.indCode

            console.log(submitInfo)
            //对需要填的信息进行判断
            //姓名
            var nameReg = /^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\.\s]{1,20})$/
            if (submitInfo.nickName == "" || submitInfo.nickName == null) {
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: '姓名不能为空',
                    okText: '确定'
                });
                return
            }
            if (!nameReg.test(submitInfo.nickName)) {
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: '请填写正确的姓名',
                    okText: '确定'
                });
                return
            }
            if ($scope.members.mobile == null || $scope.members.mobile == ''){
                if (submitInfo.mobile == null || submitInfo.mobile == "") {
                    //判断手机号
                    var telReg = /^1[3|4|5|7|8]\d{9}$/
                    if (submitInfo.mobile == null || submitInfo.mobile == "") {
                        var alertPopup = $ionicPopup.alert({
                            title: '提示信息',
                            template: '电话号码不能为空',
                            okText: '确定'
                        });
                        return
                    }
                    if (!telReg.test(submitInfo.mobile)) {
                        var alertPopup = $ionicPopup.alert({
                            title: '提示信息',
                            template: '请填写正确的电话号码',
                            okText: '确定'
                        });
                        return
                    }
                    //判断验证码
                    if (submitInfo.verifyCode == null || submitInfo.verifyCode == "") {
                        var alertPopup = $ionicPopup.alert({
                            title: '提示信息',
                            template: '请填写验证码',
                            okText: '确定'
                        });
                        return
                    }
                }
            }
            if($scope.isDisabled == false) {
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: '请您阅读并同意羽众免责声明',
                    okText:'确定'
                });
                return;
            }
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                noBackdrop:true
            });

            $http({
                url: SITE_SUFFIX + 'api/competition/profile/save',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(submitInfo)
            }).success(
                function (res) {
                    $ionicLoading.hide()
                    if(res.result != 0){
                        var alertPopup = $ionicPopup.alert({
                            title: '提示信息',
                            template: res.message,
                            okText:'确定'
                        });
                        return
                    }
                    $state.go('setLevel',{projectId:$scope.projectId})
                }
            )
        }


        //设置等级
        $scope.toRegNext = function () {
            submitInfo.nickName = $scope.members.nickName
            submitInfo.gender = gender
            submitInfo.mobile = $scope.userInf.mobile
            submitInfo.verifyCode = $scope.members.indCode

            console.log(submitInfo)
            //对需要填的信息进行判断
            //姓名
            var nameReg = /^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\.\s]{1,20})$/
            if(submitInfo.nickName == "" || submitInfo.nickName ==  null){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: '姓名不能为空',
                    okText:'确定'
                });
                return
            }
            if(!nameReg.test(submitInfo.nickName)){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: '请填写正确的姓名',
                    okText:'确定'
                });
                return
            }
            if ($scope.members.mobile == null || $scope.members.mobile == ''){
                if (submitInfo.mobile == null || submitInfo.mobile == "") {
                    //判断手机号
                    var telReg = /^1[3|4|5|7|8]\d{9}$/
                    if (submitInfo.mobile == null || submitInfo.mobile == "") {
                        var alertPopup = $ionicPopup.alert({
                            title: '提示信息',
                            template: '电话号码不能为空',
                            okText: '确定'
                        });
                        return
                    }
                    if (!telReg.test(submitInfo.mobile)) {
                        var alertPopup = $ionicPopup.alert({
                            title: '提示信息',
                            template: '请填写正确的电话号码',
                            okText: '确定'
                        });
                        return
                    }
                    //判断验证码
                    if (submitInfo.verifyCode == null || submitInfo.verifyCode == "") {
                        var alertPopup = $ionicPopup.alert({
                            title: '提示信息',
                            template: '请填写验证码',
                            okText: '确定'
                        });
                        return
                    }
                }
            }
            if($scope.isDisabled == false) {
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: '请您阅读并同意羽众免责声明',
                    okText:'确定'
                });
                return;
            }
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                noBackdrop:true
            });
            $http({
                url: SITE_SUFFIX + 'api/competition/profile/save',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(submitInfo)
            }).success(
                function (res) {
                    $ionicLoading.hide()
                    if(res.result != 0){
                        var alertPopup = $ionicPopup.alert({
                            title: '提示信息',
                            template: res.message,
                            okText:'确定'
                        });
                        return
                    }
                    $http({
                        url: SITE_SUFFIX + 'api/club/comopetition/member/appy',
                        method: 'post',
                        params: {projectId:$scope.projectId}
                    }).success(
                        function (res) {
                            $ionicLoading.hide()
                            if (res.result != 0) {
                                var alertPopup = $ionicPopup.alert({
                                    title: '提示信息',
                                    template: res.message,
                                    okText: '确定'
                                });
                                return
                            }
                            $state.go('clubMyProject',{projectId:$scope.projectId})

                        }
                    )

                })

        }
    })

})