/**
 * Created by Administrator on 2016/10/25 0025.
 */
app.controller('createChildInfoCtrl', function ($scope,$state,$rootScope,$http,$ionicPopup,$window) {
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
    //获取证件信息
    $scope.selectCode = $scope
    $scope.creInfo = []
    $scope.creCode = {}
    $scope.creInfo[0] = $scope.creCode
    $scope.allCodes = [
        {typeName:'身份证',id:1},
        {typeName:'军官证',id:2},
        {typeName:'护照',id:3},
        {typeName:'户口簿',id:4},
        {typeName:'学生证',id:5}

    ]
    for(var i in $scope.allCodes){
        $scope.selectCode.code=$scope.allCodes[0];
        $scope.creCode.typeName = $scope.selectCode.code.typeName
        $scope.creCode.typeId = $scope.selectCode.code.id
    }




    //修改性别
    var gender = null
    $scope.selectSex = $scope
    $scope.mySexs = [
        {id:1,text:'男',gender:1},
        {id:2,text:'女',gender:0}
    ]
    for(var i in $scope.mySexs){
        $scope.selectSex.sex=$scope.mySexs[0];
        gender = 1
    }
    $scope.changeSex = function () {
        gender = $scope.selectSex.sex.gender
    }
    //修改日期

    $scope.times = new Date().getFullYear()
        +'年'+((new Date().getMonth()+1)/10>=1? (new Date().getMonth()+1):('0'+(new Date().getMonth()+1)))
        +'月'+((new Date().getDate())/10>=1? (new Date().getDate()):('0'+(new Date().getDate())))+'日'
    document.getElementById('date-selector-input').value = $scope.times
    new DateSelector({
        input : 'date-selector-input',//点击触发插件的input框的id
        container : 'targetContainer',//插件插入的容器id
        type : 0,
        //0：不需要tab切换，自定义滑动内容，建议小于三个；
        //1：需要tab切换，【年月日】【时分】完全展示，固定死，可设置开始年份和结束年份
        param : [1,1,1,0,0],
        //设置['year','month','day','hour','minute'],1为需要，0为不需要,需要连续的1
        beginTime : [1920,01,01],//如空数组默认设置成1970年1月1日0时0分开始，如需要设置开始时间点，数组的值对应param参数的对应值。
        endTime : [],//如空数组默认设置成次年12月31日23时59分结束，如需要设置结束时间点，数组的值对应param参数的对应值。
        recentTime : [],//如不需要设置当前时间，被为空数组，如需要设置的开始的时间点，数组的值对应param参数的对应值。
        success : function(arr){
            console.log(arr);
            $scope.beginTimes1 = arr[0]+'年'+ ((arr[1]/10>=1) ? arr[1] : ('0'+arr[1]))+'月'+((arr[2]/10>=1) ? arr[2] : ('0'+arr[2]))+'日'
            document.getElementById('date-selector-input').value = $scope.beginTimes1
        }//回调
    });

    //上传头像
    var avatar = null
    var fileSelect = document.getElementById("fileSelect"),
        fileElem = document.getElementById("fileElem");
   // preview = document.getElementById("preview")

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
            fd.append('file', files[0]);
            fd.append('w', 60);
            req.open("post", SITE_SUFFIX+"api/upload", true);
            req.onreadystatechange = function () {
                if (req.readyState == 4 && req.status == 200) {
                    console.log(JSON.parse(req.responseText))
                    var reader = new FileReader();
                    reader.onload = (function (aImg) {
                        return function (e) {
                            aImg.src = e.target.result;
                        };
                    })(img);

                    reader.readAsDataURL(file);
                    avatar = JSON.parse(req.responseText).message
                }
            };
            req.send(fd);
        }
    }

    //上传证件照片
    var fileSelect1 = document.getElementById("fileSelect1"),
        fileElem1 = document.getElementById("fileElem1");
        picUrl = null
    // preview = document.getElementById("preview")

    fileSelect1.addEventListener("click", function (e) {
        if (fileElem1) {
            fileElem1.click();
        }
        e.preventDefault(); // prevent navigation to "#"
    }, false);

    $scope.handleFiles1 = function(files) {

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
            fileSelect1.appendChild(img);


            var fd = new FormData();
            var req = new XMLHttpRequest();
            fd.append('file', files[0]);
            fd.append('w', 150);
            req.open("post", SITE_SUFFIX+"api/upload", true);
            req.onreadystatechange = function () {
                if (req.readyState == 4 && req.status == 200) {
                    console.log(JSON.parse(req.responseText))
                    var reader = new FileReader();
                    reader.onload = (function (aImg) {
                        return function (e) {
                            aImg.src = e.target.result;
                        };
                    })(img);

                    reader.readAsDataURL(file);
                    picUrl = JSON.parse(req.responseText).message
                }
            };
            req.send(fd);
        }
    }


    //保存新建儿童的信息
    $scope.childInfo = $scope
    $scope.saveChildInfo  = function () {
        $scope.creCode.typeName = $scope.selectCode.code.typeName
        $scope.creCode.typeId = $scope.selectCode.code.id
        var codeNumber = $scope.selectCode.number
        $scope.creCode.credentialNumber = codeNumber
        $scope.creCode.pictureUrls = picUrl
        if($scope.creCode.pictureUrls == null){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '您还未上传证件',
                okText:'确定'
            });
            return;
        }
        var newChildInfo = {}
        newChildInfo.avatar = avatar
        newChildInfo.realname = $scope.childInfo.realname
        newChildInfo.gender = gender
        var birthday = document.getElementById('date-selector-input').value
        var birthday = (birthday).replace(/年|月/g,'-')
        var birthday = birthday.replace(/日/g,'')
        newChildInfo.birthday = birthday
        newChildInfo.creInfo = JSON.stringify($scope.creInfo)
        console.log(newChildInfo)

        if(codeNumber == null){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请填写证件号码',
                okText:'确定'
            });
            return;
        }

        if($scope.creCode.typeName == '身份证'){
            var codeReg1 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/  //18位
            var codeReg2 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/ //15位


            if(!codeReg1.test(codeNumber) && !codeReg2.test(codeNumber)){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: '请填写正确的证件号码'
                });
                return;
            }
        }
        if($scope.creCode.typeName == '军官证'){
            var codeReg3 = /^[a-zA-Z0-9]{7,21}$/
            if(!codeReg3.test(codeNumber)){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: '请填写正确的证件号码'
                });
                return;
            }
        }
        if($scope.creCode.typeName == '护照'){
            var codeReg4 = /^[a-zA-Z]{5,17}$/  //18位
            var codeReg5 = /^[a-zA-Z0-9]{5,17}$/ //15位
            if(!codeReg4.test(codeNumber) && !codeReg5.test(codeNumber)){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: '请填写正确的证件号码'
                });
                return;
            }
        }
        if($scope.creCode.typeName == '户口簿'){
            var codeReg6 = /^[a-zA-Z0-9]{3,21}$/
            if(!codeReg6.test(codeNumber)){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: '请填写正确的证件号码'
                });
                return;
            }
        }
        $http({
            url:SITE_SUFFIX+'api/ucenter/children/add',
            method:'post',
            data:newChildInfo
        }).success(function (response) {
            if(response.result == 0){
                $state.go('childrenInfo')
            }
            if(response.result > 0 && response.result != 10009){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: response,
                    okText:'确定'
                });
            }
            console.log(response)
        })

    }



})