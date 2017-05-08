/**
 * Created by Administrator on 2017/3/16 0016.
 */
app.controller('writeGameInfoCtrl', function ($scope,$state,$http,$ionicModal,$window,$ionicPopup,GameInfo,$sce) {

    $scope.times = new Date().getFullYear()
        +'-'+((new Date().getMonth()+1)/10>=1? (new Date().getMonth()+1):('0'+(new Date().getMonth()+1)))
        +'-'+((new Date().getDate())/10>=1? (new Date().getDate()):('0'+(new Date().getDate())))
        +' '+((new Date().getHours())/10>=1? (new Date().getHours()):('0'+(new Date().getHours())))
        +':'+((new Date().getMinutes())/10>=1? (new Date().getMinutes()):('0'+(new Date().getMinutes())))
    $scope.times1 = new Date().getFullYear()
        +'-'+((new Date().getMonth()+1)/10>=1? (new Date().getMonth()+1):('0'+(new Date().getMonth()+1)))
        +'-'+((new Date().getDate())/10>=1? (new Date().getDate()):('0'+(new Date().getDate())))
        +' '+((new Date().getHours()+2)/10>=1? (new Date().getHours()+2):('0'+(new Date().getHours()+2)))
        +':'+((new Date().getMinutes())/10>=1? (new Date().getMinutes()):('0'+(new Date().getMinutes())))
    document.getElementById('date-selector-input1').value = $scope.times
    document.getElementById('date-selector-input2').value = $scope.times1
    document.getElementById('date-selector-input3').value = $scope.times
    //开始时间
    new DateSelector({
        input : 'date-selector-input1',//点击触发插件的input框的id
        container : 'targetContainer1',//插件插入的容器id
        type : 0,
        //0：不需要tab切换，自定义滑动内容，建议小于三个；
        //1：需要tab切换，【年月日】【时分】完全展示，固定死，可设置开始年份和结束年份
        param : [1,1,1,1,1],
        //设置['year','month','day','hour','minute'],1为需要，0为不需要,需要连续的1
        beginTime : [2017,01,01,00,00],//如空数组默认设置成1970年1月1日0时0分开始，如需要设置开始时间点，数组的值对应param参数的对应值。
        endTime : [],//如空数组默认设置成次年12月31日23时59分结束，如需要设置结束时间点，数组的值对应param参数的对应值。
        recentTime : [],//如不需要设置当前时间，被为空数组，如需要设置的开始的时间点，数组的值对应param参数的对应值。
        success : function(arr){
            console.log(arr);
            $scope.beginTimes1 = arr[0]+'-'+ ((arr[1]/10>=1) ? arr[1] : ('0'+arr[1]))+'-'+((arr[2]/10>=1) ? arr[2] : ('0'+arr[2]))+' '+((arr[3]/10>=1) ? arr[3] : ('0'+arr[3]))+':'+((arr[4]/10>=1) ? arr[4] : ('0'+arr[4]))
            $scope.beginTimes2 = arr[0]+'-'+ ((arr[1]/10>=1) ? arr[1] : ('0'+arr[1]))+'-'+((arr[2]/10>=1) ? arr[2] : ('0'+arr[2]))+' '+(((arr[3]+2)/10>=1) ? arr[3]+2 : ('0'+(arr[3]+2)))+':'+((arr[4]/10>=1) ? arr[4] : ('0'+arr[4]))
            document.getElementById('date-selector-input1').value = $scope.beginTimes1
            document.getElementById('date-selector-input2').value = $scope.beginTimes2
            document.getElementById('date-selector-input3').value = $scope.beginTimes1
        }//回调
    });
    //结束时间
    new DateSelector({
        input : 'date-selector-input2',//点击触发插件的input框的id
        container : 'targetContainer2',//插件插入的容器id
        type : 0,
        //0：不需要tab切换，自定义滑动内容，建议小于三个；
        //1：需要tab切换，【年月日】【时分】完全展示，固定死，可设置开始年份和结束年份
        param : [1,1,1,1,1],
        //设置['year','month','day','hour','minute'],1为需要，0为不需要,需要连续的1
        beginTime : [2017,01,01,00,00],//如空数组默认设置成1970年1月1日0时0分开始，如需要设置开始时间点，数组的值对应param参数的对应值。
        endTime : [],//如空数组默认设置成次年12月31日23时59分结束，如需要设置结束时间点，数组的值对应param参数的对应值。
        recentTime : [],//如不需要设置当前时间，被为空数组，如需要设置的开始的时间点，数组的值对应param参数的对应值。
        success : function(arr){
            console.log(arr);
            $scope.beginTimes2 = arr[0]+'-'+ ((arr[1]/10>=1) ? arr[1] : ('0'+arr[1]))+'-'+((arr[2]/10>=1) ? arr[2] : ('0'+arr[2]))+' '+((arr[3]/10>=1) ? arr[3] : ('0'+arr[3]))+':'+((arr[4]/10>=1) ? arr[4] : ('0'+arr[4]))
            document.getElementById('date-selector-input2').value = $scope.beginTimes2
        }//回调
    });
    //截止时间
      new DateSelector({
        input : 'date-selector-input3',//点击触发插件的input框的id
        container : 'targetContainer3',//插件插入的容器id
        type : 0,
        //0：不需要tab切换，自定义滑动内容，建议小于三个；
        //1：需要tab切换，【年月日】【时分】完全展示，固定死，可设置开始年份和结束年份
        param : [1,1,1,1,1],
        //设置['year','month','day','hour','minute'],1为需要，0为不需要,需要连续的1
        beginTime : [2017,01,01,00,00],//如空数组默认设置成1970年1月1日0时0分开始，如需要设置开始时间点，数组的值对应param参数的对应值。
        endTime : [],//如空数组默认设置成次年12月31日23时59分结束，如需要设置结束时间点，数组的值对应param参数的对应值。
        recentTime : [],//如不需要设置当前时间，被为空数组，如需要设置的开始的时间点，数组的值对应param参数的对应值。
        success : function(arr){
            console.log(arr);
            $scope.beginTimes3 = arr[0]+'-'+ ((arr[1]/10>=1) ? arr[1] : ('0'+arr[1]))+'-'+((arr[2]/10>=1) ? arr[2] : ('0'+arr[2]))+' '+((arr[3]/10>=1) ? arr[3] : ('0'+arr[3]))+':'+((arr[4]/10>=1) ? arr[4] : ('0'+arr[4]))
            document.getElementById('date-selector-input3').value = $scope.beginTimes3
        }//回调
    });
    $scope.projectDetails = GameInfo.gameInfos
    //跳转到选取场馆
    $scope.toLocationList = function () {
        $state.go('locationList')
    }

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
    $scope.allowDouble = false
    $scope.isAlowed = function(num){
        $scope.bgNum = num;
        bgNum = $scope.bgNum + 1;
        if(num == 1){
            $scope.allowShow = true
            $scope.allowDouble = true

        }else{
            $scope.allowShow = false
            $scope.allowDouble = false
        }

    }
    //是否公开
    $scope.offLinePays = [
        {id:0,text:'否'},
        {id:1,text:'是'}
    ]
    $scope.offLinePayMethod = 0
    $scope.allowPublic = false
    $scope.isOffLinePay = function (num) {
        console.log(num)
        $scope.offLinePayMethod = num;
        if(num == 1){
            $scope.allowPublic = true
        }else{
            $scope.allowPublic = false
        }
    }

    //填写其他信息
    $ionicModal.fromTemplateUrl('modules/gameClub/templates/gameOtherInfo.html', {
        scope: $scope,
        animation: 'none'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.toGameOtherInfo = function() {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    //判断羽众申明状态
    $scope.isDisabled = true;
    $scope.changeStates = function () {
        if($scope.isDisabled == true) {
            $scope.isDisabled = false;
        }else{
            $scope.isDisabled = true;
        }
    }
    //查看羽众免责声明
    $scope.toDisclaimer = function () {
        $state.go('disclaimer')
    }

    //提交发布比赛的信息
    $scope.publishInfo = {}
    $scope.gameInfo = $scope;


    $scope.toCreateSuccess = function () {
        //获取比赛名称
        $scope.publishInfo.name = $scope.gameInfo.name
        if($scope.publishInfo.name == null){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请填写比赛名称',
                okText:'确定'
            });
            return;
        }
        //获取比赛开始时间
        //$scope.datetimeValue1 = new Date();
        //$scope.datetimeValue2 = new Date();
        //$scope.datetimeValue3 = new Date();
        $scope.publishInfo.beginDate = document.getElementById('date-selector-input1').value;
        //获取比赛结束时间
        $scope.publishInfo.endDate = document.getElementById('date-selector-input2').value;
        //获取报名退出截止时间
        $scope.publishInfo.applyEndDate = document.getElementById('date-selector-input3').value;
        //获取场地号码
        $scope.publishInfo.siteNumbers = $scope.gameInfo.siteNumbers
        if($scope.publishInfo.siteNumbers == null){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请填写场地号码',
                okText:'确定'
            });
            return;
        }
        //获取比赛费用
        $scope.publishInfo.price = $scope.gameInfo.fee
        //获取兼项权限
        $scope.publishInfo.allowDouble = $scope.allowDouble
        //获取兼项描述
        if($scope.publishInfo.allowDouble){
            $scope.publishInfo.doubleDesc = $scope.gameInfo.doubleDesc
        }else{
            $scope.publishInfo.doubleDesc = null
        }
        //获取是否公开
        $scope.publishInfo.allowPublic = $scope.allowPublic
        //获取其他信息
        $scope.publishInfo.remark = $scope.gameInfo.remark

        //获取赛制
        $scope.publishInfo.category = $scope.projectDetails.category
        //获取项目
        $scope.publishInfo.projectId = $scope.projectDetails.projectId
        //获取级别
        $scope.publishInfo.classLevel = $scope.projectDetails.classLevel
        //获取最大人数
        $scope.publishInfo.maxCount = $scope.projectDetails.maxCount
        //获取场馆id
        $scope.publishInfo.stadiumId = $scope.projectDetails.stadiumId
        if($scope.publishInfo.stadiumId == null){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请选择比赛场馆',
                okText:'确定'
            });
            return;
        }
        if($scope.isDisabled == false) {
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请您阅读并同意羽众免责声明',
                okText:'确定'
            });
            return;
        }
        console.log($scope.publishInfo)
        $http({
            url:SITE_SUFFIX+'api/club/competition/publish',
            method:'post',
            headers:{ "Content-Type": "application/json" },
             data:JSON.stringify($scope.publishInfo)
        }).success(function (response) {
            if(response.result != 0){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: response.message,
                    okText:'确定'
                });
                return;
            }
            window.location.href = response.message
           // $scope.shareQr = response.message;
           // GameInfo.addShareQr($scope.shareQr)
           // $rootScope.shareQr = $scope.shareQr
           // $state.go('createSuccess')
           // console.log(response)
        })




    }


})