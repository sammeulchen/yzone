/**
 * Created by Administrator on 2016/8/13 0013.
 */
app.controller('eventsDetailsGroupManCtrl',function($scope,$state,$window,$ionicPopup){

    //男团
    $scope.manEvents = [
        {id:0,name:'男单',count:0},
        {id:1,name:'男双',count:0},
        {id:2,name:'男子3V3',count:0}
    ]
    $scope.manPlayers = [
        {id:0,name:'男队员',count:0},
        {id:1,name:'替补男队员',count:0}
    ]
    //女团
    $scope.womanEvents = [
        {id:0,name:'女单',count:0},
        {id:1,name:'女双',count:0},
        {id:2,name:'女子3V3',count:0}
    ]
    $scope.womanPlayers = [
        {id:0,name:'女队员',count:0},
        {id:1,name:'替补女队员',count:0}
    ]
    //混团
    $scope.mixedEvents = [
        {id:0,name:'男单',count:0},
        {id:1,name:'男双',count:0},
        {id:2,name:'女单',count:0},
        {id:3,name:'女双',count:0},
        {id:4,name:'男子3V3',count:0},
        {id:5,name:'女子3V3',count:0},
        {id:6,name:'混合3V3',count:0}
    ]
    $scope.mixedPlayers = [
        {id:0,name:'男队员',count:0},
        {id:1,name:'女队员',count:0},
        {id:2,name:'替补男队员',count:0},
        {id:3,name:'替补女队员',count:0}
    ]

    $scope.eventId = $window.sessionStorage.eventId

    $scope.manShow = false
    $scope.womanShow = false
    $scope.mixedShow = false
    if($scope.eventId == 1){
        $scope.manShow = true
    }
    if($scope.eventId == 2){
        $scope.womanShow = true
    }
    if($scope.eventId == 3){
        $scope.mixedShow = true
    }



    $scope.reduce1 = function (id) {
        var needCount = $scope.manEvents[id].count
        needCount--
        if (needCount < 0) {
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '最少需要0位队员',
                okText: '确定'
            });
            needCount =0
            return
        }
        $scope.manEvents[id].count = needCount
    }
    $scope.add1 = function (id) {
        var needCount = $scope.manEvents[id].count
        needCount++

        $scope.manEvents[id].count = needCount
    }

    $scope.reduce2 = function (id) {
        var needCount = $scope.manPlayers[id].count
        needCount--
        if (needCount < 0) {
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '最少需要0位队员',
                okText: '确定'
            });
            needCount =0
            return
        }
        $scope.manPlayers[id].count = needCount
    }
    $scope.add2 = function (id) {
        var needCount = $scope.manPlayers[id].count
        needCount++
        $scope.manPlayers[id].count = needCount
    }

    $scope.reduce3 = function (id) {
        var needCount = $scope.womanEvents[id].count
        needCount--
        if (needCount < 0) {
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '最少需要0位队员',
                okText: '确定'
            });
            needCount =0
            return
        }
        $scope.womanEvents[id].count = needCount
    }
    $scope.add3 = function (id) {
        var needCount = $scope.womanEvents[id].count
        needCount++

        $scope.womanEvents[id].count = needCount
    }
    $scope.reduce4 = function (id) {
        var needCount = $scope.womanPlayers[id].count
        needCount--
        if (needCount < 0) {
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '最少需要0位队员',
                okText: '确定'
            });
            needCount =0
            return
        }
        $scope.womanPlayers[id].count = needCount
    }
    $scope.add4 = function (id) {
        var needCount = $scope.womanPlayers[id].count
        needCount++

        $scope.womanPlayers[id].count = needCount
    }
    $scope.reduce5 = function (id) {
        var needCount = $scope.mixedEvents[id].count
        needCount--
        if (needCount < 0) {
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '最少需要0位队员',
                okText: '确定'
            });
            needCount =0
            return
        }
        $scope.mixedEvents[id].count = needCount
    }
    $scope.add5 = function (id) {
        var needCount = $scope.mixedEvents[id].count
        needCount++

        $scope.mixedEvents[id].count = needCount
    }
    $scope.reduce6 = function (id) {
        var needCount = $scope.mixedPlayers[id].count
        needCount--
        if (needCount < 0) {
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '最少需要0位队员',
                okText: '确定'
            });
            needCount =0
            return
        }
        $scope.mixedPlayers[id].count = needCount
    }
    $scope.add6 = function (id) {
        var needCount = $scope.mixedPlayers[id].count
        needCount++

        $scope.mixedPlayers[id].count = needCount
    }
   /* var reduceAdd = function (name1,name2,name3) {
        name1 = function (id) {
            var needCount = name3[id].count
            needCount++

            name3[id].count = needCount
        }
        name2 = function (id) {
            var needCount = name3[id].count
            needCount--
            if (needCount <= 0) {
                alert('最少需要0位')
                return
            }
            name3[id].count = needCount
        }
    }

    reduceAdd($scope.reduce1,$scope.add1,$scope.manEvents)*/
    /* reduceAdd('reduce2','add2',$scope.manPlayers)
    reduceAdd('reduce3','add3',$scope.womanEvents)
    reduceAdd('reduce4','add4',$scope.womanPlayers)
    reduceAdd('reduce5','add5',$scope.mixedEvents)
    reduceAdd('reduce6','add6',$scope.mixedPlayers)*/
    
    
    $scope.manEventSetting = function (manEvent,manEventId,manPlayerId) {
        /*if(manEventId){

        }*/
        console.log(manEvent)
    }

})
