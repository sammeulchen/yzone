/**
 * Created by Administrator on 2016/12/29 0029.
 */
app.controller('payCtrl', function ($scope,$state,$stateParams,$http,PaymentOrder,$window,$ionicPopup,$ionicLoading) {
    $scope.competitionId = $stateParams.competitionId;
    $scope.order = PaymentOrder.PayOrder
    if($scope.order.amount == 0){
        $scope.method = 3;
    }else{
        $scope.method = 2;
    }
    if($scope.order.allowOfflinePay == 1){
        $scope.method = 2;
    }
    if($scope.order.allowOfflinePay == 2){
        $scope.method = 3;
    }



    //修改个人信息
    $scope.toUserReg = function (competitionId) {
        if($scope.order.projectCategory == 2 || $scope.order.projectCategory == 1){
            $state.go('userReg',{competitionId:competitionId})
        }
        if($scope.order.projectCategory == 3){
            $state.go('groupUserReg',{competitionId:competitionId})
        }

    }
    //修改项目信息
    $scope.toSelectedProject = function (competitionId) {
        $state.go('selectedProject',{competitionId:competitionId})
    }

    //支付
    // 调用微信支付方式
    var wechatPay = function(response) {
        console.log(response)
        var signData = response.wechatSignParam;
        var paySign = signData.sign;
        var orderId = response.orderId;
        WeixinJSBridge.invoke('getBrandWCPayRequest', {
            "appId" : signData.appid,
            "timeStamp" : signData.timestamp,
            "nonceStr" : signData.noncestr,
            "package" : signData.packageinfo,
            "signType" : 'MD5',
            "paySign" : signData.sign
        }, function(res) {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
                if($scope.order.projectCategory == 1){
                    var alertPopup = $ionicPopup.alert({
                        title: '提示信息',
                        template: '报名成功',
                        okText:'确定'
                    });
                    alertPopup.then(function(res) {
                        $window.sessionStorage.orderId = orderId
                        $state.go('myProjects',{competitionId:$scope.competitionId})
                    });
                }
                if($scope.order.projectCategory == 2 || $scope.order.projectCategory == 3 ){
                    var alertPopup = $ionicPopup.alert({
                        title: '提示信息',
                        template: '您还需要邀请搭档或队员，点击确定进行下一步操作',
                        okText:'确定'
                    });
                    alertPopup.then(function(res) {
                        $window.sessionStorage.projectCategory = $scope.order.projectCategory
                        $window.sessionStorage.orderId = orderId
                        $state.go('addPartner_v2',{competitionId:$scope.competitionId})
                    });

                }
            } else if (res.err_msg == "get_brand_wcpay_request:cancel") {

            } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                console.log(res)
               // $state.go('groupDetails_v2',{competitionId:$scope.competitionId})
            }
        });

    };
    $scope.payment = $scope
    $scope.toPay = function(orderId,projectCategory) {
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            noBackdrop:true
        });
        $scope.method = $scope.payment.method
        console.log($scope.method)
        var params = {
            orderId : $scope.order.id,
            paymethod : $scope.method
        };

        $http({
            url : SITE_SUFFIX + 'api/competition/order/toPay',
            method : 'post',
            params : params
        }).success(function(data) {
            console.log(data)
            if (data.result != 0) {
                alert(data.message);
                return;
            }
            var response = data.message;
            var orderId = response.orderId;
            if ($scope.method == 2) {
                $ionicLoading.hide()
                wechatPay(response);
                return;
            }
            if ($scope.method == 3) {
                $ionicLoading.hide()
                if($scope.order.projectCategory == 1){
                    var alertPopup = $ionicPopup.alert({
                        title: '提示信息',
                        template: '报名成功',
                        okText:'确定'
                    });
                    alertPopup.then(function(res) {
                        $window.sessionStorage.orderId = orderId
                        $state.go('myProjects',{competitionId:$scope.competitionId})
                    });
                }
                if($scope.order.projectCategory == 2 || $scope.order.projectCategory == 3){
                    var alertPopup = $ionicPopup.alert({
                        title: '提示信息',
                        template: '您还需要邀请搭档或队员，点击确定进行下一步操作',
                        okText:'确定'
                    });
                    alertPopup.then(function(res) {
                        $window.sessionStorage.projectCategory = projectCategory
                        $window.sessionStorage.orderId = orderId
                        $state.go('addPartner_v2',{competitionId:$scope.competitionId})
                    });

                }

            }

        });

    }

    $scope.toMyProjects = function (orderId,projectCategory) {
        $window.sessionStorage.orderId = orderId
        $state.go('myProjects',{competitionId:$scope.competitionId})
    }

    //不需支付
   /* $scope.toReg = function (orderId,projectCategory) {
        if($scope.order.projectCategory == 1){
            $window.sessionStorage.orderId = orderId
            $state.go('myProjects',{competitionId:$scope.competitionId})

        }
        if($scope.order.projectCategory == 2 || $scope.order.projectCategory == 3){
            $window.sessionStorage.projectCategory = projectCategory
            $window.sessionStorage.orderId = orderId
            $state.go('addPartner_v2',{competitionId:$scope.competitionId})
        }
    }*/
})