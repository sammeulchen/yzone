/**
 * Created by Administrator on 2016/8/15 0015.
 */
app.controller('gameTimeCtrl', function ($scope,$state,$ionicModal,$window,$rootScope) {

    //添加时间
    var EDIT_MODE = 1;
    var ADD_MODE = -1;
    $scope.isShow = false;
    $scope.dateTimeData={
        date:null,
        startTime:null,
        endTime:null
    };
    $scope.gameTimes = [

    ];

    var date = 0
    $scope.addTime = function (event,e) {
        console.log(111)

        $scope.mode = ADD_MODE;
        $scope.isShow = true;
        var startTimes = angular.element(document.querySelector('.start-time'))
        var endTimes = angular.element(document.querySelector('.end-time'))
        var startTime = (startTimes[0].innerText).replace(/年 |月/g,'-')
        var startTime = startTime.replace(/日/g,'')
        var endTime = (endTimes[0].innerText).slice(13,18)
        date = ++date

        var item = {
            dateTimeData:{
                date:date,
                startTime:startTime,
                endTime:endTime
            }
        }
        $scope.$emit("controller.addData", item);

    }



    $scope.$on("controller.addData", function(event, e) {
        var dateTimeData = e.dateTimeData;
        $scope.gameTimes.push(dateTimeData);
       

        console.log($scope.gameTimes)
    });
    $scope.removegameTimes = function(index) {
        if($window.confirm("确定要删除该条信息?")) {
            $scope.gameTimes.splice(index, 1);
        }
        date = --date
        console.log($scope.gameTimes)


    }
    $scope.backToPre = function (){
       $state.go('releaseSingleGame',{
           obj:{
               id:1
           }
       })
    }

})