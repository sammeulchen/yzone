/**
 * Created by Administrator on 2017/1/5 0005.
 */
app.controller('dPDetailsCtrl', function ($scope,$state,$http,$window,$interval,$ionicPopup,PaymentOrder,$rootScope) {
    $scope.orderId = $window.sessionStorage.orderId
    $scope.competitionId = $window.sessionStorage.competitionId
    $scope.projectCategory = $window.sessionStorage.projectCategory
    console.log($scope.projectCategory)
   /* $scope.tabNames = ['报名信息','搭档信息']
    $scope.slectIndex = 0
    $scope.activeSlide=function(index){//点击时候触发
        $scope.slectIndex=index;
    };
    $scope.pages=["modules/home/templates/regInfo.html","modules/home/templates/partnerInfo.html"]*/

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
        $scope.partnerInfo = response.message.paternerInfo
        $scope.projectInfo = response.message.projectInfo
        $scope.progressInfo = response.message.progressInfo
        $scope.afterApplyDate = response.message.afterApplyDate
        $scope.afterUpdateMemberDate = response.message.afterUpdateMemberDate
        $scope.currentMemberCount = response.message.currentMemberCount
        $scope.maxMemberCount = response.message.maxMemberCount
        $scope.minMemberCount = response.message.minMemberCount
console.log($scope.partnerInfo.pid)
            if($scope.projectCategory == 2){
                $scope.tabNames = ['报名信息','搭档信息']
                $scope.slectIndex = 0
                $scope.activeSlide=function(index){//点击时候触发
                    $scope.slectIndex=index;

                    if(index == 1){
                        if($scope.applyerInfo.orderStatus == 1){
                            if($scope.partnerInfo.length == 0){
                                var alertPopup = $ionicPopup.alert({
                                    title: '提示信息',
                                    template: '您还没有支付，请先去支付然后邀请搭档',
                                    okText: '确定'
                                });
                                alertPopup.then(function(res) {
                                    $scope.slectIndex = 0;
                                });
                            }
                        }

                    }
                }
                $scope.pages=["modules/home/templates/regInfo.html?v=2017","modules/home/templates/partnerInfo.html?v=2017"]
            }
            if($scope.projectCategory == 3){
                $scope.tabNames = ['参赛信息','队员信息']
                $scope.slectIndex = 0
                $scope.activeSlide=function(index){//点击时候触发
                    $scope.slectIndex=index;

                    if(index == 1){
                        if($scope.applyerInfo.orderStatus == 1){
                            if($scope.partnerInfo.length == 0){
                                var alertPopup = $ionicPopup.alert({
                                    title: '提示信息',
                                    template: '您还没有支付，请先去支付然后邀请队员',
                                    okText: '确定'
                                });
                                alertPopup.then(function(res) {
                                    $scope.slectIndex = 0;
                                });
                            }
                        }

                    }
                }
                $scope.pages=["modules/home/templates/regInfo.html","modules/home/templates/partnerInfo.html"]
            }


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

        //删除搭档\队员
        $scope.deletePartner = function (id,index) {
            console.log(id)
            var confirmPopup = $ionicPopup.confirm({
                title: '提示信息',
                template: '确定要删除该队员吗？',
                cancelText: '取消',
                okText: '确定'
            });
            confirmPopup.then(function(res) {
                if (res) {
                    $http({
                        url: SITE_SUFFIX + 'api/competition/order/member/delete',
                        method: 'post',
                        params: {pid: id,orderId:$scope.orderId}
                    }).success(function (response) {
                        console.log(response)
                        if(response.result != 0){
                            var alertPopup = $ionicPopup.alert({
                                title: '提示信息',
                                template: response.message,
                                okText: '确定'
                            });
                            return
                        }
                        if(response.result == 0){
                            $http({
                                url:SITE_SUFFIX+'api/competition/user/project/'+$scope.orderId,
                                method:'get'
                            }).success(function (response) {
                                $scope.applyerInfo = response.message.applyInfo
                                $scope.partnerInfo = response.message.paternerInfo
                                $scope.projectInfo = response.message.projectInfo
                                $scope.progressInfo = response.message.progressInfo
                                $scope.afterApplyDate = response.message.afterApplyDate
                                $scope.currentMemberCount = response.message.currentMemberCount
                                $scope.maxMemberCount = response.message.maxMemberCount
                                $scope.minMemberCount = response.message.minMemberCount
                                console.log(response)
                            })
                           /* $scope.partnerInfo.splice(index, 1);
                            console.log($scope.partnerInfo)
                            if($scope.partnerInfo.length == 0){

                                $state.go('myProjects',{competitionId:$scope.competitionId})
                            }*/
                        }

                    })
                }
            })
        }
    })

    $http.get(SITE_SUFFIX+'api/competition/order/'+$scope.orderId).success(function (response) {
        console.log(response)
        if(response.result != 0){
            return;
        }
        $scope.order = response.message
        PaymentOrder.addOrder($scope.order)
        //修改搭档\队员
        $scope.changePartner = function (type,id) {
            console.log(id)
            $rootScope.pid = id
            if(type == 0){
                $state.go('editPartner',{competitionId:$scope.order.competitionId})
            }else{
                $state.go('addPartner_v2',{competitionId:$scope.order.competitionId})
            }
        }


        //修改个人信息
        $scope.toUserReg = function () {
            $state.go('userReg',{competitionId:$scope.order.competitionId})
        }
        //修改项目信息
        $scope.toSelectedProject = function () {

            $state.go('changeProject',{competitionId:$scope.order.competitionId})
        }

        //修改团队名称
        $scope.changeInfo1 = function () {
            $rootScope.teamName = $scope.order.teamName
            $rootScope.coachName = null
            $rootScope.applyerName = null
            $rootScope.mobile = null
            $state.go('changeUserInfo')
        }
        $scope.changeInfo3 = function () {
            $rootScope.teamName = null
            $rootScope.coachName = $scope.order.coachName
            $rootScope.applyerName = null
            $rootScope.mobile = null
            $state.go('changeUserInfo')
        }
        $scope.changeInfo2 = function () {
            $rootScope.teamName = null
            $rootScope.coachName = null
            $rootScope.applyerName = $scope.order.realname
            $rootScope.mobile = $scope.order.applyUsermobile
            console.log($scope.order.applyerName)
            console.log($scope.order.mobile)
            $state.go('changeUserInfo')
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
                        params: {orderId: $scope.orderId, wechatName: null}
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
        $scope.cancelRegP = function () {
            
        }
        //添加队员、搭档
        $scope.addNewPartner = function(){
            $state.go('addPartner_v2',{competitionId:$scope.order.competitionId})
        }
        //返回
        $scope.toMyProjects = function () {
            $state.go('myProjects',{competitionId:$scope.order.competitionId})
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

    //查看球友信息
    $scope.toBallFriend = function (userId) {
        if(userId == null){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '该用户未在羽众平台完善信息',
                okText: '确定'
            });
            return
        }
        $window.sessionStorage.friendId = userId
        $state.go('ballFriend')
    }

    //更换领队
    $scope.changeLeader = function (competitionId,orderId) {
        var confirmPopup = $ionicPopup.confirm({
            template: '领队位置转让成功后，与比赛相关的一切事宜将会仅由新领队负责。',
            okText:'确定',
            cancelText:'取消'
        });
        confirmPopup.then(function(res) {
            if(res) {
                $window.sessionStorage.orderId = orderId
                $state.go('selectedLeader',{competitionId:competitionId})
            }
        });

    }

})