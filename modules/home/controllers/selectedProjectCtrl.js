/**
 * Created by Administrator on 2016/12/29 0029.
 */
app.controller('selectedProjectCtrl', function ($scope,$state,$http,$stateParams,$rootScope,$ionicPopup,PaymentOrder,$window) {

    $scope.competitionId = $stateParams.competitionId;
    $scope.order = PaymentOrder.PayOrder;
    console.log($scope.order)
    //领队是否参赛
    var asMember = null
    $scope.asMemberNum = 1
    $scope.gamings = [
        {name:"是"},
        {name:"否"}
    ]
    $scope.asMember = function (num) {
        $scope.asMemberNum = num;
        asMember = $scope.asMemberNum + 1
    }


    //获取组别
    var projectId = null
    $http({
        url:SITE_SUFFIX+'api/competition/group/'+$scope.competitionId,
        method:'get'
    }).success(
        function (response) {
            console.log(response)
            $scope.groups = response.message
            $scope.groupLists = $scope.groups.data

            if ($scope.groups.data[0].name != "" && $scope.groups.data[0].name != '不分组' && $scope.groups.data[0].name != ' ') {
                $scope.selectGroupShow = true;
                //改变选取组别后级别按钮的颜色
                if($scope.order == null){
                    $scope.changeGroupNum = 0
                    var groupId =  $scope.groups.data[0].id
                }else{
                    for(var i=0;i<$scope.groupLists.length;i++){
                        if($scope.groupLists[i].name == $scope.order.groupName){
                            $scope.changeGroupNum = i
                            var groupId = $scope.groupLists[i].id
                            //return;
                        }
                    }
                }
                $http({
                    url: SITE_SUFFIX + 'api/competition/class/'+groupId,
                    method: 'get'
                }).success(
                    function (response) {
                        $scope.classes = response.message
                        $scope.classLists = $scope.classes.data

                        if ($scope.classes.data[0].className == '无级' || $scope.classes.data[0].className == '' || $scope.classes.data[0].className == null) {
                            $scope.selectClassShow = false;
                            var className = $scope.classes.data[0].className
                            $http({
                                url: SITE_SUFFIX + 'api/competition/project/'+groupId,
                                method: 'get',
                                params: {className:className}
                            }).success(
                                function (response) {
                                    console.log(response)
                                    $scope.events = response.message
                                    $scope.eventsLists = $scope.events.data
                                    $scope.isPlayer = $scope.eventsLists[0]
                                    if($scope.order == null){
                                        $scope.changeEventNum = 0
                                        projectId = $scope.eventsLists[0].id
                                        $rootScope.projectId = projectId
                                    }else{
                                        for(var i=0;i<$scope.eventsLists.length;i++){
                                            if($scope.eventsLists[i].id == $scope.order.projectId){
                                                $scope.changeEventNum = i
                                                console.log($scope.changeEventNum)
                                                projectId = $scope.eventsLists[0].id
                                                return;
                                            }
                                        }
                                    }
                                    //$scope.changeEventNum = 0
                                    //projectId = $scope.eventsLists[0].id
                                   // $rootScope.projectId = projectId
                                }
                            )
                        } else {
                            $scope.selectClassShow = true;
                            $scope.changeClassNum = 0

                            if($scope.order == null){
                                //$scope.changeGroupNum = 0
                                var className = $scope.classes.data[0].className
                            }else{
                                for(var i=0;i<$scope.classLists.length;i++){
                                    if($scope.classLists[i].className == $scope.order.className){
                                        $scope.changeClassNum = i
                                        var className = $scope.order.className
                                       // return;
                                    }
                                }
                            }
                            //项目接口
                            $http({
                                url: SITE_SUFFIX + 'api/competition/project/'+groupId,
                                method: 'get',
                                params: {className:className}
                            }).success(
                                function (response) {
                                    console.log(response)
                                    $scope.events = response.message
                                    $scope.eventsLists = $scope.events.data
                                    $scope.isPlayer = $scope.eventsLists[0]
                                    if($scope.order == null){
                                        $scope.changeEventNum = 0
                                        projectId = $scope.eventsLists[0].id
                                        $rootScope.projectId = projectId
                                    }else{
                                        for(var i=0;i<$scope.eventsLists.length;i++){
                                            if($scope.eventsLists[i].id == $scope.order.projectId){
                                                $scope.changeEventNum = i
                                                projectId = $scope.eventsLists[0].id
                                                return;
                                            }
                                        }
                                    }

                                }
                            )
                            //改变选取级别后级别按钮的颜色
                            $scope.changeClassBg = function (num, className) {
                                $scope.changeClassNum = num;
                                var className = className
                                //项目接口
                                $http({
                                    url: SITE_SUFFIX + 'api/competition/project/'+groupId,
                                    method: 'get',
                                    params: {className:className}
                                }).success(
                                    function (response) {
                                        console.log(response)
                                        $scope.events = response.message
                                        $scope.eventsLists = $scope.events.data
                                        $scope.changeEventNum = 0
                                        projectId = $scope.eventsLists[0].id
                                        $scope.isPlayer = $scope.eventsLists[0]
                                    }
                                )
                            }
                        }
                    }
                )
                $scope.changeGroupBg = function (num, id) {
                    $scope.changeGroupNum = num;
                    var groupId = id
                    //级别接口
                    $http({
                        url: SITE_SUFFIX + 'api/competition/class/'+groupId,
                        method: 'get'
                    }).success(
                        function (response) {
                            $scope.classes = response.message
                            $scope.classLists = $scope.classes.data
                            if ($scope.classes.data[0].className == '无级' || $scope.classes.data[0].className == '' || $scope.classes.data[0].className == null) {
                                $scope.selectClassShow = false;
                                var className = $scope.classes.data[0].className
                                $http({
                                    url: SITE_SUFFIX + 'api/competition/project/'+groupId,
                                    method: 'get',
                                    params: {className:className}
                                }).success(
                                    function (response) {
                                        console.log(response)
                                        $scope.events = response.message
                                        $scope.eventsLists = $scope.events.data
                                        $scope.isPlayer = $scope.eventsLists[0]
                                        $scope.changeEventNum = 0
                                        projectId = $scope.eventsLists[0].id
                                        $rootScope.projectId = projectId
                                    }
                                )
                            } else {
                                $scope.selectClassShow = true;
                                $scope.changeClassNum = 0
                                var className = $scope.classes.data[0].className
                                /*if($scope.order == null){
                                    //$scope.changeGroupNum = 0

                                 var className = $scope.classes.data[0].className
                                }else{
                                    for(var i=0;i<$scope.classLists.length;i++){
                                        if($scope.classLists[i].className == $scope.order.className){
                                             $scope.changeGroupNum = i
                                            var className = $scope.order.className
                                            // return;
                                        }
                                    }
                                }*/

                                //项目接口
                                $http({
                                    url: SITE_SUFFIX + 'api/competition/project/'+groupId,
                                    method: 'get',
                                    params: {className:className}
                                }).success(
                                    function (response) {
                                        console.log(response)
                                        $scope.events = response.message
                                        $scope.eventsLists = $scope.events.data
                                        $scope.isPlayer = $scope.eventsLists[0]
                                        if($scope.order == null){
                                            $scope.changeEventNum = 0
                                            projectId = $scope.eventsLists[0].id
                                            $rootScope.projectId = projectId
                                        }else{
                                            for(var i=0;i<$scope.eventsLists.length;i++){
                                                if($scope.eventsLists[i].id == $scope.order.projectId){
                                                    $scope.changeEventNum = i
                                                    projectId = $scope.eventsLists[0].id
                                                    return;
                                                }
                                            }
                                        }

                                    }
                                )
                                //改变选取级别后级别按钮的颜色
                                $scope.changeClassBg = function (num, className) {
                                    $scope.changeClassNum = num;
                                    var className = className
                                    //项目接口
                                    $http({
                                        url: SITE_SUFFIX + 'api/competition/project/'+groupId,
                                        method: 'get',
                                        params: {className:className}
                                    }).success(
                                        function (response) {
                                            console.log(response)
                                            $scope.events = response.message
                                            $scope.eventsLists = $scope.events.data
                                            $scope.changeEventNum = 0
                                            projectId = $scope.eventsLists[0].id
                                            $scope.isPlayer = $scope.eventsLists[0]
                                        }
                                    )
                                }
                            }
                        }
                    )
                }
            } else {
                var groupId = $scope.groups.data[0].id
                $http({
                    url: SITE_SUFFIX + 'api/competition/class/'+groupId,
                    method: 'get'
                }).success(
                    function (response) {
                        $scope.classes = response.message
                        $scope.classLists = $scope.classes.data
                       // var className = $scope.classes.data[0].className
                        if($scope.order == null){
                            //$scope.changeGroupNum = 0
                            var className = $scope.classes.data[0].className
                        }else{
                            for(var i=0;i<$scope.classLists.length;i++){
                                if($scope.classLists[i].className == $scope.order.className){
                                     $scope.changeGroupNum = i
                                    var className = $scope.order.className
                                    //return;
                                }
                            }
                        }
                        if ($scope.classes.data[0].className == '无级' || $scope.classes.data[0].className == '' || $scope.classes.data[0].className == null) {
                            $http({
                                url: SITE_SUFFIX + 'api/competition/project/'+groupId,
                                method: 'get',
                                params:{className:className}
                            }).success(
                                function (response) {
                                    console.log(response)
                                    $scope.events = response.message
                                    $scope.eventsLists = $scope.events.data
                                    $scope.isPlayer = $scope.eventsLists[0]
                                    //$scope.changeEventNum = 0
                                   // projectId = $scope.eventsLists[0].id
                                   // $rootScope.projectId = projectId
                                    if($scope.order == null){
                                        console.log($scope.eventsLists[0].id)
                                        $scope.changeEventNum = 0
                                        projectId = $scope.eventsLists[0].id
                                        $rootScope.projectId = projectId
                                    }else{
                                        console.log($scope.eventsLists[0].id)
                                        for(var i=0;i<$scope.eventsLists.length;i++){
                                            if($scope.eventsLists[i].id == $scope.order.projectId){
                                                $scope.changeEventNum = i
                                                projectId = $scope.eventsLists[0].id
                                                return;
                                            }

                                        }
                                    }
                                }
                            )
                        } else {
                            $scope.selectClassShow = true;
                            //改变选取级别后级别按钮的颜色
                            $scope.changeClassNum = 0
                            $http({
                                url: SITE_SUFFIX + 'api/competition/project/'+groupId,
                                method: 'get',
                                params:{className:className}
                            }).success(
                                function (response) {
                                    console.log(response)
                                    $scope.events = response.message
                                    $scope.eventsLists = $scope.events.data
                                    $scope.isPlayer = $scope.eventsLists[0]
                                    $scope.changeEventNum = 0
                                    projectId = $scope.eventsLists[0].id
                                    $rootScope.projectId = projectId
                                }
                            )
                        }
                        $scope.changeClassBg = function (num, className) {
                            $scope.changeClassNum = num;
                            var className = className
                            //项目接口
                            $http({
                                url: SITE_SUFFIX + 'api/competition/project/'+groupId,
                                method: 'get',
                                params: {className:className}
                            }).success(
                                function (response) {
                                    console.log(response)
                                    $scope.events = response.message
                                    $scope.eventsLists = $scope.events.data
                                    $scope.isPlayer = $scope.eventsLists[0]
                                    $scope.changeEventNum = 0
                                    projectId = $scope.eventsLists[0].id
                                    $rootScope.projectId = projectId
                                }
                            )
                        }

                    }
                )
            }
        }
    )
    $scope.changeEventBg = function (num,id) {
        $scope.changeEventNum = num;
        projectId = id
        console.log(projectId)
    }

    //判断羽众申明状态
    $scope.isDisabled = true;
    $scope.changeStates = function () {
        if($scope.isDisabled == true) {
            $scope.isDisabled = false;
        }else{
            $scope.isDisabled = true;
        }
    }
    console.log($rootScope.teamName)
    console.log($rootScope.coachName)
    //提交
    $scope.own = $scope
    $scope.toPay = function (competitionId) {
        console.log(111)
        if(!$scope.isDisabled){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '您必须同意羽众声明后，才能进行下一步操作',
                okText:'确定'
            });
            return;
        }
        $scope.clubName = $scope.own.group
        if($scope.order == null){
            var orderId = null
        }else{
            var orderId = $scope.order.id
        }
        $http({
            url:SITE_SUFFIX+'api/competition/order/create',
            method:'post',
            params:{projectId:projectId,clubName:$scope.clubName,orderId:orderId,teamName:$rootScope.teamName,coachName:$rootScope.coachName,asMember:asMember}
        }).success(function (response) {
            console.log(response)
            if(response.result == 0){
                var order = response.message
                console.log(order)
                if($scope.order == null){
                    $state.go('pay',{competitionId:competitionId})
                }
                if($scope.order != null){
                    $window.history.back()
                }
                PaymentOrder.addOrder(order)
            }
            if(response.result !=0 && response.result != 1009){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: response.message,
                    okText:'确定'
                });
                return;
            }

        })
    }

    //查看羽众免责声明
    $scope.toDisclaimer = function () {
        $state.go('disclaimer')
    }
    //分级标准
    $scope.standard = function () {
        $state.go('classIntroduction')
    }
})