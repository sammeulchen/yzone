/**
 * Created by Administrator on 2016/10/20 0020.
 */
app.controller('isEndCtrl',function($scope,$state,$http){
    $scope.noGameShow = false

    $http({
        url:SITE_SUFFIX+'api/ucenter/project/list',
        method:'post',
        params:{status:5}
    }).success(function (response) {
        console.log(response.message)
        if(response.result != 0 ){
            return
        }
        $scope.gameLists = response.message

        //跳转到团体赛详情页面
        $scope.toGroupDetails = function(competitionId){
            $state.go('groupDetails_v2',{competitionId:competitionId});
        }
    })

})