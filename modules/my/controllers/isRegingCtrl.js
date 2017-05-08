/**
 * Created by Administrator on 2016/10/20 0020.
 */
app.controller('isRegingCtrl',function($scope,$state,$http){
    $scope.noGameShow = false
    $scope.hasmore = true
    $scope.page = 1
    $http({
        url:SITE_SUFFIX+'api/ucenter/project/list',
        method:'post',
        params:{type:0}
    }).success(function (response) {
        console.log(response)
        if(response.result != 0 ){
            return
        }
        $scope.gameLists = response.message
        if($scope.gameLists.length == 0){
            $scope.hasmore = false
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.loadMore = function () {
            $scope.page +=1
            $http({
                url:SITE_SUFFIX+'api/ucenter/project/list',
                method:'get',
                params:{page:$scope.page}
            }).success(function (response) {
                console.log(response)
                if(response.result != 0){
                    return;
                }
                for(var i=0;i<response.message.length;i++){
                    $scope.gameLists.push(response.message[i])
                }
                if(response.message.length == 0){
                    $scope.hasmore = false
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
            })
        }

        //跳转到团体赛详情页面
        $scope.toGroupDetails = function(competitionId){
            $state.go('groupDetails_v2',{competitionId:competitionId});
        }
    })
})