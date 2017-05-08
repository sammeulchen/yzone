/**
 * Created by Administrator on 2017/3/29 0029.
 */
app.controller('clubGroupMatchCtrl', function ($scope,$http,$window,$state,$rootScope,$ionicPopup) {


    $scope.projectId = $window.sessionStorage.pjId;

    //获取轮数
    $http.get(SITE_SUFFIX+'api/club/vs/getRoundList/'+$scope.projectId+'/'+0).success(function (response) {
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
        console.log(response)
    })
    $scope.roundIndexNum = $rootScope.roundIndex
    console.log($scope.roundIndexNum)

    if($scope.roundIndexNum == null){
        $scope.roundNum = 0
        $scope.roundIndexNum = 1
    }
    if($scope.roundIndexNum != null){
        $scope.roundNum = $scope.roundIndexNum - 1
        $scope.roundIndexNum = $scope.roundIndexNum
    }

    //获取比分录入情况
    $http.get(SITE_SUFFIX+'api/club/vs/getVsList/'+$scope.projectId+'/0/'+$scope.roundIndexNum).success(function (response) {
        console.log(response)
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
    $scope.getRound = function (num) {
        $scope.roundNum = num
        $scope.roundIndexNum = num + 1
        console.log($scope.roundIndexNum)
        //获取比分录入情况
        $http.get(SITE_SUFFIX+'api/club/vs/getVsList/'+$scope.projectId+'/0/'+$scope.roundIndexNum).success(function (response) {
            console.log(response)
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

    //点击录入比分
    /*$scope.toEntryScore = function (name1,name2,position1,position2,id1,id2,category) {
        $rootScope.name1 = name1
        $rootScope.name2 = name2
        $rootScope.position1 = position1
        $rootScope.position2 = position2
        $rootScope.id1 = id1
        $rootScope.id2 = id2
        $rootScope.category = category
        $rootScope.roundIndex = $scope.roundIndexNum
        $rootScope.type = 0
        $state.go('entryScore',{projectId:$scope.projectId})
    }*/
    $scope.toEntryScore = function (gradeDetail) {
        console.log(gradeDetail)
        $rootScope.gradeDetail = gradeDetail
        $rootScope.roundIndex = $scope.roundIndexNum
        $rootScope.type = 0
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
            $state.go('clubGradeGroup.clubKnockout')
        })
    }
    $scope.getRank1 = function () {
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