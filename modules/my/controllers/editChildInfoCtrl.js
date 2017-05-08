/**
 * Created by Administrator on 2016/11/8 0008.
 */
app.controller('editChildInfoCtrl', function ($scope,$state,$http,$window,$ionicPopup,$rootScope) {
    var childId = $window.sessionStorage.childId
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
    //日历测试
    var currentDate = new Date();
    var date = new Date(currentDate.getFullYear(), currentDate.getMonth(),currentDate.getDate());
    $scope.date = date;



    $scope.onezoneDatepicker = {
        date: date,
        mondayFirst: false,
        months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        daysOfTheWeek: ["日", "一", "二", "三", "四", "五", "六"],
        startDate: new Date(1900, 1, 26),
        endDate: new Date(2050, 1, 26),
        disablePastDays: false,
        disableSwipe: false,
        disableWeekend: false,
        // disableDates: [new Date(date.getFullYear(), date.getMonth(), 15), new Date(date.getFullYear(), date.getMonth(), 16), new Date(date.getFullYear(), date.getMonth(), 17)],
        showDatepicker: false,
        showTodayButton: true,
        calendarMode: false,
        hideCancelButton: false,
        hideSetButton: true
        //callback: $scope.myFunction
    };

    //上传头像
    var pictureUrls = null

    var fileSelect = document.getElementById("fileSelect"),
        fileElem = document.getElementById("fileElem");

    fileSelect.addEventListener("click", function (e) {
        if (fileElem) {
            fileElem.click();
        }
        e.preventDefault(); // prevent navigation to "#"
    }, false);

    $scope.handleFiles = function(files) {
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var imageType = /^image\//;

            if (!imageType.test(file.type)) {
                continue;
            }
            var img = document.createElement("img");
            img.classList.add("obj");
            img.file = file;
            // 假设 "preview" 是将要展示图片的 div
            fileSelect.appendChild(img);


            var fd = new FormData();
            var req = new XMLHttpRequest();
            console.log(req)
            fd.append('file', files[0]);
            fd.append('w', 150);
            req.open("post", SITE_SUFFIX+"api/upload", true);
            req.onreadystatechange = function () {
                if (req.readyState == 4 && req.status == 200) {
                    var reader = new FileReader();
                    reader.onload = (function (aImg) {
                        return function (e) {
                            aImg.src = e.target.result;
                        };
                    })(img);

                    reader.readAsDataURL(file);
                    pictureUrls = JSON.parse(req.responseText).message
                }
            };
            req.send(fd);

        }

    }

    $scope.toBirthday = function () {
        $scope.hasBirth = false;
        $scope.noBirth = true
    }


    $scope.selectSex = $scope
    $scope.hasBirth = false;
    $scope.noBirth = false
    var gender = null
    $http.get(SITE_SUFFIX+'api/ucenter/children/get/'+childId).success(function (response) {
        if(response.result != 0){
            return
        }
        $scope.childInfo = response.message
        if($scope.childInfo.birthday == null){
            $scope.noBirth = true
        }else{
            $scope.hasBirth = true
        }

        $scope.mySexs = [
            {id:1,text:'男',gender:1},
            {id:2,text:'女',gender:0}
        ]
        for(var i in $scope.mySexs){
            if($scope.childInfo.gender == 1){
                $scope.selectSex.sex=$scope.mySexs[0];
                gender = 1
            }else{
                $scope.selectSex.sex=$scope.mySexs[1];
                gender = 0
            }

        }
        $scope.changeSex = function () {
            gender = $scope.selectSex.sex.gender
        }
        //日历测试
        var currentDate = new Date($scope.childInfo.birthday);
        var date = new Date(currentDate.getFullYear(), currentDate.getMonth(),currentDate.getDate());
        $scope.date = date;



        $scope.onezoneDatepicker = {
            date: date,
            mondayFirst: false,
            months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            daysOfTheWeek: ["日", "一", "二", "三", "四", "五", "六"],
            startDate: new Date(1900, 1, 26),
            endDate: new Date(2050, 1, 26),
            disablePastDays: false,
            disableSwipe: false,
            disableWeekend: false,
            // disableDates: [new Date(date.getFullYear(), date.getMonth(), 15), new Date(date.getFullYear(), date.getMonth(), 16), new Date(date.getFullYear(), date.getMonth(), 17)],
            showDatepicker: false,
            showTodayButton: true,
            calendarMode: false,
            hideCancelButton: false,
            hideSetButton: true
            //callback: $scope.myFunction
        };

        //跳转到儿童证件
        $scope.toChildCode = function () {
            $state.go('childCode')
        }
    })

    //删除儿童信息
    $scope.deleteChildInfo = function () {
        var confirmPopup = $ionicPopup.confirm({
            title: '提示信息',
            template: '您确定删除当前孩子的信息吗?',
            okText:'确定',
            cancelText:'取消'
        });
        confirmPopup.then(function(res) {
            if(res) {
                $http.post(SITE_SUFFIX+'api/ucenter/children/delete/'+childId).success(function (response) {

                    if(response.result !=0){
                        return
                    }
                    $window.history.back()
                })
            }
        });


    }

    //保存儿童信息
    $scope.saveChildInfo = function(){
        var childInfo = {}
        childInfo.userid = childId
        childInfo.avatar = pictureUrls
        childInfo.realname = $scope.childInfo.realname
        childInfo.gender = gender
        var birthday = angular.element(document.querySelector('.show-onezone-datepicker'))[0].innerText
        var birthday = (birthday).replace(/年|月/g,'-')
        var birthday = birthday.replace(/日/g,'')
        console.log(birthday)
        childInfo.birthday = birthday
        console.log(childInfo)
        $http({
            url:SITE_SUFFIX+'api/ucenter/children/update',
            method:'post',
            data:childInfo
        }).success(function (response) {
            if(response.result !=0 && response.result != 1009){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: response.message,
                    okText:'确定'
                });
                return
            }
            $window.history.back()
        })
    }




})