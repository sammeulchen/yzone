/**
 * Created by Administrator on 2016/11/18 0018.
 */
app.controller('allRankCtrl', function ($scope,$state,$http,$ionicModal,$ionicPopup) {

    $scope.selectRank = $scope

    $scope.rankUpdownShow = false
    $scope.rankshowDetails1 = false
    $scope.rankshowDetails2 = false
    $scope.rankshowDetails3 = false
    $scope.rankshowDetails6 = false
    $scope.rankshowDetails7 = false
    $http({
        url:SITE_SUFFIX+'api/ucenter/userRankInfo',
        method:'get'
    }).success(function (response) {
        console.log(response)
        if(response.result != 0) {
            return
        }

        $scope.userMsg = response.message

        //排名升降
        if($scope.userMsg.updown < 0 ){
            $scope.rankUpdownShow = true
            $scope.userMsg.updown = '下降'+ Math.abs($scope.userMsg.updown)
        }
        if($scope.userMsg.updown > 0 ){
            $scope.rankUpdownShow = true
            $scope.userMsg.updown = '上升'+ Math.abs($scope.userMsg.updown)
        }

        //图标显示
        if($scope.userMsg.parentLvel == '风级'){
            $scope.userMsg.picUrl = 'wind-white.gif'
        }
        if($scope.userMsg.parentLvel == '林级'){
            $scope.userMsg.picUrl = 'forest-white.gif'
        }
        if($scope.userMsg.parentLvel == '火级'){
            $scope.userMsg.picUrl = 'fire-white.gif'
        }
        if($scope.userMsg.parentLvel == '山级'){
            $scope.userMsg.picUrl = 'mount-white.gif'
        }

        //判断下部分显示情况
        if($scope.userMsg.authStatus == 1){
            $scope.rankshowDetails1 = true
            $scope.rankshowDetails6 = true
        }
        if($scope.userMsg.authStatus == 2){
            $scope.rankshowDetails2 = true
        }
        if($scope.userMsg.authStatus == 3){
            $scope.rankshowDetails1 = true
        }
        if($scope.userMsg.authStatus == 4){
            $scope.rankshowDetails3 = true
        }
        if($scope.userMsg.authStatus == 5){
            $scope.rankshowDetails1 = true
        }

        //判断提示信息显示情况
        if($scope.userMsg.enableLevelChange == true){
            $scope.rankshowDetails7 = true
        }else{
            $scope.rankshowDetails7 = false
        }

        //下拉列表显示
        $scope.rankingGrades = [
            {id:1,name:'风级',picUrl:'wind.gif'},
            {id:2,name:'林级',picUrl:'forest.gif'},
            {id:3,name:'火级',picUrl:'fire.gif'},
            {id:4,name:'山级',picUrl:'mount.gif'}
        ]
        for(var i in $scope.rankingGrades){
            if($scope.userMsg.parentLvel == '风级'){
                $scope.selectRank.rank = $scope.rankingGrades[0]
            }
            if($scope.userMsg.parentLvel == '林级'){
                $scope.selectRank.rank = $scope.rankingGrades[1]
            }
            if($scope.userMsg.parentLvel == '火级'){
                $scope.selectRank.rank = $scope.rankingGrades[2]
            }
            if($scope.userMsg.parentLvel == '山级'){
                $scope.selectRank.rank = $scope.rankingGrades[3]
            }

        }

        //选取不同等级的排名
        $scope.getChangedClass = function () {
            var level = $scope.selectRank.rank.id
            $http({
                url:SITE_SUFFIX+'api/ucenter/rank',
                method:'get',
                params:{level:level}
            }).success(function (response) {
                console.log(response)
                if(response.result== 0){
                    $scope.singlePlayers = response.message
                }
            })
        }


    })


    $scope.hasmore = true
    $scope.page = 1
    $http({
        url:SITE_SUFFIX+'api/ucenter/rank',
        method:'get'
    }).success(function (response) {
        console.log(response)
        if(response.result== 0){
            $scope.singlePlayers = response.message
            $scope.loadMore = function () {
                $scope.page +=1
                $http({
                    url:SITE_SUFFIX+'api/ucenter/rank',
                    method:'get',
                    params:{page:$scope.page}
                }).success(function (response) {
                    console.log(response)
                    if(response.result== 0){
                        for(var i=0;i<response.message.length;i++){
                            $scope.singlePlayers.push(response.message[i])
                        }
                        if(response.message.length < 20){
                            $scope.hasmore = false
                        }
                    }
                })
            }
        }

    })

    $ionicModal.fromTemplateUrl('modules/my/templates/allRank.html', {
        scope: $scope,
        animation: 'none'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.lookMore = function() {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    //当我们用到模型时，清除它！
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });

})