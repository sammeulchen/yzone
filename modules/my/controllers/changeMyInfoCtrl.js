/**
 * Created by Administrator on 2016/10/21 0021.
 */
app.controller('changeMyInfoCtrl',function($scope,$state,$http,$window,$rootScope){
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

    $scope.selectSex = $scope


      $scope.hasBirth = false;
    $scope.noBirth = false
    var gender = null
    var project = []
    $scope.myProjects = [
        {id:1,text:'单打'},
        {id:2,text:'双打'},
        {id:3,text:'混双'}
    ]

    var gettime = function(time){
        return time.getFullYear()
            +'年'+((time.getMonth()+1)/10>=1? (time.getMonth()+1):('0'+(time.getMonth()+1)))
            +'月'+((time.getDate())/10>=1? (time.getDate()):('0'+(time.getDate())))+'日'
    }

    $http.get(SITE_SUFFIX+'api/ucenter/profile/get').success(function (response) {
        if(response.result != 0){
            return
        }
        console.log(response)
        $scope.userInfo = response.message
        $scope.codes = response.message.credentialList
       // document.getElementById('date-selector-input').value

        console.log(gettime(new Date($scope.userInfo.birthday)))
        if($scope.userInfo.birthday == null){
            console.log(1)
            document.getElementById('date-selector-input').value = gettime(new Date())
        }else{
            console.log(2)
            document.getElementById('date-selector-input').value = gettime(new Date($scope.userInfo.birthday))
        }
        console.log(response)
        if($scope.userInfo.birthday == null){
            $scope.noBirth = true
        }else{
            $scope.hasBirth = true
        }
        $scope.goodAtProject = response.message.goodAtProjects
        //跳转到修改擅长项目
        $scope.toGoodAtProjects = function () {
            $window.sessionStorage.goodAtProject = $scope.goodAtProject
            $state.go('goodAtProjects')
        }
        //跳转到修改个人单独信息
        //姓名
        $scope.toChangeSingleInfo1 = function () {
            $rootScope.realname = $scope.userInfo.realname
            $rootScope.company = null
            $rootScope.school = null
            $rootScope.stadium = null
            $rootScope.racket = null
            $state.go('changeSingleInfo')
        }
        //公司
        $scope.toChangeSingleInfo2 = function () {
            $rootScope.realname = null
            $rootScope.company = $scope.userInfo.company
            $rootScope.school = null
            $rootScope.stadium = null
            $rootScope.racket = null
            $state.go('changeSingleInfo')
        }
        //学校
        $scope.toChangeSingleInfo3 = function () {
            $rootScope.realname = null
            $rootScope.company = null
            $rootScope.school = $scope.userInfo.school
            $rootScope.stadium = null
            $rootScope.racket = null
            $state.go('changeSingleInfo')
        }
        //活跃场馆
        $scope.toChangeSingleInfo4 = function () {
            $rootScope.realname = null
            $rootScope.company = null
            $rootScope.school = null
            $rootScope.stadium = $scope.userInfo.stadium
            $rootScope.racket = null
            $state.go('changeSingleInfo')
        }
        //球拍
        $scope.toChangeSingleInfo5 = function () {
            $rootScope.realname = null
            $rootScope.company = null
            $rootScope.school = null
            $rootScope.stadium = null
            $rootScope.racket = $scope.userInfo.racket
            $state.go('changeSingleInfo')
        }

        //性别
        $scope.mySexs = [
            {id:1,text:'男',gender:1},
            {id:2,text:'女',gender:0}
        ]
        for(var i in $scope.mySexs){
            if($scope.userInfo.gender == 1){
                $scope.selectSex.sex=$scope.mySexs[0];
                gender = 1
            }else{
                $scope.selectSex.sex=$scope.mySexs[1];
                gender = 0
            }

        }
        $scope.changeSex = function () {
            gender = $scope.selectSex.sex.gender
            console.log(gender)
            $http({
                url:SITE_SUFFIX+'api/ucenter/profile/save',
                method:'post',
                data:{gender:gender}
            }).success(function (response) {
                console.log(response)
                if(response.result != 0){
                    return;
                }

            })
        }
//修改日期

        new DateSelector({
            input : 'date-selector-input',//点击触发插件的input框的id
            container : 'targetContainer',//插件插入的容器id
            type : 0,
            //0：不需要tab切换，自定义滑动内容，建议小于三个；
            //1：需要tab切换，【年月日】【时分】完全展示，固定死，可设置开始年份和结束年份
            param : [1,1,1,0,0],
            //设置['year','month','day','hour','minute'],1为需要，0为不需要,需要连续的1
            beginTime : [1920,01,01],//如空数组默认设置成1970年1月1日0时0分开始，如需要设置开始时间点，数组的值对应param参数的对应值。
            endTime : [],//如空数组默认设置成次年12月31日23时59分结束，如需要设置结束时间点，数组的值对应param参数的对应值。
            recentTime : [new Date($scope.userInfo.birthday).getFullYear(),new Date($scope.userInfo.birthday).getMonth()+1,new Date($scope.userInfo.birthday).getDate()],//如不需要设置当前时间，被为空数组，如需要设置的开始的时间点，数组的值对应param参数的对应值。
            success : function(arr){
                console.log(arr);
                $scope.beginTimes1 = arr[0]+'年'+ ((arr[1]/10>=1) ? arr[1] : ('0'+arr[1]))+'月'+((arr[2]/10>=1) ? arr[2] : ('0'+arr[2]))+'日'
                document.getElementById('date-selector-input').value = $scope.beginTimes1
                var birthday = arr[0]+'-'+ ((arr[1]/10>=1) ? arr[1] : ('0'+arr[1]))+'-'+((arr[2]/10>=1) ? arr[2] : ('0'+arr[2]))
                $http({
                    url:SITE_SUFFIX+'api/ucenter/profile/save',
                    method:'post',
                    data:{birthday:birthday}
                }).success(function (response) {
                    console.log(response)
                    if(response.result != 0){
                        return;
                    }
                })
            }//回调
        });


    })



    //上传头像
    $scope.filePreShow = true
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
        $scope.filePreShow = false
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
            fd.append('w', 60);
            req.open("post", SITE_SUFFIX+"api/upload", true);
            req.onreadystatechange = function () {
                if (req.readyState == 4 && req.status == 200) {
                    $http({
                        url:SITE_SUFFIX+'api/ucenter/profile/save',
                        method:'post',
                        data:{avatar:JSON.parse(req.responseText).message}
                    }).success(function (response) {
                        console.log(response)
                        if(response.result != 0){
                            return;
                        }
                        var reader = new FileReader();
                        reader.onload = (function (aImg) {
                            return function (e) {
                                aImg.src = e.target.result;
                            };
                        })(img);

                        reader.readAsDataURL(file);
                    })
                }
            };
            req.send(fd);
        }
    }

    $scope.toMyCode = function(){
        $state.go('myCode')
    }
    //修改电话号码
    $scope.toChangeMobile = function () {
        $state.go('verifyIdentity')
    }

    
})