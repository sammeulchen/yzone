/**
 * Created by Administrator on 2016/12/7 0007.
 */
app.controller('changeUserInfoCtrl', function ($scope,$state,$rootScope,$http,$window,$ionicPopup) {
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

    var orderId = $window.sessionStorage.orderId
    $scope.personal = $scope
    $scope.personal.teamName = $rootScope.teamName
    $scope.personal.coachName = $rootScope.coachName
    $scope.personal.applyerName = $rootScope.applyerName
    $scope.mobile = $rootScope.mobile
    console.log($scope.personal.applyerName)
    console.log($scope.mobile)


    //保存修改的信息
    $scope.submitInfo = function () {
        var teamName = $scope.personal.teamName
        var coachName = $scope.personal.coachName
        var applyerName = $scope.personal.applyerName
        console.log(applyerName)
        $http({
            url:SITE_SUFFIX+'api/competition/order/updateTeamInfo',
            method:"post",
            data:{orderId:orderId,teamName:teamName,coachName:coachName,leaderName:applyerName}
        }).success(function (response) {
            if(response.result != 0){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: response.message,
                    okText: '确定'
                });
            }
            $window.history.back()
        })
    }
})