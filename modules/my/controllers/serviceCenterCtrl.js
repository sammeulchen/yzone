/**
 * Created by Administrator on 2016/10/20 0020.
 */
app.controller('serviceCenterCtrl', function ($scope,$state,$http,$ionicPopup) {
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
    $scope.toDisclaimer = function () {
        $state.go('disclaimer')
    }
    $scope.yourAdvice = $scope
    $scope.submitAdvice = function () {
        var yourAdvice = $scope.yourAdvice.advice
        console.log(yourAdvice)
        $http({
            url:SITE_SUFFIX+'api/competition/feedback/add',
            method:'post',
            data:{content:yourAdvice,type:2}
        }).success(function (response) {
            if(response.result == 0){
                $scope.yourAdvice.advice == null
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: response.message,
                    okText:'确定'
                });
            }
            if(response.result > 0 && response.result != 10009){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: response.message,
                    okText:'确定'
                });
            }

        })
    }
    //跳转到羽众分级及积分体系
    $scope.toYZRank = function () {
        $state.go('YZRank')
    }
})