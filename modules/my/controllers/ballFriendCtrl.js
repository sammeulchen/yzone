/**
 * Created by Administrator on 2016/11/3 0003.
 */
app.controller('ballFriendCtrl', function ($scope,$state,$http,$window,$ionicPopup) {
    var friendId = $window.sessionStorage.friendId

    if( friendId == null || friendId == "null" ||  friendId == ""){
        var alertPopup = $ionicPopup.alert({
            title: '提示信息',
            template: '无法获取该用户的信息',
            okText:'确定'
        });
        alertPopup.then(function(res) {
            $window.history.back()
        });
        return
    }
   // 获取球友信息
    $scope.rankBefore1 = false
    $scope.rankBefore2 = false
    $scope.rankLast1 = false
    $scope.rankLast2 = false
    $http({
        url:SITE_SUFFIX+'api/ucenter/profile/get',
        method:'post',
        params:{userId:friendId}
    }).success(function (response) {
        if(response.result != 0){
            return
        }
        $scope.friendInfo = response.message
        if($scope.friendInfo.singleRank == 0){
            $scope.rankBefore1 = false
            $scope.rankLast1 = true
        }else{
            $scope.rankBefore1 = true
            $scope.rankLast1 = false
        }
        if($scope.friendInfo.doubleRank == 0){
            $scope.rankBefore2 = false
            $scope.rankLast2 = true
        }else{
            $scope.rankBefore2 = true
            $scope.rankLast2 = false
        }

        if($scope.friendInfo.company == "" || $scope.friendInfo.company == null){
            $scope.friendInfo.company = "该用户未填写"
        }
        if($scope.friendInfo.school == "" || $scope.friendInfo.school == null){
            $scope.friendInfo.school = "该用户未填写"
        }
        if($scope.friendInfo.goodAtProjects == "" || $scope.friendInfo.goodAtProjects == null){
            $scope.friendInfo.goodAtProjects = "该用户未填写"
        }
        if($scope.friendInfo.joinedList == "" || $scope.friendInfo.joinedList == null){
            $scope.friendInfo.joinedList = "该用户未填写"
        }
        if($scope.friendInfo.racket == "" || $scope.friendInfo.racket == null){
            $scope.friendInfo.racket = "该用户未填写"
        }
        if($scope.friendInfo.stadium == "" || $scope.friendInfo.stadium == null){
            $scope.friendInfo.stadium = "该用户未填写"
        }

        $scope.setClor = function (status) {
            var s = ""
            var t = ""
            if(status == "该用户未填写"){
                s = "#727171"
                t = "14px"
            }
            return {"color":s,"font-size":t}
        }
        //判断字体颜色
        $scope.setColor = function (level) {
            var p = ""
            if(level.charAt(0) == "风"){
                p = '#00A0E9'
                $scope.picUrl = "wind.gif"
            }
            if(level.charAt(0) == "林"){
                p = '#00A040'
                $scope.picUrl = "forest.gif"
            }
            if(level.charAt(0) == "火"){
                p = '#D6000F'
                $scope.picUrl = "fire.gif"
            }
            if(level.charAt(0) == "山"){
                p = '#43403F'
                $scope.picUrl = "mount.gif"
            }
            return {"color":p}
        }

        console.log(response)
    })





    //获取球友参与的赛事列表
    $http.get(SITE_SUFFIX+'api/ucenter/profile/competition/list/'+friendId).success(function (response) {
        if(response.result != 0){
            return
        }
        $scope.friendGameLists = response.message

        console.log(response)
    })
})