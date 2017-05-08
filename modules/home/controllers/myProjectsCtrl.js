/**
 * Created by Administrator on 2017/1/4 0004.
 */
app.controller('myProjectsCtrl', function ($scope,$state,$stateParams,$http,$interval,$window,$ionicPopup,PaymentOrder) {

    $scope.competitionId = $stateParams.competitionId
    $window.sessionStorage.competitionId = $scope.competitionId
    //获取项目列表
    $http({
        url:SITE_SUFFIX+'api/competition/user/project',
        method:'get',
        params:{competitionId:$scope.competitionId}
    }).success(function (response) {
        console.log(response)
        if(response.result !=0){
            return;
        }
        $scope.projects = response.message
        if($scope.projects.length == 0){
            $state.go('groupDetails_v2',{competitionId:$scope.competitionId});
            return
        }
        for(var i=0;i<$scope.projects.length;i++){
            var second = ($scope.projects[i].createDate)/1000 + 15*60 - ((new Date()).getTime())/1000;
        }
       //var second =  45*60
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

        $scope.toProjectDetails = function (orderId,projectCategory) {
            $window.sessionStorage.orderId = orderId
            $window.sessionStorage.projectCategory = projectCategory
            if(projectCategory == 1){
                $state.go('projectDetails')
            }
            if(projectCategory == 2 ||projectCategory == 3){
                $state.go('dPDetails')
            }

        }

    })



    //点击添加搭档
    $scope.addPartner = function (id,orderId,projectCategory) {
        $window.sessionStorage.orderId = orderId
        $window.sessionStorage.projectCategory = projectCategory
        $state.go('addPartner_v2',{competitionId:id})
    }
    //点击立即支付
    $scope.toPay = function (id,orderId) {
        $window.sessionStorage.orderId = orderId;
        $http.get(SITE_SUFFIX+'api/competition/order/'+orderId).success(function (response) {
            console.log(response)
            if (response.result != 0) {
                return;
            }
            $scope.order = response.message
            PaymentOrder.addOrder($scope.order)
            $state.go('pay',{competitionId:id})
        })

    }
    $scope.toDetails = function () {
        $state.go('groupDetails_v2',{competitionId:$scope.competitionId})
    }
    //立即抽签
    $scope.drawImmediately = function (orderId,projectId) {
        $http({
            url:SITE_SUFFIX+'api/competition/drawlog/addDrawlog',
            method:'post',
            params: {orderId:orderId}
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
                        $window.sessionStorage.projectId = projectId
                        $window.sessionStorage.competitionId = $scope.competitionId
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