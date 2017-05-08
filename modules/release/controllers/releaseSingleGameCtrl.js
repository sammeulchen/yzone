/**
 * Created by Administrator on 2016/8/5 0005.
 */
app.controller('releaseSingleGameCtrl', function ($scope,$state,$ionicModal,$window,$http,$log,$stateParams,$rootScope) {
   //场地号码
    $scope.allLocals = [
        {id:0,text:'全部场地'},
        {id:0,text:'部分场地'}
    ]

    //是否兼项
    $scope.allowShow = false;
    $scope.alowDoubles= [
        {id:1,text:'不能兼项'},
        {id:2,text:'允许兼项'}
    ];
    $scope.isChanged = false;
    var bgNum = ""
    $scope.bgNum = 0
    bgNum = 1
    $scope.isAlowed = function(num){
       $scope.bgNum = num;
        bgNum = $scope.bgNum + 1;
        if(num == 1){
            $scope.allowShow = true
        }else{
            $scope.allowShow = false
        }

    }

    //是否线下支付
    $scope.offLinePays = [
        {id:0,text:'否'},
        {id:1,text:'是'}
    ]
    $scope.offLinePayMethod = 0
    $scope.isOffLinePay = function (num) {
        console.log(num)
        $scope.offLinePayMethod = num;
    }
    //是否设置密码
    $scope.showMore = false
    $scope.offSetting = 0
    $scope.setting = function (num) {
        $scope.offSetting = num
        if(num==1){
            $scope.showMore = true
        }else{
            $scope.showMore = false
        }
    }
    //显示更多设置
    $scope.moreSettingShow = false
    $scope.showMoreSetting = function () {
        if($scope.moreSettingShow == false){
            $scope.moreSettingShow = true
        }else{
            $scope.moreSettingShow = false
        }
    }

   //跳转到比赛规程及注意事项
    $scope.toCompetitionRules = function () {
        $state.go('competitionRules')
    }

    //跳转到赛事界别
    $scope.toTournamentLevel = function () {
        $state.go('tournamentLevel')
    }


    //跳转到分组及项目详情设定页面
    $scope.toGroupSetting = function () {
        $state.go('groupSetting')

    }

    //跳转到地点页面
    $scope.toGameLocation = function () {
        $state.go('gameLocation')
    }

    //跳转到比赛时间页面
    $scope.toGameTime = function(){
        $state.go('gameTime')
    }

    //比赛时间

    $ionicModal.fromTemplateUrl('modules/release/templates/showLocationNum.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.localNum = 0
    $scope.showLocationNum = function(num) {
        $scope.localNum = num
        if(num==0){

        }else{
            $scope.modal.show();
        }


    };


   //当我们用到模型时，清除它！
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // 当隐藏的模型时执行动作
    $scope.$on('modal.hide', function() {
        // 执行动作
    });

    //点击添加场地号码
    var EDIT_MODE = 1;
    var ADD_MODE = -1;
    $scope.isShow = false;
    $scope.siteNumberData={
        text:''
    };
    $scope.siteNumbers = [

    ];

    $scope.submit = function (event,e) {
        $scope.mode = ADD_MODE;
        $scope.isShow = true;

        var data = {
            siteNumberData:{
                text:$scope.siteNumberData.text+"号"
            }
        }
        $scope.$emit("controller.addData", data);
    }
    $scope.$on("controller.addData", function(event, e) {
        var siteNumberData = e.siteNumberData;
        $scope.siteNumbers.push(siteNumberData);
    });
    $scope.removeSiteNumber = function(index) {
        if($window.confirm("确定要删除该条信息?")) {
            $scope.siteNumbers.splice(index, 1);
        }
    }
    $scope.closeSiteNumber = function () {
        $scope.modal.hide();

    }


    //证件要求
    $ionicModal.fromTemplateUrl('modules/release/templates/codeView.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal1) {
        $scope.modal1 = modal1;
    });

    $scope.toCodeRequest = function () {
        $scope.modal1.show()
    }
    //证件
    $scope.needCodeNum = 0
    $scope.isNeedCode = function(num){
        $scope.needCodeNum = num
        if(num==0){

        }else{
            $scope.modal1.show();
        }
    }
    $scope.showMoreCode = false
    $scope.codes = [
        {id:1,name:'身份证'},
        {id:2,name:'军官证'},
        {id:3,name:'护照'},
        {id:4,name:'户口簿'},
        {id:5,name:'其他证件'}
    ]
    $scope.needNums =[
        {id:1,text:'需要填写证件号码'},
        {id:2,text:'需要填写证件号码并上传证件照片'}
    ]
    $scope.getCode = function (id) {
        if(id == 5){
            if($scope.showMoreCode == false){
                $scope.showMoreCode = true
            }else{
                $scope.showMoreCode = false
            }

        }
    }

    //所属组织
    $ionicModal.fromTemplateUrl('modules/release/templates/organization.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal2) {
        $scope.modal2 = modal2;
    });
    $scope.toOrganization = function () {
        $scope.modal2.show()
    }
    $scope.showMoreOrgan = false
    $scope.organizations = [
        {id:1,name:'俱乐部'},
        {id:2,name:'学校'},
        {id:3,name:'公司'},
        {id:4,name:'部门'},
        {id:5,name:'其他组织'}
    ]
    $scope.getOrganization = function (id) {
        if(id == 5){
            if($scope.showMoreOrgan == false){
                $scope.showMoreOrgan = true
            }else{
                $scope.showMoreOrgan = false
            }

        }
    }

    $scope.organizationSetting = function () {
        $scope.modal2.hide()
    }


    $scope.$on('$destroy', function() {
        $scope.modal1.remove();
    });
    $scope.$on('$destroy', function() {
        $scope.modal2.remove();
    });





    //获取赛事级别json数据
    $http.get(SITE_SUFFIX+'api/dic/competition/level/list')
        .success(function(response) {
            $scope.clientSideList = response.message;
            console.log(response)
        });

    //管理员登录
  /*  var obj = {}
    obj.mobile = "17710161104"
    obj.pwd = "111111"*/
   /*  $http({
        url:'http://wechat.banmi.me/admin/account/login',
        method:'post',
        params:obj
    }).success(
        function (response) {
            console.log(response)
        }
    )*/
    //发布比赛
   /*var addGame = {
        address:"北京市管庄路 管庄路口北", //地址
        alowDoubles:1,//允许兼项 1  不允许2
        applyEndDate:"2016-02-12 12:54",//报名截止时间
        areaNo:10010103, //shen
        cityNo:100101,//shi
        competitionDate:
            [{day:"1",begin:"2016-10-12 15:22",end:"2016-10-12 17:30"}],//bisaishijian
        competitionRule:"这是比赛规则",
        contactPhone:"17710161104",
        contactUser:"张三",
        credentialsReqiure:
            {credentialEnable:"身份证,学生证",needPhotos:1,needNumber:1},
        geo:"123.1221,45.2121",
        isTeenGame:1, //是1 否2
        levelId:1,
        name:"测试名称",
        offlinePayEnable:1, //1允许 2不允许
        price:200,//单打或团体
        price2:120,//双打
        provinceNo:1001,
        saveOrPublish:1, //保存1 发布2
        siteNumbers:"7号,8号,43号",
        statdium:"松杨羽毛球馆",
        type:1, //单打或双打
        mutiIntro:""
    };*/
   /* $http({
        url:'SITE_SUFFIX+'api/competition/add',
        method:'post',
        headers:{'Content-Type': 'application/json'},
        data:addGame
    }).success(
        function (response) {
            console.log(response)
        }
    )*/

    //发布比赛

    $scope.addMatch = $scope;
    var addGame = {};
    var credentialsReqiure ={};
    $scope.releaseGame = function(){
        console.log($rootScope.competitionRules)
        addGame.name = $scope.addMatch.name;
        addGame.competitionRule = $rootScope.competitionRule;
        addGame.levelId = $scope.addMatch.levelId;
        addGame.alowDoubles = bgNum;
        addGame.price = $scope.addMatch.price;
        addGame.price2 = $scope.addMatch.price2;
        addGame.offlinePayEnable = $scope.addMatch.offlinePayEnable;

        credentialsReqiure.needPhotoNumber = $scope.addMatch.needPhotoNumber;
        addGame.mutiIntro = $scope.addMatch.mutiIntro;
        addGame.credentialsReqiure = credentialsReqiure;
        addGame.contactUser = $scope.addMatch.contactUser;
        addGame.contactPhone = $scope.addMatch.contactPhone;
        addGame.isTeenGame = $scope.addMatch.isTeenGame;
        addGame.saveOrPublish = 2;
        var siteNumbers =  $scope.siteNumbers
        var arr = []
        for(var i = 0;i<siteNumbers.length;i++){
             arr.push(siteNumbers[i].text);
        }
        var siteNumbers = arr.join(',')
        addGame.siteNumbers = siteNumbers;
        var endTime = angular.element(document.querySelector('.end-times'))
        var end = (endTime[0].innerText).replace(/年 |月/g,'-')
        var end = end.replace(/日/g,'')
        addGame.applyEndDate = end

    console.log(addGame)

    }
});