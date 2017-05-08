/**
 * Created by Administrator on 2016/10/13 0013.
 */
app.controller('viewPacketCtrl', function ($scope,$http,$window) {
        var projectId = $window.sessionStorage.projectId
        $http({
            url:SITE_SUFFIX+'api/competition/drawlog/getVsGroupCtalogList',
            method:'post',
            params:{projectId:projectId}
        }).success(function (response) {
            console.log(response)
            $scope.packets = response.message
        })
})