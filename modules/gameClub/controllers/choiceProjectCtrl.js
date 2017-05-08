/**
 * Created by Administrator on 2017/3/16 0016.
 */
app.controller('choiceProjectCtrl',function($scope,$state,$stateParams,$http,GameInfo,$ionicPopup,$rootScope){
    $scope.formatId = $stateParams.formatId
    $scope.url = $rootScope.url
    $scope.name = $rootScope.name

    //获取项目列表
    $scope.project = $scope
    $scope.project.projectId = GameInfo.gameInfos.projectId
    $http.get(SITE_SUFFIX+'api/club/competition/category/project/'+$scope.formatId).success(function (response) {
        console.log(response)
        $scope.projectDetails = GameInfo.gameInfos

        console.log($scope.projectDetails)
        if(response.result !=0){
            return;
        }
        $scope.projectLists = response.message
        $scope.toChangeGrade = function (cProjectId) {
            $state.go('choiceGrade',{cProjectId:cProjectId})
            GameInfo.addProject(cProjectId)
            console.log(GameInfo.gameInfos)
        }
        $scope.toFormat = function(){
            $state.go($scope.url)
        }

    })


    $scope.toCreateGameDetails = function () {
        if(GameInfo.gameInfos.projectId == null){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请先选取项目',
                okText:'确定'
            });
            return;
        }
        if(GameInfo.gameInfos.classLevel == null ){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请设置比赛级别',
                okText:'确定'
            });
            return;
        }
        $state.go('writeGameInfo')
    }


})