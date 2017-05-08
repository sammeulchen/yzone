/**
 * Created by Administrator on 2016/10/24 0024.
 */
app.controller('childrenInfoCtrl', function ($scope,$state,$http,$window) {
    $scope.noChildInfo = false
    $scope.hasChildInfo = false

    $http.get(SITE_SUFFIX+'api/ucenter/children/list').success(function (response) {
        console.log(response)
        if(response.result != 0){
            return;
        }
        if(response.message.length == 0){
            $scope.noChildInfo = true
            $scope.hasChildInfo = false
        }
        if(response.message.length >0){
            $scope.noChildInfo = false
            $scope.hasChildInfo = true
        }
        $scope.childMsges = response.message

        for(var i=0;i<$scope.childMsges.length;i++){
            if($scope.childMsges[i].gender == 0){
                $scope.childMsges[i].womanShow = true
                $scope.childMsges[i].manShow = false
            }
            if($scope.childMsges[i].gender == 1){
                $scope.childMsges[i].womanShow = false
                $scope.childMsges[i].manShow = true
            }
        }
    })
    //创建儿童信息
    $scope.addChildrenInfo = function(){
        $state.go('createChildInfo')
    }
    
    //编辑儿童信息
    $scope.editChildInfo = function (childId) {
        $window.sessionStorage.childId = childId
        $state.go('editChildInfo')
    }
})