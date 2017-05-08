/**
 * Created by Administrator on 2016/12/8 0008.
 */
app.controller('goodAtProjectsCtrl', function ($scope,$http,$window) {
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
    var project = $window.sessionStorage.goodAtProject
    $scope.devList = [
        { text: "单打", checked: false },
        { text: "双打", checked: false },
        { text: "混双", checked: false }
    ];
    project = project.split(',')
    for(var i=0;i<project.length;i++){
        for(var j=0;j<$scope.devList.length;j++){
            if($scope.devList[j].text == project[i]){
                $scope.devList[j].checked = true
            }
        }
    }
    $scope.goodAtProject =  []
    $scope.save = function () {
        for(var j=0;j<$scope.devList.length;j++){
            if($scope.devList[j].checked){
                $scope.goodAtProject.push($scope.devList[j].text)
            }
        }

        $scope.goodAtProject = $scope.goodAtProject.join(',')
        console.log($scope.goodAtProject)
        $http({
            url:SITE_SUFFIX+'api/ucenter/profile/save',
            method:"post",
            params:{goodAt:$scope.goodAtProject}
        }).success(function (response) {
            console.log(response)
            if(response.result != 0){
                return
            }
            $window.history.back()
        })
    }
})