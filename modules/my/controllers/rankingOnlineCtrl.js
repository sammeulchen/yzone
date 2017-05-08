/**
 * Created by Administrator on 2016/11/17 0017.
 */
app.controller('rankingOnlineCtrl', function ($scope,$state,$http,$window,$ionicPopup) {
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

    $scope.category = $window.sessionStorage.category
    $scope.userReason = $scope
    $scope.content = $scope.userReason.content

     $scope.upLoads = {}
    $scope.pictureUrls = []
    $scope.videoUrl = []

    //上传图片
    var fileSelect = document.getElementById("fileSelect"),
        fileElem = document.getElementById("fileElem");
    preview = document.getElementById("preview")

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

            if (imageType.test(file.type)) {
                var img = document.createElement("img");
                img.classList.add("obj");
                img.file = file;
                // 假设 "preview" 是将要展示图片的 div
                preview.appendChild(img);

                var reader = new FileReader();
                reader.onload = (function (aImg) {
                    return function (e) {
                        aImg.src = e.target.result;
                    };
                })(img);
            }else{
                var video = document.createElement("video");
                video.classList.add("obj");
                video.file = file;
                // 假设 "preview" 是将要展示图片的 div
                preview.appendChild(video);

                var reader = new FileReader();
                reader.onload = (function (aImg) {
                    return function (e) {
                        aImg.src = e.target.result;
                    };
                })(video);
            }
            reader.readAsDataURL(file);
            var fd = new FormData();
            var req = new XMLHttpRequest();
            fd.append('file', files[0]);
            req.open("post", SITE_SUFFIX+"api/upload", true);
            req.onreadystatechange = function () {
                if (req.readyState == 4 && req.status == 200) {
                    if (imageType.test(file.type)) {
                        console.log(JSON.parse(req.responseText))
                        $scope.pictureUrls.push(JSON.parse(req.responseText).message)
                    }else{
                        $scope.videoUrl.push(JSON.parse(req.responseText).message)
                    }
                }

                $scope.upLoad = function () {
                    if($scope.content == null){
                        var alertPoupe = $ionicPopup.alert({
                            title: '提示信息',
                            template: '请填写认证理由',
                            okText:'确定'
                        });
                        return;
                    }
                    $scope.upLoads.category = $scope.category
                    $scope.upLoads.content = $scope.content
                    if($scope.pictureUrls.length != 0 ){
                        $scope.upLoads.pictureUrls = $scope.pictureUrls.join(',')
                    }
                    if($scope.videoUrl.length != 0 ){
                        $scope.upLoads.videoUrl = $scope.videoUrl.join(',')
                    }
                    console.log($scope.upLoads)

                    $http({
                        url:SITE_SUFFIX+'api/ucenter/addAuthApply',
                        method:'post',
                        data:$scope.upLoads
                    }).success(function (response) {
                        if(response.result == 0){
                            var alertPopup = $ionicPopup.alert({
                                title: '提示信息',
                                template: response.message,
                                okText:'确定'
                            });
                            alertPopup.then(function(res) {
                                $state.go('rank')
                            });
                        }
                    })
                }
            };
            req.send(fd);
        }
        return
    }


    $scope.upLoad = function () {
        if($scope.content == null){
            var alertPoupe = $ionicPopup.alert({
                title: '提示信息',
                template: '请填写认证理由',
                okText:'确定'
            });
            return;
        }
        $scope.upLoads.category = $scope.category
        $scope.upLoads.content = $scope.content
        $http({
            url:SITE_SUFFIX+'api/ucenter/addAuthApply',
            method:'post',
            data:$scope.upLoads
        }).success(function (response) {
            if(response.result == 0){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: response.message,
                    okText:'确定'
                });
                alertPopup.then(function(res) {
                    $state.go('rank')
                });
            }
        })
    }



})