/**
 * Created by Administrator on 2017/3/24 0024.
 */
app.controller('clubMyProjectCtrl', function ($scope,$stateParams,$http,$ionicPopup,$window,$state) {
    $scope.projectId = $stateParams.projectId
    $scope.competitionId = $window.sessionStorage.competitionId
    $http.get(SITE_SUFFIX+'api/club/competition/getMyProjectDetail/'+$scope.projectId).success(function (response) {
        console.log(response)
        $scope.applyerInfo = response.message.userInfo
        $scope.project = response.message.project
        $scope.position = response.message.position
        $scope.category = response.message.category
        $scope.paternerInfo = response.message.paternerInfo
        $scope.id = response.message.id
        $scope.pid = response.message.pid
    })
    $scope.tabNames = ['报名信息','搭档信息']
    $scope.slectIndex = 0
    $scope.activeSlide=function(index){//点击时候触发
        $scope.slectIndex=index;
    };
    $scope.pages=["modules/gameClub/templates/clubMyProjectPage.html","modules/gameClub/templates/clubPartnerPage.html?v=0.1"]
    //取消报名
    $scope.cancelReg = function (id) {
        var confirmPopup = $ionicPopup.confirm({
            template: '您确定要取消报名吗?',
            okText:'确定',
            cancelText:'取消'
        });
        confirmPopup.then(function(res) {
            if(res) {
                $http.get(SITE_SUFFIX+'api/club/competition/cancelApply/'+id).success(function (response) {
                    console.log(response)
                    if(response.result != 0){
                        var alertPopup = $ionicPopup.alert({
                            title: '提示信息',
                            template: response.message,
                            okText:'确定'
                        });
                        return
                    }
                    $state.go('clubGameDetails',{competitionId:$scope.competitionId})
                    console.log(response)
                })
            }
        });

    }
    //添加搭档
    $scope.addNewPartner = function(){
        $state.go('clubAllPlayers',{projectId:$scope.projectId})
    }

    //删除搭档
    $scope.deletePartner = function (pid) {
        var confirmPopup = $ionicPopup.confirm({
            template: '您确定要删除您的搭档吗?',
            okText:'确定',
            cancelText:'取消'
        });
        confirmPopup.then(function(res) {
            if(res) {
                $http.get(SITE_SUFFIX+'api/club/competition/removePaterner/'+pid).success(function (response) {
                    console.log(response)
                    if(response.result != 0){
                        var alertPopup = $ionicPopup.alert({
                            title: '提示信息',
                            template: response.message,
                            okText:'确定'
                        });
                        return
                    }
                    $http.get(SITE_SUFFIX+'api/club/competition/getMyProjectDetail/'+$scope.projectId).success(function (response) {
                        console.log(response)
                        $scope.applyerInfo = response.message.userInfo
                        $scope.project = response.message.project
                        $scope.position = response.message.position
                        $scope.category = response.message.category
                        $scope.paternerInfo = response.message.paternerInfo
                        $scope.id = response.message.id
                        $scope.pid = response.message.pid
                    })
                })
            }
        });
    }
    //返回
    $scope.backToDetails = function () {
        $state.go('clubGameDetails',{competitionId:$scope.competitionId})
    }
})