/**
 * Created by Administrator on 2016/12/7 0007.
 */
app.controller("editCodeCtrl", function ($state,$scope,$http,$window,$ionicPopup) {
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


    $scope.myCode = {}
    $scope.myCode.id = $window.sessionStorage.id
    $scope.myCode.name = $window.sessionStorage.name
    $scope.myCode.number = $window.sessionStorage.number
    $scope.myCode.picUrl = $window.sessionStorage.picUrl
    console.log($scope.myCode)

    var picUrls = null
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
        $scope.noPhotoShow = false
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
                    console.log(reader)
                    reader.onload = (function (aImg) {
                        return function (e) {
                            aImg.src = e.target.result;
                        };
                    })(img);

                    reader.readAsDataURL(file);
                    console.log(JSON.parse(req.responseText))
                    picUrls = JSON.parse(req.responseText).message
                }
            };
            req.send(fd);

        }
    }

    var saveCode = {}
    $scope.saveCode = function () {
        codeNumber = $scope.myCode.number
        if(codeNumber == null){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请填写证件号码'
            });
            return;
        }
        if(saveCode.name == '身份证'){
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
        if(saveCode.name == '军官证'){
            var codeReg3 = /^[a-zA-Z0-9]{7,21}$/
            if(!codeReg3.test(codeNumber)){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: '请填写正确的证件号码'
                });
                return;
            }
        }
        if(saveCode.name == '护照'){
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
        if(saveCode.name == '户口簿'){
            var codeReg6 = /^[a-zA-Z0-9]{3,21}$/
            if(!codeReg6.test(codeNumber)){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: '请填写正确的证件号码'
                });
                return;
            }
        }
        saveCode.id = $scope.myCode.id
        saveCode.credentialNumber = codeNumber
        saveCode.pictureUrls = picUrls

        console.log(saveCode)
        $http({
            url:SITE_SUFFIX+'api/ucenter/credentials/update',
            method:'post',
            data:saveCode
        }).success(function (response) {
            console.log(response)
            if(response.result !=0){
                return
            }
            $window.history.back()

        })



    }
})