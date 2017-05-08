/**
 * Created by Administrator on 2017/3/30 0030.
 */
/**
 * Created by Administrator on 2016/11/24 0024.
 */
app.controller('clubGradeCtrl', function ($scope,$window,$http) {

    $scope.projectId = $window.sessionStorage.pjId
    //获取成绩
    $scope.singleShow = false
    $scope.doubleShow = false
    $scope.oneThirdShow = false
    $scope.twoThirdShow = false
    $scope.firstShow = false
    $scope.secondShow = false
    $scope.thirdShow = false
    $http({
        url:SITE_SUFFIX+'api/club/competition/rank/list/'+$scope.projectId,
        method:'get'
    }).success(function (response) {
        console.log(response)
        if(response.result != 0 ){
            return;
        }
        if(response.message.category == 1 || response.message.category == 3){
            $scope.singleShow = true
        }
        if(response.message.category == 2){
            $scope.doubleShow = true
        }
        $scope.category = response.message.category
        //1-3名

        $scope.firstPlayers = response.message.first.list
        $scope.secondPlayers = response.message.second.list
        $scope.thirdPlayers = response.message.third.list
        $scope.secondTitle = response.message.second.title
        $scope.thirdTitle = response.message.third.title

        if($scope.firstPlayers.length != 0){
            $scope.firstShow = true
        }
        if($scope.secondPlayers.length != 0){
            $scope.secondShow = true
        }
        if($scope.thirdPlayers.length != 0){
            $scope.thirdShow = true
        }

        $scope.third = []
        for(var i=0;i<$scope.firstPlayers.length;i++){
            if($scope.firstPlayers[i].rank == 1){
                $scope.first = $scope.firstPlayers[i]
                $scope.first.player1Avatar = $scope.first.avatar.split(',')[0]
                $scope.first.player2Avatar = $scope.first.avatar.split(',')[1]
                $scope.first.player1Name = $scope.first.playerName.split(',')[0]
                $scope.first.player2Name = $scope.first.playerName.split(',')[1]
            }
            if($scope.firstPlayers[i].rank == 2){
                $scope.second = $scope.firstPlayers[i]
                $scope.second.player1Avatar = $scope.second.avatar.split(',')[0]
                $scope.second.player2Avatar = $scope.second.avatar.split(',')[1]
                $scope.second.player1Name = $scope.second.playerName.split(',')[0]
                $scope.second.player2Name = $scope.second.playerName.split(',')[1]
            }
            if($scope.firstPlayers[i].rank == 3){
                $scope.firstPlayers[i].player1Avatar = $scope.firstPlayers[i].avatar.split(',')[0]
                $scope.firstPlayers[i].player2Avatar = $scope.firstPlayers[i].avatar.split(',')[1]
                $scope.firstPlayers[i].player1Name = $scope.firstPlayers[i].playerName.split(',')[0]
                $scope.firstPlayers[i].player2Name = $scope.firstPlayers[i].playerName.split(',')[1]
                $scope.third.push($scope.firstPlayers[i])
                if($scope.third.length ==1){
                    $scope.oneThirdShow = true
                    $scope.twoThirdShow = false
                }
                if($scope.third.length ==2){
                    $scope.oneThirdShow = false
                    $scope.twoThirdShow = true
                }
            }
        }
        for(var i=0;i<$scope.secondPlayers.length;i++){
            $scope.secondPlayers[i].player1Avatar = $scope.secondPlayers[i].avatar.split(',')[0]
            $scope.secondPlayers[i].player2Avatar = $scope.secondPlayers[i].avatar.split(',')[1]
            $scope.secondPlayers[i].player1Name = $scope.secondPlayers[i].playerName.split(',')[0]
            $scope.secondPlayers[i].player2Name = $scope.secondPlayers[i].playerName.split(',')[1]
        }
        for(var i=0;i<$scope.thirdPlayers.length;i++){
            $scope.thirdPlayers[i].player1Avatar = $scope.thirdPlayers[i].avatar.split(',')[0]
            $scope.thirdPlayers[i].player2Avatar = $scope.thirdPlayers[i].avatar.split(',')[1]
            $scope.thirdPlayers[i].player1Name = $scope.thirdPlayers[i].playerName.split(',')[0]
            $scope.thirdPlayers[i].player2Name = $scope.thirdPlayers[i].playerName.split(',')[1]
        }
    })
})