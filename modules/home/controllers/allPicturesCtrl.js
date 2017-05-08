/**
 * Created by Administrator on 2017/2/24 0024.
 */
app.controller('allPicturesCtrl', function ($scope,$state,$stateParams,$http,$window,$ionicPopup,$timeout) {
    //解决乱码问题
    $http.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $http.defaults.transformRequest = [ function(data) {
        var param = function(obj) {
            var query = '';
            var name, value, fullSubName, subName, subValue, innerObj, i;
            for (name in obj) {
                value = obj[name];
                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName
                            + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value !== undefined
                    && value !== null) {
                    query += encodeURIComponent(name) + '='
                        + encodeURIComponent(value) + '&';
                }
            }

            return query.length ? query.substr(0,
                    query.length - 1) : query;
        };
        return angular.isObject(data)
            && String(data) !== '[object File]' ? param(data)
            : data;
    } ];
    $scope.competitionId = $stateParams.competitionId;
    $scope.competitionDate = $window.sessionStorage.competitionDate
    $scope.competitionDate = JSON.parse($scope.competitionDate)
    $scope.yearDate = $scope.competitionDate[0].begin.substr(0,4)+' 全部日期'
    $scope.allDay = {begin:$scope.yearDate,day:'all',end:'23:59'}
    $scope.competitionDate.unshift($scope.allDay)

    $scope.showTime = false
    $scope.bgShow = false
    $scope.showProject = false
    $scope.toSelectTime = function(){
        $scope.showTime = true
        $scope.bgShow = true
        $scope.setColor1 = function () {
            var p = '#79CAE0'
            return {'color':p}
        }
        $scope.setBg1 = function () {
            var s = '#79CAE0 transparent transparent transparent'
            var t = '0px'
            var m = '6px'
            return {borderTopWidth:m,borderBottomWidth:t,borderColor:s}
        }
    }
    $scope.shadowBgMiss = function () {
        $scope.showTime = false
        $scope.bgShow = false
        $scope.setColor1 = function () {
            var p = '#717071'
            return {'color':p}
        }
        $scope.setBg1 = function () {
            var s = 'transparent transparent #717071 transparent'
            var t = '6px'
            var m = '0px'
            return {borderTopWidth:m,borderBottomWidth:t,borderColor:s}
        }
    }
    $scope.changeDateNum = 0
    $scope.yearMonthDate = -1
    $scope.timeContent = '全部日期'
    $scope.timeShow = false
    $scope.changeDate = function (num,beginDate) {
        $scope.changeDateNum = num
        if(num != 0){
            $scope.timeShow = true
            $scope.yearMonthDate = beginDate
            $scope.yearMonthDate = $scope.yearMonthDate.replace(/\./g,'-').substr(0,11)
        }
        if(num == 0){
            $scope.timeShow = false
            $scope.yearMonthDate = -1
        }
    }
    $scope.toSelectProject = function(){
        $scope.showProject = true
        $scope.bgShow = true
        $scope.setColor2 = function () {
            var p = '#79CAE0'
            return {'color':p}
        }
        $scope.setBg2 = function () {
            var s = '#79CAE0 transparent transparent transparent'
            var t = '0px'
            var m = '6px'
            return {borderTopWidth:m,borderBottomWidth:t,borderColor:s}
        }
    }

    //时间插件
    $scope.vipTimePickerObject1 = {
        inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
        step: 10,  //Optional
        format: 24,  //Optional
        titleLabel: '时间选择',  //Optional
        setLabel: '确定',  //Optional
        closeLabel: '取消',  //Optional
        setButtonType: 'button-positive',  //Optional
        closeButtonType: 'button-stable',  //Optional
        callback: function (val) {    //Mandatory
            timePickerCallback1(val);
        }
    };
    $scope.vipTimePickerObject2 = {
        inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
        step: 10,  //Optional
        format: 24,  //Optional
        titleLabel: '时间选择',  //Optional
        setLabel: '确定',  //Optional
        closeLabel: '取消',  //Optional
        setButtonType: 'button-positive',  //Optional
        closeButtonType: 'button-stable',  //Optional
        callback: function (val) {    //Mandatory
            timePickerCallback2(val);
        }
    };
    function timePickerCallback1(val) {
        if (typeof (val) === 'undefined') {
            console.log('Time not selected');
        } else {
            $scope.vipTimePickerObject1.inputEpochTime = val;
            $scope.selectedTime1 = epochParser(val);
            console.log('选择的时间：' + epochParser(val));
        }
    }
    function timePickerCallback2(val) {
        if (typeof (val) === 'undefined') {
            console.log('Time not selected');
        } else {
            $scope.vipTimePickerObject2.inputEpochTime = val;
            $scope.selectedTime2 = epochParser(val);
            console.log('选择的时间：' + epochParser(val));
        }
    }

    function prependZero(param) {
        if (String(param).length < 2) {
            return "0" + String(param);
        }
        return param;
    }

    function epochParser(val) {
        if (val === null) {
            return "00:00";
        } else {
            var hours = parseInt(val / 3600);
            var minutes = (val / 60) % 60;
            return (prependZero(hours) + ":" + prependZero(minutes));
        }
    }
    //查看照片详情
    $scope.toPhotoDetails = function (photoId) {
        $state.go('photoDetails',{photoId:photoId})
       // $state.go('photoDetails')
    }

    //获取图片列表
    $scope.hasmore = true
    $scope.page = 1
    $http({
        url:SITE_SUFFIX+'api/competition/photo/list',
        method:'get',
        params:{competitionId:$scope.competitionId,page:$scope.page}
    }).success(function (response) {
        console.log(response)
        if(response.result != 0){
            return;
        }
        $scope.photoLists = response.message
        $scope.loadMore = function () {
            $scope.page += 1
            console.log($scope.page)
            $http({
                url: SITE_SUFFIX + 'api/competition/photo/list',
                method: 'get',
                params: {competitionId:$scope.competitionId,page: $scope.page}
            }).success(function (response) {
                if (response.result != 0) {
                    return;
                }
                for (var i = 0; i < response.message.length; i++) {
                    $scope.photoLists.push(response.message[i])
                }
                if (response.message.length < 12) {
                    $scope.hasmore = false
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
            })
        }
    })

    //下载照片
    $scope.downLoadPre = true
    $scope.downLoadLast = false
    $scope.beendownLoadLast = false
    $scope.selectedPhotos = []
    var idx = 0
    $scope.downLoad = function () {
        $scope.downLoadPre = false
        $scope.downLoadLast = true
        //$scope.beendownLoadLast = false
    }
    $scope.cancelDownLoad = function () {
        $scope.downLoadPre = true
        $scope.downLoadLast = false
        for(var i=0;i<$scope.photoLists.length;i++){
            $scope.photoLists[i].selected = false
        }
        $scope.beendownLoadLast = false
        $scope.selectedPhotos = []

    }
    $scope.selectPhoto = function (index,id) {
        $scope.photoLists[index].selected = true
        $scope.selectedPhotos.push(id)
        if($scope.selectedPhotos.length != 0){
            $scope.beendownLoadLast = true
        }
    }
    $scope.selectMiss = function(index,id){
        $scope.photoLists[index].selected = false
        for(var i=0;i<$scope.selectedPhotos.length;i++){
            if($scope.selectedPhotos[i] == id){
                $scope.selectedPhotos.splice(i,1)
            }
        }
        if($scope.selectedPhotos.length == 0){
            $scope.beendownLoadLast = false
        }

    }

    $scope.selectPicShow = false
    $scope.submitTime = function () {

        if($scope.selectedTime1 == undefined){
            $scope.selectedTime1 = '00:00'
        }
        if($scope.selectedTime2 == undefined){
            $scope.selectedTime2 = '23:59'
        }

        if($scope.selectedTime1.substr(0,2) > $scope.selectedTime2.substr(0,2) || $scope.selectedTime1.substr(0,2) == $scope.selectedTime2.substr(0,2) && $scope.selectedTime1.substr(2,2) >= $scope.selectedTime2.substr(2,2)){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '筛选时间不正确',
                okText:'确定'
            });
            return;
        }
        $scope.bgShow = false
        $scope.showTime = false
        $scope.setColor1 = function () {
            var p = '#717071'
            return {'color':p}
        }
        $scope.setBg1 = function () {
            var s = 'transparent transparent #717071 transparent'
            var t = '6px'
            var m = '0px'
            return {borderTopWidth:m,borderBottomWidth:t,borderColor:s}
        }
        $scope.photoTimeBegin = $scope.yearMonthDate + $scope.selectedTime1
        $scope.photoTimeEnd = $scope.yearMonthDate+$scope.selectedTime2
        if($scope.yearMonthDate != -1){
            $scope.timeContent = $scope.yearMonthDate.substr(5,10) + $scope.selectedTime1 +'-'+$scope.selectedTime2
        }

        if($scope.yearMonthDate == -1){
            $scope.photoTimeBegin = -1
            $scope.photoTimeEnd = -1
            $scope.timeContent = '全部日期'
        }
        console.log(typeof ($scope.photoTimeBegin))
        console.log($scope.photoTimeEnd)
        $http({
            url:SITE_SUFFIX+'api/competition/photo/list',
            method:'post',
            data:{competitionId:$scope.competitionId,beginDate:$scope.photoTimeBegin,endDate:$scope.photoTimeEnd,page: $scope.page}
        }).success(function (response) {
            console.log(response)
            if(response.result != 0){
                return;
            }
            $scope.photoLists = response.message
            if($scope.photoLists.length == 0){
                $scope.selectPicShow = true
            }else{
                $scope.selectPicShow = false
            }
            $scope.loadMore = function () {
                $scope.page += 1
                console.log($scope.page)
                $http({
                    url: SITE_SUFFIX + 'api/competition/photo/list',
                    method: 'get',
                    params: {competitionId:$scope.competitionId,beginDate:$scope.photoTimeBegin,endDate:$scope.photoTimeEnd,page: $scope.page}
                }).success(function (response) {
                    if (response.result != 0) {
                        return;
                    }
                    for (var i = 0; i < response.message.length; i++) {
                        $scope.photoLists.push(response.message[i])
                    }
                    if (response.message.length < 12) {
                        $scope.hasmore = false
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                })
            }
        })
    }
    $scope.goToPre = function () {
        $state.go('groupDetails_v2',{competitionId:$scope.competitionId})
    }
    
    //选好图片，下载至邮箱
    $scope.beenSelected = function () {
        $scope.data = {}
        var myPopup = $ionicPopup.show({
            template: '<span>邮箱地址</span><input type="text" ng-model="data.mail"><span>稍后您将收到包含照片附件的邮件，请注意查收</span>',
            scope: $scope,
            buttons: [
                { text: '取消' },
                {
                    text: '<b>确定</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        if (!$scope.data.mail) {
                            //不允许用户关闭，除非他键入wifi密码
                            e.preventDefault();
                        } else {
                            return $scope.data.mail;
                        }
                    }
                }
            ]
        });
        myPopup.then(function(res) {
            if(res){
                $scope.selectedPic = $scope.selectedPhotos.join(',')
                $scope.mail = res
                var mailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                if(!mailReg.test($scope.mail)){
                    var alertPopup = $ionicPopup.alert({
                        title: '提示信息',
                        template: '请输入有效的邮箱地址！',
                        okText:'确定'
                    });
                    return;
                }
                $http({
                    url:SITE_SUFFIX+'api/competition/photo/addDownloadSelect',
                    method:'post',
                    data:{ids:$scope.selectedPic,mail:$scope.mail}
                }).success(function(response){
                    console.log(response)
                    if(response.result != 0){
                        return
                    }
                    var alertPopup = $ionicPopup.alert({
                        title: '提示信息',
                        template: response.message,
                        okText:'确定'
                    });
                    alertPopup.then(function(res) {
                        $scope.downLoadPre = true
                        $scope.downLoadLast = false
                        for(var i=0;i<$scope.photoLists.length;i++){
                            $scope.photoLists[i].selected = false
                        }
                        $scope.beendownLoadLast = false
                        $scope.selectedPhotos = []
                    });
                })

            }

        });
    }

})