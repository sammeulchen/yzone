/**
 * Created by Administrator on 2016/10/25 0025.
 */
app.controller('myCodeCtrl', function ($scope,$state,$http,$ionicPopup,$window) {
    $scope.hasCodeUrl = false
    var codes = null
    $scope.noCodeUrl = false
    $http.get(SITE_SUFFIX+'api/ucenter/credentials/list').success(function (response) {
        if (response.result != 0) {
            return
        }
        console.log(response)
         $scope.myCodes = response.message
        codes =  $scope.myCodes
        for(var i=0;i<$scope.myCodes.length;i++){
            if($scope.myCodes[i].pictureUrls == null){
                $scope.myCodes[i].noCodeUrl = true
            }else{
                $scope.myCodes[i].hasCodeUrl = true
            }
        }
    })

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
                    $http.get(SITE_SUFFIX+'/api/ucenter/credentials/list').success(function (response) {
                        if (response.result != 0) {
                            return
                        }
                        console.log(response)
                        $scope.myCodes = response.message
                    })
                });
            }
        })


    }

    //修改证件
    $scope.editCode = function (id,picUrl,name,number) {
        console.log(number)
        $window.sessionStorage.id = id
        $window.sessionStorage.number = number
        $window.sessionStorage.name = name
        $window.sessionStorage.picUrl = picUrl
        $state.go('editCode')
    }

    //添加证件
    $scope.toCreateCode = function () {
        $state.go('createCode')
    }
    var codeUpdate = []
    var codeUpdateItem = {}
    $scope.saveMyCode = function () {

    }


})