/**
 * Created by Administrator on 2017/3/16 0016.
 */
app.controller('changeGameInfoCtrl', function ($scope,$state,$stateParams,$http,$ionicModal,GameInfo,$ionicPopup,$window) {
    $scope.competitionId = $stateParams.competitionId
    $scope.projectDetails = GameInfo.gameInfos
    console.log($scope.projectDetails)

    var gettime = function (time) {
        return time.getFullYear()
            +'-'+((time.getMonth()+1)/10>=1? (time.getMonth()+1):('0'+(time.getMonth()+1)))
            +'-'+((time.getDate())/10>=1? (time.getDate()):('0'+(time.getDate())))
            +' '+((time.getHours())/10>=1? (time.getHours()):('0'+(time.getHours())))
            +':'+((time.getMinutes())/10>=1? (time.getMinutes()):('0'+(time.getMinutes())))
    }
    //获取已发布比赛的比赛信息
    $http.get(SITE_SUFFIX + 'api/club/competition/get/' + $scope.competitionId).success(function (response) {
        if(response.result != 0){
            return
        }
        console.log(response)
        $scope.competitionInfo = response.message.competition
        $scope.projectId = response.message.projectId
        $scope.stadiumInfo = response.message.stadium
        console.log($scope.competitionInfo)
        document.getElementById('date-selector-input1').value = gettime(new Date($scope.competitionInfo.beginDate));
        document.getElementById('date-selector-input2').value = gettime(new Date($scope.competitionInfo.endDate));
        document.getElementById('date-selector-input3').value = gettime(new Date($scope.competitionInfo.applyEnddate));
        $scope.classLevel = response.message.classLevel;
        $scope.allowMaxCount = response.message.allowMaxCount;
        GameInfo.addLevel($scope.classLevel)
        GameInfo.addMaxCount(response.message.allowMaxCount)
        GameInfo.addStadiumId($scope.stadiumInfo.id)
        GameInfo.addStadium($scope.stadiumInfo.name)
        //$scope.stadiumInfo.
        //是否兼项


        $scope.alowDoubles= [
            {id:1,text:'不能兼项'},
            {id:2,text:'允许兼项'}
        ];
        $scope.isChanged = false;
        var bgNum = ""
        if($scope.competitionInfo.allowDoubles == 2){
            $scope.bgNum = 0
            bgNum = 1
            $scope.allowDouble = false
            $scope.allowShow = false;
        }else{
            $scope.bgNum = 1
            bgNum = 2
            $scope.allowDouble = true
            $scope.allowShow = true;
        }
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
        if($scope.competitionInfo.isPublic == 1){
            $scope.offLinePayMethod = 0
            $scope.allowPublic = false
        }else{
            $scope.offLinePayMethod = 1
            $scope.allowPublic = true
        }

        $scope.isOffLinePay = function (num) {
            console.log(num)
            $scope.offLinePayMethod = num;
            if(num == 1){
                $scope.allowPublic = true
            }else{
                $scope.allowPublic = false
            }
        }
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
            recentTime : [new Date($scope.competitionInfo.beginDate).getFullYear(),new Date($scope.competitionInfo.beginDate).getMonth()+1,new Date($scope.competitionInfo.beginDate).getDate(),new Date($scope.competitionInfo.beginDate).getHours(),new Date($scope.competitionInfo.beginDate).getMinutes()],//如不需要设置当前时间，被为空数组，如需要设置的开始的时间点，数组的值对应param参数的对应值。
            success : function(arr){
                console.log(arr);
                $scope.beginTimes1 = arr[0]+'-'+ ((arr[1]/10>=1) ? arr[1] : ('0'+arr[1]))+'-'+((arr[2]/10>=1) ? arr[2] : ('0'+arr[2]))+' '+((arr[3]/10>=1) ? arr[3] : ('0'+arr[3]))+':'+((arr[4]/10>=1) ? arr[4] : ('0'+arr[4]))
                document.getElementById('date-selector-input1').value = $scope.beginTimes1
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
            recentTime : [new Date($scope.competitionInfo.endDate).getFullYear(),new Date($scope.competitionInfo.endDate).getMonth()+1,new Date($scope.competitionInfo.endDate).getDate(),new Date($scope.competitionInfo.endDate).getHours(),new Date($scope.competitionInfo.endDate).getMinutes()],//如不需要设置当前时间，被为空数组，如需要设置的开始的时间点，数组的值对应param参数的对应值。
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
            recentTime : [new Date($scope.competitionInfo.applyEnddate).getFullYear(),new Date($scope.competitionInfo.applyEnddate).getMonth()+1,new Date($scope.competitionInfo.applyEnddate).getDate(),new Date($scope.competitionInfo.applyEnddate).getHours(),new Date($scope.competitionInfo.applyEnddate).getMinutes()],//如不需要设置当前时间，被为空数组，如需要设置的开始的时间点，数组的值对应param参数的对应值。
            success : function(arr){
                console.log(arr);
                $scope.beginTimes3 = arr[0]+'-'+ ((arr[1]/10>=1) ? arr[1] : ('0'+arr[1]))+'-'+((arr[2]/10>=1) ? arr[2] : ('0'+arr[2]))+' '+((arr[3]/10>=1) ? arr[3] : ('0'+arr[3]))+':'+((arr[4]/10>=1) ? arr[4] : ('0'+arr[4]))
                document.getElementById('date-selector-input3').value = $scope.beginTimes3
            }//回调
        });
    })

    //跳转到选取场馆
    $scope.toLocationList = function () {
        $state.go('locationList')
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
    //跳转到修改等级人数
    $scope.toChangeGrade = function (cProjectId) {
        $state.go('choiceGrade',{cProjectId:cProjectId})
    }
    //提交修改的比赛信息
    $scope.changedInfo = {}
    $scope.submitGameInfo = function (category) {
        //赛制
        $scope.changedInfo.category = category
        //比赛ID
        $scope.changedInfo.competitionId = $scope.competitionId
        //比赛名称
        $scope.changedInfo.name = $scope.competitionInfo.name
        if($scope.changedInfo.name == null){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请填写比赛名称',
                okText:'确定'
            });
            return;
        }
        //比赛开始时间
        $scope.changedInfo.beginDate = document.getElementById('date-selector-input1').value;
        //获取比赛结束时间
        $scope.changedInfo.endDate = document.getElementById('date-selector-input2').value;
        //获取报名退出截止时间
        $scope.changedInfo.applyEndDate = document.getElementById('date-selector-input3').value;
        //获取场地号码
        $scope.changedInfo.siteNumbers = $scope.competitionInfo.siteNumbers
        if($scope.changedInfo.siteNumbers == null){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请填写场地号码',
                okText:'确定'
            });
            return;
        }
        //获取比赛费用
        $scope.changedInfo.price = $scope.competitionInfo.price
        //获取兼项权限
        $scope.changedInfo.allowDouble = $scope.allowDouble
        //获取兼项描述
        if($scope.changedInfo.allowDouble){
            $scope.changedInfo.doubleDesc = $scope.competitionInfo.doubleDesc
        }else{
            $scope.changedInfo.doubleDesc = null
        }
        //获取是否公开
        $scope.changedInfo.allowPublic = $scope.allowPublic
        //获取其他信息
        $scope.changedInfo.remark = $scope.competitionInfo.remark

        //获取级别
        $scope.changedInfo.classLevel = $scope.projectDetails.classLevel
        //获取最大人数
        $scope.changedInfo.maxCount = $scope.projectDetails.maxCount
        //获取场馆Id
        $scope.changedInfo.stadiumId = $scope.projectDetails.stadiumId
        if($scope.changedInfo.stadiumId == null){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请选择比赛场馆',
                okText:'确定'
            });
            return;
        }
        $http({
            url:SITE_SUFFIX+'api/club/competition/publish',
            method:'post',
            headers:{ "Content-Type": "application/json" },
            data:JSON.stringify($scope.changedInfo)
        }).success(function (response) {
            if(response.result != 0){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: response.message,
                    okText:'确定'
                });
                return;
            }
            /*var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: response.message,
                okText:'确定'
            });
            alertPopup.then(function(res) {*/
                $window.history.back()
           // });

        })







        console.log($scope.changedInfo)
    }
})