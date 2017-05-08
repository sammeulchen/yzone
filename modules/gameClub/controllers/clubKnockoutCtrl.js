/**
 * Created by Administrator on 2017/3/29 0029.
 */
app.controller('clubKnockoutCtrl', function ($scope,$http,$window,$state,$rootScope,$ionicPopup) {

    $scope.projectId = $window.sessionStorage.pjId;
    $scope.roundNum = 0
    $scope.roundIndexNum1 = null
    //获取轮数
    $http.get(SITE_SUFFIX+'api/club/vs/getRoundList/'+$scope.projectId+'/'+1).success(function (response) {
        if(response.result != 0){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: response.message,
                okText:'确定'
            });
            alertPopup.then(function(res) {
                $window.history.back()
                $window.history.back()
            });
            return;
        }
        $scope.rounds = response.message
        //$scope.roundIndexNum = $scope.rounds[0].roundIndex
       // $scope.roundIndexNum1 = $rootScope.roundIndex
        console.log($scope.roundIndexNum1)
        console.log(response)
        if($scope.roundIndexNum1 == null){
            $scope.roundNum = 0
            $scope.roundIndexNum1 = $scope.rounds[0].roundIndex
        }else{
            for(var i=0;i<$scope.rounds.length;i++){
                console.log($scope.rounds[i].roundIndex)
                if($scope.rounds[i].roundIndex == $scope.roundIndexNum1){
                    $scope.roundNum = i
                    //$scope.roundIndexNum = $scope.roundIndexNum
                    break;
                }

            }
        }

        //获取比分录入情况
        $http.get(SITE_SUFFIX+'api/club/vs/getVsList/'+$scope.projectId+'/1/'+$scope.roundIndexNum1).success(function (response) {
            console.log(response)
            $scope.gradeDetails = response.message
            if(response.result != 0){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: response.message,
                    okText:'确定'
                });
                $state.go('clubGradeGroup.clubGroupMatch')
            }

            for(var i=0;i<$scope.gradeDetails.length;i++){
                if($scope.gradeDetails[i].category == 2){
                    $scope.gradeDetails[i].player1.avatar1 = $scope.gradeDetails[i].player1.avatar.split(',')[0]
                    $scope.gradeDetails[i].player2.avatar1 = $scope.gradeDetails[i].player2.avatar.split(',')[0]
                    $scope.gradeDetails[i].player1.avatar2 = $scope.gradeDetails[i].player1.avatar.split(',')[1]
                    $scope.gradeDetails[i].player2.avatar2 = $scope.gradeDetails[i].player2.avatar.split(',')[1]
                    $scope.gradeDetails[i].player1.playerName1 = $scope.gradeDetails[i].player1.playerName.split(',')[0]
                    $scope.gradeDetails[i].player2.playerName1 = $scope.gradeDetails[i].player2.playerName.split(',')[0]
                    $scope.gradeDetails[i].player1.playerName2 = $scope.gradeDetails[i].player1.playerName.split(',')[1]
                    $scope.gradeDetails[i].player2.playerName2 = $scope.gradeDetails[i].player2.playerName.split(',')[1]
                }
                if($scope.gradeDetails[i].score.length != 0){
                    $scope.gradeDetails[i].score = JSON.parse($scope.gradeDetails[i].score)
                }
            }
        })
        $scope.getRound = function (num,idx) {
            var _this = $scope.roundIndexNum1
            $scope.roundNum = num
            $scope.roundIndexNum1 = idx
            console.log($scope.roundIndexNum1)
            //获取比分录入情况
            $http.get(SITE_SUFFIX+'api/club/vs/getVsList/'+$scope.projectId+'/1/'+$scope.roundIndexNum1).success(function (response) {
                console.log(response)
                if(response.result != 0){
                    var alertPopup = $ionicPopup.alert({
                        title: '提示信息',
                        template: response.message,
                        okText:'确定'
                    });
                    return;
                }
                $scope.gradeDetails = response.message

                for(var i=0;i<$scope.gradeDetails.length;i++){
                    if($scope.gradeDetails[i].category == 2){
                        $scope.gradeDetails[i].player1.avatar1 = $scope.gradeDetails[i].player1.avatar.split(',')[0]
                        $scope.gradeDetails[i].player2.avatar1 = $scope.gradeDetails[i].player2.avatar.split(',')[0]
                        $scope.gradeDetails[i].player1.avatar2 = $scope.gradeDetails[i].player1.avatar.split(',')[1]
                        $scope.gradeDetails[i].player2.avatar2 = $scope.gradeDetails[i].player2.avatar.split(',')[1]
                        $scope.gradeDetails[i].player1.playerName1 = $scope.gradeDetails[i].player1.playerName.split(',')[0]
                        $scope.gradeDetails[i].player2.playerName1 = $scope.gradeDetails[i].player2.playerName.split(',')[0]
                        $scope.gradeDetails[i].player1.playerName2 = $scope.gradeDetails[i].player1.playerName.split(',')[1]
                        $scope.gradeDetails[i].player2.playerName2 = $scope.gradeDetails[i].player2.playerName.split(',')[1]
                    }
                    if($scope.gradeDetails[i].score.length != 0){
                        $scope.gradeDetails[i].score = JSON.parse($scope.gradeDetails[i].score)
                    }
                }
            })
        }
    })



    //点击录入比分
    $scope.toEntryScore = function (gradeDetail) {
        console.log(gradeDetail)
        $rootScope.gradeDetail = gradeDetail
        $rootScope.roundIndex = $scope.roundIndexNum1
        $rootScope.type = 1
        $state.go('entryScore',{projectId:$scope.projectId})
    }
    //计算排名
    $scope.getRank = function () {
        $http.get(SITE_SUFFIX+'api/club/vs/finishVsScoreFill/'+$scope.projectId).success(function(response){
            console.log(response)
            if(response.result != 0){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: response.message,
                    okText:'确定'
                });
                return;
            }
            $state.go('clubGradeGroup.clubGrade')
        })
    }

})