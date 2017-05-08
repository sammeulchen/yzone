/**
 * Created by Administrator on 2017/3/17 0017.
 */
app.controller('choiceGradeCtrl', function ($scope,GameInfo,$ionicPopup,$window) {
    /*$scope.choiceGrade = function (_this) {
        console.log(_this)
        $(_this).addClass("on").siblings().removeClass("on");
    }
    $(".set_grade_desc").on("click",function(){
        console.log(111)
        $(this).addClass("on").siblings().removeClass("on");
    })*/

    $scope.devList = [
        {id:1, text:'跟水平相当的对手可以打出回合，对击球方向和落点把握不准确',imgUrl:'img/game_club/wind.png', checked: false },
        {id:2, text:'熟练基本技术，具备一定的攻防能力，对球的方向及落点有一定把握',imgUrl:'img/game_club/forest.png', checked: false },
        {id:3, text:'动作较标准，具有一定比赛经验，能较灵活运用常用羽毛球技战术',imgUrl:'img/game_club/fire.png', checked: false },
        {id:4, text:'经常参加省级以上业余羽毛球比赛，并获得前8名的业余球员',imgUrl:'img/game_club/mount.png', checked: false },
        {id:0, text:'不作级别的限制，任何水平都能参加',imgUrl:'img/game_club/no_limit.png', checked: false }
    ];
    $scope.level = $scope

    $scope.projectDetails = GameInfo.gameInfos
    console.log($scope.projectDetails)
    $scope.level.count = $scope.projectDetails.maxCount
    if($scope.level.count == null){
        $scope.level.count = 0
    }
    $scope.level.classLevel = $scope.projectDetails.classLevel
    //点击减少人数
    $scope.reduceCount = function () {
        $scope.level.count --
        if($scope.level.count <= 0){
            $scope.level.count = 0
        }
    }
    //点击增加人数
    $scope.addCount = function () {
        $scope.level.count ++
    }
    $scope.getLevelCount = function () {
        if($scope.level.count == 0 || $scope.level.count == null){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请您填写参赛人数',
                okText:'确定'
            });
            return;
        }
        if($scope.level.classLevel == null){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请设置比赛级别',
                okText:'确定'
            });
            return;
        }
        GameInfo.addLevel($scope.level.classLevel)
        GameInfo.addMaxCount($scope.level.count)
        $window.history.back()
    }
})