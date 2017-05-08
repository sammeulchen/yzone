/**
 * Created by Administrator on 2016/10/26 0026.
 */
app.controller('createCodeCtrl', function ($scope,$state,$ionicPopup,$window,$http) {

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
    $scope.selectCode = $scope
    $scope.allCodes = [
        {typeName:'身份证'},
        {typeName:'军官证'},
        {typeName:'护照'},
        {typeName:'户口簿'},
        {typeName:'学生证'}

    ]
    for(var i in $scope.allCodes){
        $scope.selectCode.code=$scope.allCodes[0];

    }


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
    $scope.createCode = function () {
        var codeId = $scope.selectCode.code
        var codeNumber = $scope.selectCode.number
        codeId.credentialNumber = codeNumber
        codeId.pictureUrls = pictureUrls


        if (codeNumber == null) {
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请填写证件号码'
            });
            return;
        }
        if (codeId.pictureUrls == null) {
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请上传证件照片'
            });
            return;
        }
        //判断身份证号

        if(codeId.typeName == '身份证'){
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
        if(codeId.typeName == '军官证'){
            var codeReg3 = /^[a-zA-Z0-9]{7,21}$/
            if(!codeReg3.test(codeNumber)){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: '请填写正确的证件号码'
                });
                return;
            }
        }
        if(codeId.typeName == '护照'){
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
        if(codeId.typeName == '户口簿'){
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
            url:SITE_SUFFIX+'api/ucenter/credentials/add',
            method:'post',
            data:codeId
        }).success(function (response) {
            if(response.result != 0){
                return;
            }
            $window.history.back()
        })

    }
})