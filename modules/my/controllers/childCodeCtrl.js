/**
 * Created by Administrator on 2016/11/8 0008.
 */
app.controller('childCodeCtrl', function ($scope,$state,$http,$window,$ionicPopup,$rootScope) {

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

    var childId = $window.sessionStorage.childId

    var childCodes = null

    $http.get(SITE_SUFFIX+'api/ucenter/children/crelist/'+childId).success(function (response) {
        if(response.result != 0 ){
            return;
        }
        $scope.childCodes = response.message
        for(var i=0;i<$scope.childCodes.length;i++){
            if($scope.childCodes[i].pictureUrls == null || $scope.childCodes[i].pictureUrls == ""){
                $scope.childCodes[i].noCodeUrl = true
            }else{
                $scope.childCodes[i].hasCodeUrl = true
            }
        }
    })

    //修改证件
    $scope.editCode = function (id,picUrl,name,number) {
        console.log(number)
        $window.sessionStorage.id = id
        $window.sessionStorage.number = number
        $window.sessionStorage.name = name
        $window.sessionStorage.picUrl = picUrl
        $state.go('editCode')
    }

    //删除证件
    $scope.deleteCode = function (credientialId) {
        var confirmPopup = $ionicPopup.confirm({
            title: '提示信息',
            template: '您确定删除该证件吗？',
            cancelText:'取消',
            okText:'确定'
        });
        confirmPopup.then(function(res) {
            if(res) {
                $http.get(SITE_SUFFIX+'api/ucenter/credentials/delete/'+credientialId).success(function (response) {
                    if(response.result != 0) {
                        return
                    }
                    $http.get(SITE_SUFFIX+'/api/ucenter/children/crelist/'+childId).success(function (response) {
                        if (response.result != 0) {
                            return
                        }
                        $scope.childCodes = response.message
                        for(var i=0;i<$scope.childCodes.length;i++){
                            if($scope.childCodes[i].pictureUrls == null || $scope.childCodes[i].pictureUrls == ""){
                                $scope.childCodes[i].noCodeUrl = true
                            }else{
                                $scope.childCodes[i].hasCodeUrl = true
                            }
                        }
                    })
                });
            }
        })
    }
    //创建新证件
    $scope.toCreateCode = function () {
        $state.go('createChildCode')
    }



})