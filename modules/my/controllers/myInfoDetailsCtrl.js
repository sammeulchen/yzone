/**
 * Created by Administrator on 2016/10/20 0020.
 */
app.controller('myInfoDetailsCtrl', function ($scope,$state,$http) {
    //获取个人基本资料信息
    $http.get(SITE_SUFFIX+'api/ucenter/account').success(function (response) {
        console.log(response)
        if(response.result != 0 && response.result != 20002){
            return
        }
        if(response.result == 0){
            $scope.userInfo = response.message
            if($scope.userInfo.unreadMsgCount > 0){
                $scope.noMsgShow = true
            }
            if($scope.userInfo.competitonUpdateCount > 0){
                $scope.competitionShow = true
            }
            if($scope.userInfo.friendMsgCount > 0){
                $scope.friendShow = true
            }
            if($scope.userInfo.gender == 1){
                $scope.manShow = true
            }
            if($scope.userInfo.gender == 0){
                $scope.womanShow = true
            }
            if($scope.userInfo.age >= 0){
                $scope.myAgeShow = true
            }
            if($scope.userInfo.totalPoint == 0){
                $scope.userInfo.totalPoint = '敬请期待'
                $scope.toMyExperience = function () {
                    var alertPopup = $ionicPopup.alert({
                        title: '提示信息',
                        template: '该功能暂未开放，敬请期待！',
                        okText:'确定'
                    });
                }
            }

            //判断头像背景
            $scope.setBg = function (singleClassLevel) {
                var p = "";
                var t = "";
                var m = "";
                var n = "";
                if(singleClassLevel == '风级'){
                    p='url("img/wind-top.png") no-repeat'
                    t = "66px 33px"
                    $scope.singleLevelPic = "wind-white.gif"
                }
                if(singleClassLevel == '林级'){
                    p='url("img/forest-top.png") no-repeat'
                    t = "66px 33px"
                    $scope.singleLevelPic = "forest-white.gif"
                }
                if(singleClassLevel == '火级'){
                    p='url("img/fire-top.png") no-repeat'
                    t = "66px 33px"
                    $scope.singleLevelPic = "fire-white.gif"
                }
                if(singleClassLevel == '山级'){
                    p='url("img/mount-top.png") no-repeat'
                    t = "66px 33px"
                    $scope.singleLevelPic = "mount-white.gif"
                }
                return {"background": p,"background-size":t};

            }
            $scope.setBg1 = function (doubleClassLevel) {
                var p = "";
                var t = "";
                if(doubleClassLevel == '风级'){
                    p='url("img/wind-btm.png") no-repeat'
                    t = "66px 33px"
                    $scope.doubleLevelPic = "wind-white.gif"
                }
                if(doubleClassLevel == '林级'){
                    p='url("img/forest-btm.png") no-repeat'
                    t = "66px 33px"
                    $scope.doubleLevelPic = "forest-white.gif"
                }
                if(doubleClassLevel == '火级'){
                    p='url("img/fire-btm.png") no-repeat'
                    t = "66px 33px"
                    $scope.doubleLevelPic = "fire-white.gif"
                }
                if(doubleClassLevel == '山级'){
                    p='url("img/mount-btm.png") no-repeat'
                    t = "66px 33px"
                    $scope.doubleLevelPic = "mount-white.gif"
                }
                return {"background": p,"background-size":t};

            }

            //设置界别字体颜色
            $scope.setColor = function (status) {
                p = "";
                if(status == '风级'){
                    p = '#00A0E9'
                }
                if(status == '林级'){
                    p = '#00A040'
                }
                if(status == '火级'){
                    p = '#D6000F'
                }
                if(status == '山级'){
                    p = '#43403F'
                }
                return {"color":p}
            }



            //判断是否定级
            $scope.rankBeforeShow = false
            $scope.rankLastShow = false
            if($scope.userInfo.singleLevelSet == true){
                $scope.rankLastShow1 = true
            }else{
                $scope.rankBeforeShow1 = true
            }
            if($scope.userInfo.doubleLevelSet == true){
                $scope.rankLastShow2 = true
            }else{
                $scope.rankBeforeShow2 = true
            }

            //判断等级显示
            if($scope.userInfo.singleClassLevel == null || $scope.userInfo.singleClassLevel == "" || $scope.userInfo.singleClassLevel == " "){
                $scope.singleGradeShow = false
            }else{
                $scope.singleGradeShow = true
            }
            if($scope.userInfo.doubleClassLevel == null || $scope.userInfo.doubleClassLevel == "" || $scope.userInfo.doubleClassLevel == " "){
                $scope.doubleGradeShow = false
            }else{
                $scope.doubleGradeShow = true
            }



        }
        if(response.result == 20002){
            var confirmPopup = $ionicPopup.confirm({
                title: '提示信息',
                template: '您的信息还未完善，请先去完善您的信息',
                okText:'确定',
                cancelText:'取消'
            });
            confirmPopup.then(function(res) {
                if(res) {
                    $state.go('improveInfo')
                }
            });
        }
    })

    $http.get(SITE_SUFFIX+'api/ucenter/profile/get').success(function (response) {
        console.log(response)
        if(response.result != 0){
            return
        }
        $scope.userInfos = response.message
        $scope.myCodes = response.message.credentialList

        $scope.noMsgShow = false
        $scope.competitionShow = false
        $scope.friendShow = false
        $scope.manShow = false
        $scope.womanShow = false
        $scope.myAgeShow = false
        $scope.singleGradeShow = false
        $scope.doubleGradeShow = false


        $scope.setBorder = function (status,level) {
            var p = ""
            var t = ""
            if(status == true){
                t = 'none'
                if(level == '风级'){
                    p = '#00A0E9'
                }
                if(level == '林级'){
                    p = '#00A040'
                }
                if(level == '火级'){
                    p = '#D6000F'
                }
                if(level == '山级'){
                    p = '#43403F'
                }
            }else{
                p = '#B5B6B6'
                if(level == '风级'){
                    t = '2px solid #00A0E9'
                }
                if(level == '林级'){
                    t = '2px solid #00A040'
                }
                if(level == '火级'){
                    t = '2px solid #D6000F'
                }
                if(level == '山级'){
                    t = '2px solid #43403F'
                }
            }
            return {"background":p,"border":t}
        }

        console.log(response)
    })



    //跳转到修改个人资料
    $scope.changeMyInfo = function () {
        $state.go('changeMyInfo')
    }


})