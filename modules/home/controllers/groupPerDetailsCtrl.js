/**
 * Created by Administrator on 2016/9/6 0006.
 */
app.controller('groupPerDetailsCtrl',function($scope,$state,$http,$ionicPopup,$window){

    var projectId = $window.sessionStorage.projectId
    var competitionId = $window.sessionStorage.competitionId
    console.log(projectId)
    $scope.lists = [
        {name:'A1'},
        {name:'A2'},
        {name:'A3'},
        {name:'A4'}
    ]

    $scope.getTab = function () {
        console.log(111)
    }

    $scope.toGradeDes = function () {
        var alertPopup = $ionicPopup.alert({
            title: '打算打算：都爱所都奥索',
            template: '<div><span style="margin-right: 40px">第一局</span><span>21:12</span></div><div><span style="margin-right: 40px">第一局</span><span>21:12</span></div><div><span style="margin-right: 40px">第一局</span><span>21:12</span></div>',
            okText:'确定'
        });
        alertPopup.then(function(res) {

        });
    }

    $http({
        url:SITE_SUFFIX+'api/competition/vsGroupScore',
        method:'get',
        params:{projectId:projectId}
    }).success(function (response) {
        console.log(response)
        if(response.result != 0 && response.result != 10009){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template:response.message,
                okText:'确定'
            });
            alertPopup.then(function(res) {
                $window.history.back()
            });
        }

        if(response.result == 0){

            $scope.gameGrades = response.message
            if($scope.gameGrades.length == 0){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template:'没有分组信息',
                    okText:'确定'
                });
                alertPopup.then(function(res) {
                    $window.history.back()
                });
            }

            for(var i = 0;i<$scope.gameGrades.length;i++){
                for (var j=0;j<$scope.gameGrades[i].list.length;j++){
                    $scope.gameGrades[i].height = 44*($scope.gameGrades[i].list[j].length)
                    $scope.gameGrades[i].length1 = 1/($scope.gameGrades[i].list[j].length)
                }

            }

        }

    })


    //返回上一页
    $scope.backToPre = function () {
        $state.go('groupDetails_v2',{competitionId:competitionId});
    }



})