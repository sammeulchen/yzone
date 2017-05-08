/**
 * Created by Administrator on 2017/2/22 0022.
 */
app.controller('creditsLogCtrl', function ($scope,$http,$window) {
    $scope.levelId = $window.sessionStorage.levelId
    //积分记录
    $http({
        url:SITE_SUFFIX+'api/ucenter/level/score/history',
        method:'get',
        params:{category:$scope.levelId}
    }).success(function (response) {
        if(response.result != 0){
            return;
        }
        $scope.historyLists = response.message
        for(var i=0;i<$scope.historyLists.length;i++){
            if($scope.historyLists[i].inout == 1){
                $scope.historyLists[i].score = "+"+$scope.historyLists[i].score
            }
        }
        console.log(response)
    })
})