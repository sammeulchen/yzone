/**
 * Created by Administrator on 2016/10/20 0020.
 */
app.controller('myPartnerCtrl', function ($scope,$state,$http,$window,$ionicPopup) {

    //获取搭档列表
    $http({
        url:SITE_SUFFIX+'api/ucenter/paterner/list',
        method:'post'
    }).success(function (response) {
        console.log(response)
        if(response.result !=0){
            return;
        }
        $scope.myPartners = response.message
        $scope.myPartners1=[]
        $scope.myPartners2=[]
        if($scope.myPartners.length ==0){
            return;
        }
        for(var i=0;i<$scope.myPartners.length;i++){
            if($scope.myPartners[i].yzoneId ==null || $scope.myPartners[i].yzoneId == 0){
                $scope.myPartners2.push($scope.myPartners[i])
            }else{
                $scope.myPartners1.push($scope.myPartners[i])
            }
        }

    })
    $scope.friendMsgCount = $window.sessionStorage.friendMsgCount
    $scope.friendCountShow = false
    if($scope.friendMsgCount >0){
        $scope.friendCountShow = true
    }

    //点击添加按钮
    $scope.showAlert = function(){
        $scope.alertShow = true
    }
    $scope.alertMiss = function () {
        $scope.alertShow = false
    }

    //点击添加新队员
    $scope.toAddPlayers = function(){
        $scope.alertShow = false
        $state.go('addTeamMember')
    }
    //点击谁添加了我
    $scope.toWhoAddMe = function(){
        $scope.alertShow = false
        $state.go('whoAddMe')
    }

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


    //修改队员信息
    $scope.editPlayer = function(paternerId,name,mobile,gender){

        $window.sessionStorage.realname = name
        $window.sessionStorage.mobile = mobile
        $window.sessionStorage.gender = gender
        $state.go('editPlayersInfo',{paternerId:paternerId})
    }

    //删除队员

    $scope.deletePlayer = function (paternerId) {
        var paternerId = paternerId
        var confirmPopup = $ionicPopup.confirm({
            title: '提示信息',
            template: '确定要删除该队员吗？',
            cancelText: '取消',
            okText: '确定'
        });
        confirmPopup.then(function(res) {
            if(res){
                $http({
                    url:SITE_SUFFIX+'api/ucenter/paterner/delete',
                    method:'post',
                    params:{paternerId:paternerId}
                }).success(function(response){
                    if(response.result == 0){
                        console.log(response)

                        //删除完成后再次获取列表
                        $http({
                            url:SITE_SUFFIX+'api/ucenter/paterner/list',
                            method:'post',
                            params:{page:1,pagesize:20}
                        }).success(
                            function (response) {
                                console.log(response)
                                //判断是否是羽众会员
                                $scope.myPartners = response.message
                                $scope.myPartners1=[]
                                $scope.myPartners2=[]
                                if($scope.myPartners.length ==0){
                                    return;
                                }
                                for(var i=0;i<$scope.myPartners.length;i++){
                                    if($scope.myPartners[i].yzoneId ==null || $scope.myPartners[i].yzoneId == 0){
                                        $scope.myPartners2.push($scope.myPartners[i])
                                    }else{
                                        $scope.myPartners1.push($scope.myPartners[i])
                                    }
                                }
                            }
                        )
                    }
                })
            }
        })
    }

})