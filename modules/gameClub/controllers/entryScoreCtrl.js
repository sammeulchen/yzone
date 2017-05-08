/**
 * Created by Administrator on 2017/3/29 0029.
 */
app.controller('entryScoreCtrl', function ($scope,$rootScope,$stateParams,$http,$ionicPopup,$window) {
    /*$scope.projectId = $stateParams.projectId
    $scope.name1 = $rootScope.name1
    $scope.name2 =$rootScope.name2
    $scope.position1 =$rootScope.position1
    $scope.position2 =$rootScope.position2
    $scope.id1 =$rootScope.id1
    $scope.id2 =$rootScope.id2
    $scope.category =$rootScope.category
    $scope.roundIndex =$rootScope.roundIndex
    $scope.type =$rootScope.type
    if($scope.category == 2){
        $scope.player1 = $scope.name1.split(',')[0]
        $scope.player2 = $scope.name1.split(',')[1]
        $scope.player11 = $scope.name2.split(',')[0]
        $scope.player22 = $scope.name2.split(',')[1]
    }*/
    $scope.projectId = $stateParams.projectId
    $scope.gradeDetail = $rootScope.gradeDetail
    console.log($scope.gradeDetail)
    $scope.roundIndex =$rootScope.roundIndex
    $scope.type =$rootScope.type
    if($scope.gradeDetail.category == 2){
        $scope.player1 = $scope.gradeDetail.player1.playerName.split(',')[0]
        $scope.player2 = $scope.gradeDetail.player1.playerName.split(',')[1]
        $scope.player11 = $scope.gradeDetail.player2.playerName.split(',')[0]
        $scope.player22 = $scope.gradeDetail.player2.playerName.split(',')[1]
    }

    $scope.entryScore1 = $scope
    $scope.entryScore2 = $scope
    $scope.entryScore3 = $scope
    $scope.total = $scope
    $scope.smallScore1 = {}
    $scope.smallScore2 = {}
    $scope.smallScore3 = {}
    $scope.smallScore = []
    $scope.submitInfo = {}
    $scope.getScore = function () {

        $scope.smallScore = []
        $scope.score1 = $scope.entryScore1.score1
        $scope.score2 = $scope.entryScore1.score2
        $scope.score3 = $scope.entryScore2.score11
        $scope.score4 = $scope.entryScore2.score22
        $scope.score5 = $scope.entryScore3.score111
        $scope.score6 = $scope.entryScore3.score222
        if($scope.entryScore1.score1 == null){
            $scope.score1 = -1
        }
        if($scope.entryScore1.score2 == null){
            $scope.score2 = -1
        }
        if($scope.entryScore2.score11 == null){
            $scope.score3 = -1
        }
        if($scope.entryScore2.score22 == null){
            $scope.score4 = -1
        }
        if($scope.entryScore2.score111 == null){
            $scope.score5 = -1
        }
        if($scope.entryScore2.score222 == null){
            $scope.score6 = -1
        }
        $scope.smallScore1.score = $scope.score1 + ':' + $scope.score2
        $scope.smallScore2.score = $scope.score3 + ':' + $scope.score4
        $scope.smallScore3.score = $scope.score5 + ':' + $scope.score6
        $scope.smallScore1.index = 1
        $scope.smallScore2.index = 2
        $scope.smallScore3.index = 3
        if($scope.score1 != -1 && $scope.score2 != -1){
            $scope.smallScore.push($scope.smallScore1)
        }
        if($scope.score3 != -1 && $scope.score4 != -1){
            $scope.smallScore.push($scope.smallScore2)
        }
        if($scope.score5 != -1 && $scope.score6 != -1){
            $scope.smallScore.push($scope.smallScore3)
        }
        console.log($scope.smallScore)
        $scope.player1Score = $scope.total.player1Score
        $scope.player2Score = $scope.total.player2Score
        if($scope.player1Score == null || $scope.player2Score == null){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请录入总比分',
                okText:'确定'
            });
            return;
        }
        $scope.submitInfo.projectId = $scope.projectId
        $scope.submitInfo.smallScore = $scope.smallScore
        $scope.submitInfo.player1Score = $scope.player1Score
        $scope.submitInfo.player2Score = $scope.player2Score
        $scope.submitInfo.player1Id = $scope.gradeDetail.player1.id
        $scope.submitInfo.player2Id = $scope.gradeDetail.player2.id
        $scope.submitInfo.roundIndex = $scope.roundIndex
        $scope.submitInfo.type = $scope.type

        if($scope.submitInfo.type == 1){
            $scope.submitInfo.position = $scope.gradeDetail.player1.position
        }

        $http({
            url:SITE_SUFFIX+'api/club/vs/addVsScore',
            method:'post',
            //headers:{ "Content-Type": "application/json" },
            params:{params:JSON.stringify($scope.submitInfo)}
        }).success(function (response) {
            if(response.result != 0){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: response.message,
                    okText:'确定'
                });
                return;
            }
            $window.history.back()
            $rootScope.roundIndex = $scope.roundIndex
        })
    }
})