/**
 * Created by Administrator on 2016/12/28 0028.
 */
app.controller('userRegCtrl', function ($scope,$state,$http,$interval,$stateParams,$ionicPopup,PaymentOrder,$window,$rootScope) {
    $scope.competitionId = $stateParams.competitionId
    $scope.order = PaymentOrder.PayOrder
    $scope.projectCategory = $rootScope.projectCategory
    console.log($scope.order)
    console.log(PaymentOrder)

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

//进入页面获取用户信息
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
        url:SITE_SUFFIX+'api/competition/profile/get',
        method:'post',
        params:{competitionId:$scope.competitionId}
    }).success( function (response) {
        if(response.result !=0){
            return;
        }
        $scope.members = response.message
        console.log(response)
        //有用户信息显示的性别
        if($scope.members.mobile != null){
            if($scope.members.gender != null){
                if($scope.members.gender == 1){
                    $scope.selectSex.sex=$scope.sexs[0];
                    gender =1;
                }
                if($scope.members.gender == 0){
                    $scope.selectSex.sex=$scope.sexs[1];
                    gender =0;
                }
            }
        }


        //本次比赛需要的证件
        credentialReuire = $scope.members.credentialReuire;
        if($scope.members.credentialReuire != null && $scope.members.credentialReuire != "") {
            $scope.needPhotoNumber = JSON.parse($scope.members.credentialReuire).needPhotoNumber

            $scope.credentialReuire = JSON.parse($scope.members.credentialReuire)

            $scope.codes = ($scope.credentialReuire.credentialEnable).split(',')
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

            //用户已经拥有证件
            if(response.message.userCredentialInfo != null){
                $scope.userCredentialInfo = response.message.userCredentialInfo
                if($scope.userCredentialInfo != null){
                    if($scope.userCredentialInfo.typeId == 1){
                        $scope.selectCode.code = $scope.codes[0];
                    }
                    if($scope.userCredentialInfo.typeId == 2){
                        $scope.selectCode.code = $scope.codes[1];
                    }
                    if($scope.userCredentialInfo.typeId == 3){
                        $scope.selectCode.code = $scope.codes[2];
                    }
                    if($scope.userCredentialInfo.typeId == 4){
                        $scope.selectCode.code = $scope.codes[3];
                    }
                    if($scope.userCredentialInfo.typeId == 5){
                        $scope.selectCode.code = $scope.codes[4];
                    }
                }
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
                        $scope.picUPLoad = true
                        if (req.readyState == 4 && req.status == 200) {
                            $scope.picUPLoad = false
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
        }

    })


    //验证码
    var verifyCode= {

    }
    $scope.userInfo = $scope
    $scope.paracont = "获取验证码";
    $scope.paraclass = "send-code";
    $scope.paraevent = true;
    $scope.getCode = false;
    $scope.sendCode = function () {
        console.log(111)
        //verifyCode.mobile = ($scope.userInf.mobile).replace(/-/g,'')
        verifyCode.mobile = $scope.userInfo.mobile
        console.log(verifyCode.mobile )
        verifyCode.func = 2
        //判断手机号
        var telReg = /^1[3|4|5|7|8]\d{9}$/
        if (verifyCode.mobile == null || verifyCode.mobile == "") {
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '电话号码不能为空',
                okText:'确定'
            });
            return
        }
        if (!telReg.test(verifyCode.mobile)) {
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请填写正确的电话号码',
                okText:'确定'
            });
            return
        }
        $http({
            url: SITE_SUFFIX + 'api/verifycode/send',
            method: 'post',
            params: verifyCode
        }).success(function (response) {
            console.log(response)
            if (response.result == 0) {

                var second = 60,
                    timePromise = undefined;

                timePromise = $interval(function () {
                    if (second <= 0) {
                        $interval.cancel(timePromise);
                        timePromise = undefined;

                        second = 60;
                        $scope.paracont = "获取验证码";
                        $scope.getCode = false;
                        $scope.paraclass = "send-code";
                        $scope.paraevent = true;
                    } else {
                        $scope.paracont = second + "s后重新获取";
                        $scope.getCode = true;
                        $scope.paraclass = "send-code-click";
                        second--;
                    }
                }, 1000, 100);
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: response.message
                });
                alertPopup.then(function(res) {
                });
                $scope.showTimer = false
            }
        })
    }

    $scope.changeMobile = function () {
        $state.go('verifyIdentity')
    }
    //跳转到给自己定级
    $scope.toOwnRanking1 = function () {
        $rootScope.singleLvel = 1
        $state.go('ownRanking')
    }
    $scope.toOwnRanking2 = function () {
        $rootScope.singleLvel = 2
        $state.go('ownRanking')
    }

    //获取用户信息提交并跳转到项目页
    var submitInfo = {},credentialInfo={};
   $scope.user = $scope
    $scope.userCredentialInfo = $scope
    $scope.toRegNext = function (id,number,mobile,level1,level2) {

        submitInfo.uname = $scope.members.realname
        submitInfo.gender = gender

        if(credentialReuire != null && credentialReuire != ""){
            submitInfo.credentialInfo = credentialInfo
            credentialInfo.number = $scope.userCredentialInfo.number
            credentialInfo.typeId = $scope.selectCode.code.typeId
            credentialInfo.typeName = $scope.selectCode.code.TypeName
            credentialInfo.pictureUrl = pictureUrls
        }
        if(level1 == -1){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请您先去设置您的单打级别',
                okText:'确定'
            });
            return
        }
        if(level2 == -1){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请您先去设置您的双打级别',
                okText:'确定'
            });
            return
        }


        submitInfo.mobile = $scope.user.mobile
        submitInfo.verifyCode = $scope.members.indCode

        console.log(submitInfo)
        //对需要填的信息进行判断
        //姓名
        var nameReg = /^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\.\s]{1,20})$/
        if(submitInfo.uname == "" || submitInfo.uname ==  null){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '姓名不能为空',
                okText:'确定'
            });
            return
        }
        if(!nameReg.test(submitInfo.uname)){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请填写正确的姓名',
                okText:'确定'
            });
            return
        }
        if(credentialReuire != null && credentialReuire != "") {
            //判断证件号
            if (credentialInfo.number == null) {
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
            if (credentialInfo.pictureUrl == null) {
                if (number == 2) {
                    if($scope.userCredentialInfo.pictureUrl == null){
                        var alertPopup = $ionicPopup.alert({
                            title: '提示信息',
                            template: '请上传证件照片',
                            okText: '确定'
                        });
                        return
                    }
                }

            }
        }

        if(mobile == null || mobile == ""){
            //判断手机号
            var telReg = /^1[3|4|5|7|8]\d{9}$/
            if (submitInfo.mobile == null || submitInfo.mobile == "") {
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: '电话号码不能为空',
                    okText:'确定'
                });
                return
            }
            if (!telReg.test(submitInfo.mobile)) {
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: '请填写正确的电话号码',
                    okText:'确定'
                });
                return
            }
            //判断验证码
            if(submitInfo.verifyCode == null || submitInfo.verifyCode == ""){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: '请填写验证码',
                    okText:'确定'
                });
                return
            }
        }
        $scope.isPartner = $rootScope.isPartner
        if($scope.isPartner != 'undefined' && $scope.isPartner != null){
            $scope.orderId = $window.sessionStorage.orderId
            $scope.pid = $window.sessionStorage.pid
            submitInfo.orderId = $scope.orderId
            submitInfo.pid = $scope.pid
            console.log(submitInfo)
            $http({
                url: SITE_SUFFIX + 'api/competition/order/accept',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(submitInfo)
            }).success(
                function (res) {
                    if(res.result == 0){
                        $window.sessionStorage.projectCategory = $scope.projectCategory
                        if($scope.projectCategory == 1){
                            $state.go('projectDetails')
                        }
                        if($scope.projectCategory == 2 || $scope.projectCategory == 3){
                            $state.go('dPDetails')
                        }
                    }else{
                        var alertPopup = $ionicPopup.alert({
                            title: '提示信息',
                            template: res.message,
                            okText:'确定'
                        });
                    }
                }
            )

        }else{
            $http({
                url: SITE_SUFFIX + 'api/competition/profile/save',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(submitInfo)
            }).success(
                function (res) {
                    if (res.result == 0) {

                        if($scope.order == null){
                            $state.go('selectedProject', {competitionId: $scope.competitionId})
                        }
                        if($scope.order != null){
                            $window.history.back()
                        }

                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: '提示信息',
                            template: res.message,
                            okText:'确定'
                        });
                    }
                }
            )
        }

    }
})