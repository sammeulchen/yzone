/**
 * Created by Administrator on 2017/1/9 0009.
 */
app.controller('editPartnerCtrl', function ($scope,$state,$stateParams,$http,$ionicPopup,$window,$rootScope) {
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


    $scope.competitionId = $stateParams.competitionId
    $scope.orderId = $window.sessionStorage.orderId
    $scope.projectCategory = $window.sessionStorage.projectCategory
    //获取所需证件
    var codes = [];
    var code1 = {};
    var code2 = {};
    var code3 = {};
    var code4 = {};
    var code5 = {};
    $scope.selectCode = $scope;
    var credentialReuire = "";
    var pictureUrls = null;
    $http({
        url:SITE_SUFFIX+'api/competition/cerRequire/62',
        method:'get',
        params:{competitionId:$scope.competitionId}
    }).success(function (response) {
        console.log(response)

            $scope.needPhotoNumber = JSON.parse(response.message).needPhotoNumber

            $scope.credentialEnable = JSON.parse(response.message).credentialEnable


            $scope.codes = ($scope.credentialEnable).split(',')
            for(var i=0;i< $scope.codes.length;i++){
                if($scope.codes[i] == '身份证'){
                    code1.typeId = 1;
                    code1.TypeName = '身份证';
                    codes.push(code1)
                }
                if($scope.codes[i] == '军官证'){
                    code2.typeId = 2;
                    code2.TypeName = '军官证';
                    codes.push(code2)
                }
                if($scope.codes[i] == '护照'){
                    code3.typeId = 3;
                    code3.TypeName = '护照';
                    codes.push(code3)
                }
                if($scope.codes[i] == '户口簿'){
                    code4.typeId = 4;
                    code4.TypeName = '户口簿';
                    codes.push(code4)
                }
                if($scope.codes[i] == '学生证'){
                    code5.typeId = 5;
                    code5.TypeName = '学生证';
                    codes.push(code5)
                }
            }
            $scope.codes = codes

            for(var i in $scope.codes){
                $scope.selectCode.code=$scope.codes[0];
            }
    })

    $scope.sexs = [
        {id:1,text:'男'},
        {id:0,text:'女'}
    ]
    $scope.selectSex = $scope
    var gender = 1
    for(var i in $scope.sexs){
        $scope.selectSex.sex=$scope.sexs[0];
    }
    $scope.changeSex = function () {
        gender = $scope.selectSex.sex.id
    }

    //上传证件照片

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

    var submitInfo = {} ,credentialInfo = {}
    $scope.members = $scope;
    $scope.pid = $rootScope.pid
console.log($scope.pid)
    //console.log(Number ($scope.pid))
    if($scope.pid == undefined){
        $scope.pid = -1
    }
    if($scope.pid != -1){
        $http({
            url:SITE_SUFFIX+'api/competition/order/member/'+$scope.pid,
            method:'get',
            params:{orderId:$scope.orderId}
        }).success(function (response) {
            if(response.result != 0){
                return;
            }
            console.log(response)
            $scope.members = response.message
        })
    }
    $scope.toRegNext = function (id,number,mobile) {

        if(Number($scope.pid) == null){
            $scope.pid = -1
        }
        submitInfo.oldPid = $scope.pid
        submitInfo.orderId = $scope.orderId
        submitInfo.realname = $scope.members.realname
        submitInfo.gender = gender

        submitInfo.cerNumber = $scope.members.cerNumber
        submitInfo.cerName = $scope.selectCode.code.TypeName
        credentialInfo.typeId = $scope.selectCode.code.TypeId
        submitInfo.cerPicture = pictureUrls

        submitInfo.mobile = $scope.members.mobile

        console.log(submitInfo)
        //对需要填的信息进行判断
        //姓名
        var nameReg = /^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\.\s]{1,20})$/
        if (submitInfo.realname == "" || submitInfo.realname == null) {
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '姓名不能为空',
                okText: '确定'
            });
            return
        }
        if (!nameReg.test(submitInfo.realname)) {
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请填写正确的姓名',
                okText: '确定'
            });
            return
        }
            //判断证件号
            if (submitInfo.cerNumber == null) {
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: '证件号码不能为空',
                    okText: '确定'
                });
                return
            }
            if (credentialInfo.typeId == 1) {
                var codeReg1 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/  //18位
                var codeReg2 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/ //15位
                if (!codeReg1.test(credentialInfo.number) && !codeReg2.test(credentialInfo.number)) {
                    var alertPopup = $ionicPopup.alert({
                        title: '提示信息',
                        template: '请正确的证件号码',
                        okText: '确定'
                    });
                    return
                }
            }
            if (credentialInfo.typeId == 2) {
                var codeReg3 = /^[a-zA-Z0-9]{7,21}$/
                if (!codeReg3.test(credentialInfo.number)) {
                    var alertPopup = $ionicPopup.alert({
                        title: '提示信息',
                        template: '请正确的证件号码',
                        okText: '确定'
                    });
                    return
                }
            }
            if (credentialInfo.typeId == 3) {
                var codeReg4 = /^[a-zA-Z]{5,17}$/  //18位
                var codeReg5 = /^[a-zA-Z0-9]{5,17}$/ //15位
                if (!codeReg4.test(credentialInfo.number) && !codeReg5.test(credentialInfo.number)) {
                    var alertPopup = $ionicPopup.alert({
                        title: '提示信息',
                        template: '请正确的证件号码',
                        okText: '确定'
                    });
                    return
                }
            }
            if (credentialInfo.typeId == 4) {
                var codeReg6 = /^[a-zA-Z0-9]{3,21}$/
                if (!codeReg6.test(credentialInfo.number)) {
                    var alertPopup = $ionicPopup.alert({
                        title: '提示信息',
                        template: '请正确的证件号码',
                        okText: '确定'
                    });
                    return
                }
            }
            //判断图片是否上传
            if (submitInfo.cerPicture == null) {
                if (number == 2) {
                    var alertPopup = $ionicPopup.alert({
                        title: '提示信息',
                        template: '请上传证件照片',
                        okText: '确定'
                    });
                    return
                }
            }


        if (mobile == null || mobile == "") {
            //判断手机号
            var telReg = /^1[3|4|5|7|8]\d{9}$/
            if (submitInfo.mobile == null || submitInfo.mobile == "") {
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: '电话号码不能为空',
                    okText: '确定'
                });
                return
            }
            if (!telReg.test(submitInfo.mobile)) {
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: '请填写正确的电话号码',
                    okText: '确定'
                });
                return
            }

        }

        $http({
            url:SITE_SUFFIX+'api/competition/order/addPaterner',
            method:'post',
            data: submitInfo
        }).success(function (response) {
            if(response.result !=0 && response.result != 1009){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: response.message,
                    okText: '确定'
                });
                return;
            }
            console.log(response)
            $state.go('dPDetails')
        })



    }
})