/**
 * Created by Administrator on 2016/8/5 0005.
 */
app.controller('releaseGroupGameCtrl', function ($scope,$state,$http) {


    //获取赛事级别json数据
    $http.get(SITE_SUFFIX+'api/dic/competition/level/list')
        .success(function(response) {
            $scope.clientSideList= response.message;
            console.log(response)
        });
    //跳转到项目及详情设定页面
    $scope.toGroupSettingGroup = function(){
        $state.go('groupSettingGroup')
    }
    //跳转到地点页面
    $scope.toGameLocation = function () {
        $state.go('gameLocation')
    }
    //跳转到比赛时间页面
    $scope.toGameTime = function(){
        $state.go('gameTime')
    }
    //选取证件
    $scope.isDisabled1 = false;
    $scope.isDisabled2 = false;
    $scope.isDisabled3 = false;
    $scope.isDisabled4 = false;
    $scope.selectCode1 = function () {
        if($scope.isDisabled1 == false){
            $scope.isDisabled1 = true;
        }else{
            $scope.isDisabled1 = false
        }
    }
    $scope.selectCode2 = function () {
        if($scope.isDisabled2 == false){
            $scope.isDisabled2 = true;
        }else{
            $scope.isDisabled2 = false
        }
    }
    $scope.selectCode3 = function () {
        if($scope.isDisabled3 == false){
            $scope.isDisabled3 = true;
        }else{
            $scope.isDisabled3 = false
        }
    }
    $scope.selectCode4 = function () {
        if($scope.isDisabled4 == false){
            $scope.isDisabled4 = true;
        }else{
            $scope.isDisabled4 = false
        }
    }

    //发布比赛
    var addGame = {
         address:"北京市管庄路 管庄路口北", //地址
         alowDoubles:2,//允许兼项 1  不允许2
         applyEndDate:"2016-10-30 20:00",//报名截止时间
         areaNo:10010103, //shen
         cityNo:100101,//shi
         competitionDate:
         [{day:"1",begin:"2016.11.06 8:00",end:"2016.11.06 17:30"}],//bisaishijian
         competitionRule:"这是比赛规则",
         contactPhone:"17710161104",
         contactUser:"羽众",
         credentialsReqiure:
         {credentialEnable:"身份证,学生证",needPhotos:1,needNumber:1},
         geo:"123.1221,45.2121",
         isTeenGame:2, //是1 否2
         levelId:1,
         name:"测试名称团体赛",
         offlinePayEnable:1, //1允许 2不允许
         price:0.01,//单打或团体
         price2:0.01,//双打
         provinceNo:1001,
         saveOrPublish:1, //保存1 发布2
         siteNumbers:'全部',
         statdium:"不知道羽毛球馆",
         type:1, //单打或双打
         mutiIntro:""
     };
    var events = [
        {
            "competitionId": 15,
            "description": '',
            "name": "竞技组",
            "projectList": [
                {
                    "className": "无级",
                    "manCount": 5,
                    "maxCount": 8,
                    "name": "男单",
                    "secondManCount": 1,
                    "secondWomenCount": 1,
                    "subProjects": [
                        {
                            "maxCount": 3,
                            "name": "男双"
                        },
                        {
                            "maxCount": 3,
                            "name": "女双"
                        },
                        {
                            "maxCount": 3,
                            "name": "混双"
                        }
                    ],
                    "womenCount": 1
                }
            ]
        },
        {
            "competitionId": 15,
            "description": '',
            "name": "娱乐组",
            "projectList": [
                {
                    "className": "无级",
                    "manCount": 5,
                    "maxCount": 8,
                    "name": "男单",
                    "secondManCount": 1,
                    "secondWomenCount": 1,
                    "subProjects": [
                        {
                            "maxCount": 3,
                            "name": "男双"
                        },
                        {
                            "maxCount": 3,
                            "name": "女双"
                        },
                        {
                            "maxCount": 3,
                            "name": "混双"
                        }
                    ],
                    "womenCount": 1
                }
            ]
        }

    ]
    $scope.releaseGroup = function () {
        console.log(111)
        $http({
            url:SITE_SUFFIX+'api/competition/add',
            method:'post',
            headers: {
                'Content-Type': 'application/json'
            },
            data:addGame
        }).success(
            function (response) {
                console.log(response)
            }
        )
        $http({
            url:SITE_SUFFIX+'api/competition/group/add',
            method:'post',
            headers: {
                'Content-Type': 'application/json'
            },
            data:events
        }).success(
            function (response) {
                console.log(response)
            }
        )
    }

})