/**
 * Created by Administrator on 2016/12/22 0022.
 */
app.controller('homeV2Ctrl', function ($scope,$ionicSlideBoxDelegate,$http,$state,$ionicModal,$rootScope,$ionicPopup,$window) {
    //图片轮播

    $ionicSlideBoxDelegate.update();
    //获取banner,城市列表，排名
    $scope.hasmore = true
    $scope.page = 1
    $scope.pagesize = 15
    //获取赛事列表
    $scope.city = {name:'全国',cityNo:-1}
    var getList = function () {
        $http({
            url: SITE_SUFFIX + 'api/competition/list',
            method: 'get',
            params: {cityNo: $scope.city.cityNo}
        }).success(function (response) {
            console.log(response)
            if(response.result != 0){
                return;
            }
            $scope.gameLists = response.message
            if($scope.gameLists.length == 0){
                $scope.hasmore = false
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
            //上拉加载更多
            $scope.loadMore = function () {
                $scope.page +=1
                $http({
                    url:SITE_SUFFIX+'api/competition/list',
                    method:'get',
                    params:{page:$scope.page,pagesize:$scope.pagesize}
                }).success(function (response) {
                    console.log(response)
                    if(response.result != 0){
                        return;
                    }
                    for(var i=0;i<response.message.length;i++){
                        $scope.gameLists.push(response.message[i])
                    }
                    if(response.message.length == 0){
                        $scope.hasmore = false
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                })
            }
        });
    }
    getList()

    $http.get(SITE_SUFFIX + 'api/index/getIndexData').success(function (response) {
        console.log(response)
        if(response.result !=0){
            return;
        }
        //banner
        $scope.bannerImgs = response.message.ad;
        //排名
        $scope.doubleLevelInfo = response.message.doubleLevelInfo;
        $scope.singleLevelInfo = response.message.singleLevelInfo;
        $scope.avatar = response.message.avatar;
        $scope.latestApply = response.message.latestApply;
        //头像边框
        $scope.setBorder = function (singleLevel,doubleLevel) {
            var p = "";
            var t = "";
            if(singleLevel == '风级' ){
                p= '#2DA7E0'
            }
            if(singleLevel == '林级'){
                p= '#009F40'
            }
            if(singleLevel == '火级'){
                p= '#D7000F'
            }
            if(singleLevel == '山级'){
                p= '#717071'
            }
            if(doubleLevel == '风级' ){
                t= '#2DA7E0'
            }
            if(doubleLevel == '林级'){
                t= '#009F40'
            }
            if(doubleLevel == '火级'){
                t= '#D7000F'
            }
            if(doubleLevel == '山级'){
                t= '#717071'
            }
            return {'border-bottom-color': p,'border-left-color': p,'border-top-color': t,'border-right-color': t}
        }
        //位置
        $scope.locations = response.message.citylist
    });
    //打开城市列表窗口
    $ionicModal.fromTemplateUrl('modules/home/templates/cityList.html', {
        scope: $scope,
        animation: 'none'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.getCityList = function() {
        $scope.modal.show();
    };
    //点击某个城市
    $scope.getCity = function (city) {
        $scope.modal.hide();
        $scope.city = city
        //获取该城市比赛列表
        getList()
    }
    //点击全国
    $scope.allCity = function () {
        $scope.city = {name:'全国',cityNo:-1}
        $scope.modal.hide();
        getList()
    }
    //当我们用到模型时，清除它！
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });

    //跳转到详情页
    $scope.toGroupDetails = function (competitionId,type) {
        if(type == 1 || type == 2){
            $state.go('groupDetails_v2',{competitionId:competitionId})
        }
        if(type == 3){
            $state.go('clubGameDetails',{competitionId:competitionId})
        }

    }
    //跳转到我的比赛
    $scope.toMyGames = function(){
        $state.go('myGames')
    }
    //查看积分排名
    $scope.toRank1 = function () {
        $state.go('rank.singleRank1')
    }
    $scope.toRank2 = function () {
        $state.go('rank.doubleRank1')
    }
    //跳转到给自己定级
    $scope.toOwnRanking1 = function () {
        $rootScope.singleLvel = 1
        $state.go('ownRanking')
    }
    $scope.toOwnRanking2 = function () {
        $rootScope.singleLvel = 2
        $state.go('ownRanking')
    }

})
//app.stateProvider

    //详情页
    /*.state('groupDetails_v2', {
        url: '/groupDetails_v2/:competitionId',
        cache:false,
        templateUrl: 'modules/home/templates/groupDetails_v2.html?v=201612191329',
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'modules/home/css/groupDetails_v1.css',
                    'modules/home/controllers/groupDetailsV2Ctrl.js?v=201610091100'
                ]);
            }]
        }
    })*/


