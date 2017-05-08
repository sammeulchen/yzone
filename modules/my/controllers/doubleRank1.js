/**
 * Created by Administrator on 2016/11/30 0030.
 */
/**
 * Created by Administrator on 2016/11/30 0030.
 */
app.controller("doubleRank1", function ($http,$scope,$window,$state) {
    var level = $window.sessionStorage.level
    var gender = $window.sessionStorage.gender

    $scope.hasmore = true
    $scope.page = 1
    $http({
        url:SITE_SUFFIX+'api/ucenter/level/rank',
        method:'get',
        params:{category:2,level:level,gender:gender}
    }).success(function (response) {
        console.log(response)
        if(response.result== 0){
            $scope.singlePlayers = response.message
            var rank = $scope.singlePlayers[$scope.singlePlayers.length-1].rank
            var score = $scope.singlePlayers[$scope.singlePlayers.length-1].score
            $scope.loadMore = function () {
                $scope.page +=1
                $http({
                    url:SITE_SUFFIX+'api/ucenter/level/rank',
                    method:'get',
                    params:{category:2,page:$scope.page,level:level,score:score,gender:gender}
                }).success(function (response) {
                    console.log(response)
                    if(response.result== 0){
                        for(var i=0;i<response.message.length;i++){
                            $scope.singlePlayers.push(response.message[i])
                            console.log($scope.singlePlayers)
                        }
                        rank = $scope.singlePlayers[$scope.singlePlayers.length-1].rank
                        score = $scope.singlePlayers[$scope.singlePlayers.length-1].score
                        if(response.message.length < 30){
                            $scope.hasmore = false
                        }
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    }
                })
            }
        }

    })
    //名次背景
    $scope.setRankBg = function(rank){
        var p = "";
        var t = "";
        var s = "";
        if(rank == 1){
            p = "url(img/rank-one.png) center top no-repeat"
            t = "19px 19px"
            s = "#ffffff"
        }
        if(rank == 2){
            p = "url(img/rank-two.png) center top no-repeat"
            t = "19px 19px"
            s = "#ffffff"
        }
        if(rank == 3){
            p = "url(img/rank-three.png) center top no-repeat"
            t = "19px 19px"
            s = "#ffffff"
        }
        return {"background":p,"background-size":t,"color":s}
    }
    //查看别人资料
    $scope.toBallFriend = function (current,userId) {
        if(current){

            $state.go("tab.my")
        }else{
            $window.sessionStorage.friendId = userId
            $state.go('ballFriend')
        }
    }
})