/**
 * Created by Administrator on 2016/12/7 0007.
 */
app.controller('changeSingleInfoCtrl', function ($scope,$state,$rootScope,$http,$window,$ionicPopup) {
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

    $scope.personal = $scope
    $scope.personal.realname = $rootScope.realname
    $scope.personal.company = $rootScope.company
    $scope.personal.school = $rootScope.school
    $scope.personal.stadium = $rootScope.stadium
    $scope.personal.racket = $rootScope.racket

    $scope.realnameShow = false
    $scope.companyShow = false
    $scope.schoolShow = false
    $scope.stadiumShow = false
    $scope.racketShow = false
    if($scope.personal.realname != null){
        $scope.realnameShow = true
    }
    if($scope.personal.company != null){
        $scope.companyShow = true
    }
    if($scope.personal.school != null){
        $scope.schoolShow = true
    }
    if($scope.personal.stadium != null){
        $scope.stadiumShow = true
    }
    if($scope.personal.racket != null){
        $scope.racketShow = true
    }
    //保存修改的信息
    $scope.save = function () {
        var realname = $scope.personal.realname
        var company = $scope.personal.company
        var school = $scope.personal.school
        var stadium = $scope.personal.stadium
        var racket = $scope.personal.racket
        console.log(company)
       /* if(realname == null){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请填写您的姓名',
                okText:'确定'
            });
            return;
        }*/
        $http({
            url:SITE_SUFFIX+'api/ucenter/profile/save',
            method:"post",
            data:{realname:realname,company:company,school:school,stadium:stadium,racket:racket}
        }).success(function (response) {
            if(response.result != 0){
                return
            }
            $window.history.back()
        })
    }
})