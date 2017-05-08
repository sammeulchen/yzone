/**
 * Created by Administrator on 2017/3/16 0016.
 */
app.controller('createGameCtrl', function ($scope,$state,$http,GameInfo,$ionicPopup,$rootScope) {
    //获取个人信息
    $http.get(SITE_SUFFIX+'api/ucenter/account').success(function (response) {
        console.log(response)
        if (response.result == 20002) {
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '您的信息还未完善，请先去完善您的信息',
                okText: '确定'
            });
            alertPopup.then(function (res) {
                $state.go('improveInfo')
            });
        }
    })

    //获取赛事列表
    $http.get(SITE_SUFFIX+'api/club/competition/category/list').success(function (response) {
        if(response.result !=0){
            return;
        }
        console.log(response)
        $scope.formatLists = response.message
        //跳转到赛制详情
        $scope.toFormat = function (url) {
            event.stopPropagation();
            $state.go(url)
        }
    })

    //跳转到选择项目
    $scope.toChoiceProject = function (formatId,url,name) {
        GameInfo.addFormat(formatId)
        $rootScope.url = url
        $rootScope.name = name
        console.log(GameInfo.gameInfos)
        $state.go('choiceProject',{formatId:formatId})
    }

})