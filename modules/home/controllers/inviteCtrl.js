/**
 * Created by Administrator on 2017/1/10 0010.
 */
app.controller('inviteCtrl', function ($scope,$state,$http,$rootScope,$window,PaymentOrder) {
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    $scope.orderId = getQueryString('orderId')
    $scope.pid = getQueryString('pid')

    $http.get(SITE_SUFFIX+'api/competition/order/projectInfo/'+$scope.orderId).success(function (response) {
        console.log(response)
        if(response.result != 0){
            return;
        }
        $scope.compInfo = response.message.compInfo
        $scope.orderInfo = response.message.orderInfo
        $scope.applyerInfo = response.message.applyerInfo
        $scope.projectItems = $scope.compInfo.projectItems
        //点击接受邀请
        $scope.toReg = function () {
            var isPartner = true
            $rootScope.isPartner = true
            PaymentOrder.addOrder(isPartner)
            $window.sessionStorage.orderId = $scope.orderId
            $window.sessionStorage.pid = $scope.pid
            $rootScope.projectCategory = $scope.orderInfo.projectCategory
            $state.go('userReg',{competitionId:$scope.compInfo.competitionId})
        }
        //跳转到详情页
        $scope.toGroupDetails = function () {
            $state.go('groupDetails_v2',{competitionId:$scope.compInfo.competitionId})
        }
    })
})