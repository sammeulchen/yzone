/**
 * Created by Administrator on 2017/3/29 0029.
 */
app.controller('clubGradeGroupCtrl', function ($scope,$window,$state,$http) {
    $scope.projectId = $window.sessionStorage.pjId
    $scope.competitionId = $window.sessionStorage.competitionId
    //$scope.pageType = $window.sessionStorage.pageType
    $scope.backToPre = function () {
            $state.go('createGameDetails')
        /*if($scope.pageType == 2){
            $state.go('createGameDetails')
        }*/
    }
    $scope.backToPreUser = function () {
        $state.go('clubGameDetails',{competitionId:$scope.competitionId})
    }

    console.log($scope.projectId)
    $http.get(SITE_SUFFIX+'api/club/vs/getCategoryType/'+$scope.projectId).success(function (response) {
        console.log(response)
        $scope.items = response.message
    })

})