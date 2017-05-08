/**
 * Created by Administrator on 2016/11/4 0004.
 */
app.controller('improveInfoCtrl', function ($scope,$state,$http,$interval,$ionicPopup) {
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
    $scope.mySexs = [
        {id:1,text:'男',gender:1},
        {id:2,text:'女',gender:0}
    ]
    $scope.myInfo = $scope
    for(var i in $scope.mySexs){
        $scope.myInfo.gender = $scope.mySexs[0]
    }
    var gender = $scope.mySexs[0].gender
    $scope.changeSex = function () {
        gender = $scope.myInfo.gender.gender
    }
    $scope.codePreShow = true
    $scope.codeLastShow = false

    var verifyCode = {}

    $scope.getCode = function () {
        verifyCode.mobile =$scope.myInfo.mobile
        verifyCode.func = 2
        //判断手机号
        var telReg = /^1[3|4|5|7|8]\d{9}$/
        if (verifyCode.mobile == null) {
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请输入手机号',
                okText:'确定'
            });
            return;
        }
        if (!telReg.test(verifyCode.mobile)) {
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请输入正确的手机号',
                okText:'确定'
            });
            return;
        }
        $http({
            url: SITE_SUFFIX + 'api/verifycode/send',
            method: 'post',
            params: verifyCode
        }).success(function (response) {
            $scope.codePreShow = false
            $scope.codeLastShow = true
            console.log(response)
            if (response.result == 0) {
                $scope.second = 60,
                    timePromise = undefined;

                timePromise = $interval(function () {
                    if ($scope.second <= 0) {
                        $interval.cancel(timePromise);
                        timePromise = undefined;

                        $scope.second = 60;
                        $scope.codePreShow = true
                        $scope.codeLastShow = false

                    } else {
                        $scope.second--;
                        $scope.codePreShow = false
                        $scope.codeLastShow = true
                    }
                }, 1000, 100);
            }
        })
    }
    var myInfos = {}
    $scope.completeMyInfo = function () {
        myInfos.realname = $scope.myInfo.realname
        myInfos.mobile = $scope.myInfo.mobile
        myInfos.gender = gender
        myInfos.code = $scope.myInfo.code
        console.log(myInfos)
        //判断领队姓名

        var nameReg = /^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\.\s]{1,20})$/
        if(myInfos.realname == null){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请填写您的真实姓名',
                okText:'确定'
            });
            return;
        }
        if(!nameReg.test(myInfos.realname)){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请填写您的真实姓名',
                okText:'确定'
            });
            return;
        }
        if(myInfos.mobile == null){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请填写手机号',
                okText:'确定'
            });
            return;
        }
        if(myInfos.code == null){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请填写验证码',
                okText:'确定'
            });
            return;
        }

        $http({
            url:SITE_SUFFIX+'api/ucenter/profile/add',
            method:'post',
            params:myInfos
        }).success(function (response) {
            if(response.result == 0){
                /*$state.go('tab.my')*/
                $window.history.back()
            }
            if(response.result != 0 && response.result !=10009){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: response.message,
                    okText:'确定'
                });
            }

        })

    }
})