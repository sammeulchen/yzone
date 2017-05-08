/**
 * Created by Administrator on 2016/11/24 0024.
 */
app.controller('groupGradeCtrl', function ($scope,$window,$http) {

    $scope.projectId = $window.sessionStorage.projectId
    //获取成绩
    $scope.singleShow = false
    $scope.doubleShow = false
    $scope.oneThirdShow = false
    $scope.twoThirdShow = false
    $scope.firstShow = false
    $scope.secondShow = false
    $scope.thirdShow = false
    $http({
        url:SITE_SUFFIX+'api/competition/rank/list',
        method:'get',
        params:{projectId:$scope.projectId}
    }).success(function (response) {

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

        $scope.firstPlayers = response.message.first
        $scope.secondPlayers = response.message.second
        $scope.thirdPlayers = response.message.third
        $scope.secondTitle = response.message.secondTitle
        $scope.thirdTitle = response.message.thirdTitle

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
            }
            if($scope.firstPlayers[i].rank == 2){
                $scope.second = $scope.firstPlayers[i]
            }
            if($scope.firstPlayers[i].rank == 3){
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
        console.log(response)
    })
})