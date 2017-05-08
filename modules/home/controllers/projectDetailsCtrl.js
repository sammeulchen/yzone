/**
 * Created by Administrator on 2017/1/4 0004.
 */
app.controller('projectDetailsCtrl', function ($scope,$state,$http,$window,$interval,PaymentOrder,$ionicPopup) {
    $scope.orderId = $window.sessionStorage.orderId
//获取项目详情
    $http({
        url:SITE_SUFFIX+'api/competition/user/project/'+$scope.orderId,
        method:'get'
    }).success(function (response) {
        console.log(response)
        if(response.result != 0){
            return;
        }
        $scope.applyerInfo = response.message.applyInfo
        $scope.afterApplyDate = response.message.afterApplyDate
        $scope.projectInfo = response.message.projectInfo
        $scope.progressInfo = response.message.progressInfo
        var second = ($scope.applyerInfo.orderCreateDate)/1000 + 15*60 - ((new Date()).getTime())/1000;

        timePromise = undefined;

        timePromise = $interval(function () {
            if (second <= 0) {
                $interval.cancel(timePromise);
                timePromise = undefined;
            } else {
                $scope.paracont = second;
                second--;
            }
        }, 1000, 100);
    })

    //获取order
    $http.get(SITE_SUFFIX+'api/competition/order/'+$scope.orderId).success(function (response) {
        console.log(response)
        if(response.result != 0){
            return;
        }
        $scope.order = response.message
        PaymentOrder.addOrder($scope.order)
        //修改个人信息
        $scope.toUserReg = function () {
            $state.go('userReg',{competitionId:$scope.order.competitionId})
        }
        //修改项目信息
        $scope.toSelectedProject = function () {
            $state.go('changeProject',{competitionId:$scope.order.competitionId})
        }
        //点击立即支付
        $scope.toPay = function () {
            $window.sessionStorage.orderId = $scope.orderId;
            $state.go('pay',{competitionId:$scope.order.competitionId})
        }
        //取消报名
        $scope.cancelReg = function (orderId) {
            var confirmPopup = $ionicPopup.confirm({
                title: '提示信息',
                template: '如已支付报名费，工作人员会在三个工作日内联系您线下退款。',
                cancelText: '取消',
                okText: '确定'
            });
            confirmPopup.then(function(res) {
                if (res) {
                    $http({
                        url: SITE_SUFFIX + 'api/competition/order/cancel',
                        method: 'post',
                        params: {orderId: orderId, wechatName: null}
                    }).success(function (re) {
                        if(response.result != 0){
                            var alertPopup = $ionicPopup.alert({
                                title: '提示信息',
                                template: response.message,
                                okText:'确定'
                            });
                            return;
                        }
                        $state.go('myProjects',{competitionId:$scope.order.competitionId})
                    })
                }
            })
        }
        //立即抽签
        $scope.drawImmediately = function () {
            $http({
                url:SITE_SUFFIX+'api/competition/drawlog/addDrawlog',
                method:'post',
                params: {orderId:$scope.orderId}
            }).success(function (response) {
                console.log(response)
                if(response.result == 0){
                    var confirmPopup = $ionicPopup.confirm({
                        // title: '提示信息',
                        template: '<p style=" text-align: center">您的抽签结果是'+response.message+'</p>'+'<p style=" text-align: center">祝您取得好成绩！</p>',
                        cancelText:'返回',
                        okText:'查看分组'
                    });
                    confirmPopup.then(function(res) {
                        if(res) {
                            $window.sessionStorage.projectId = $scope.order.projectId
                            $window.sessionStorage.competitionId = $scope.order.competitionId
                            $state.go('groupPerDetails')
                        }else {
                            $state.go('projectDetails')
                        }
                    });
                }
                if(response.result>0 && response.result !=1009){
                    var alertPopup = $ionicPopup.alert({
                        title: '提示信息',
                        template: response.message,
                        okText:'确定'
                    });
                }

            })

        }
    })

})