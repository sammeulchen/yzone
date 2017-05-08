/**
 * Created by Administrator on 2016/10/21 0021.
 */
app.controller('whoAddMeCtrl', function ($state,$scope,$http,$ionicPopup) {
    $http.get(SITE_SUFFIX+'api/ucenter/paterner/followedlist').success(function (response) {
        console.log(response)
        $scope.myPartners = response.message
        for(var i=0;i<$scope.myPartners.length;i++){
            if($scope.myPartners[i].status == 1){
                $scope.myPartners[i].waitShow = true
                $scope.myPartners[i].ignoreShow = false
                $scope.myPartners[i].addShow = false
            }
            if($scope.myPartners[i].status == 2){
                $scope.myPartners[i].waitShow = false
                $scope.myPartners[i].ignoreShow = true
                $scope.myPartners[i].addShow = false
            }
            if($scope.myPartners[i].status == 3){
                $scope.myPartners[i].waitShow = false
                $scope.myPartners[i].ignoreShow = false
                $scope.myPartners[i].addShow = true
            }
        }
        //忽略
        $scope.ignoreFriend = function (paternerId) {

            $http({
                url:SITE_SUFFIX+'api/ucenter/paterner/ignoreFollowed',
                method:'post',
                params:{paternerId:paternerId}
            }).success(function (response){
                if(response.result != 0){
                    var alertPopup = $ionicPopup.alert({
                        title: '提示信息',
                        template: response.message,
                        okText:'确定'
                    });
                    return;
                }
                for(var i=0;i<$scope.myPartners.length;i++){
                    if($scope.myPartners[i].paternerId == paternerId){
                        $scope.myPartners[i].waitShow = false
                        $scope.myPartners[i].ignoreShow = true
                        $scope.myPartners[i].addShow = false
                    }
                }


            })
        }
        //添加
        $scope.addFriend = function (paternerId) {

            $http({
                url:SITE_SUFFIX+'api/ucenter/paterner/addFollowed',
                method:'post',
                params:{paternerId:paternerId}
            }).success(function (response){
                if(response.result != 0){
                    var alertPopup = $ionicPopup.alert({
                        title: '提示信息',
                        template: response.message,
                        okText:'确定'
                    });
                    return;
                }
                for(var i=0;i<$scope.myPartners.length;i++){
                    if($scope.myPartners[i].paternerId == paternerId){
                        $scope.myPartners[i].waitShow = false
                        $scope.myPartners[i].ignoreShow = false
                        $scope.myPartners[i].addShow = true
                    }
                }


            })
        }
    })
    

})