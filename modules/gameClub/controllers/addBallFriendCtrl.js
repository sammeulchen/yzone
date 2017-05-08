/**
 * Created by Administrator on 2017/3/27 0027.
 */
app.controller('addBallFriendCtrl', function ($scope,$stateParams,$http,$ionicPopup,$window,$state) {
    $scope.projectId = $stateParams.projectId
    $http({
        url:SITE_SUFFIX+'api/ucenter/paterner/list',
        method:'get'
    }).success(function (response) {
        console.log(response)
        if (response.result != 0) {
            return;
        }
        $scope.partnerLists = response.message

        $scope.selected = []
        var updateSelected = function(action,id) {
            if(action == 'add'&& $scope.selected.indexOf(id) == -1){
                $scope.selected.push(id)
            }
            if (action == 'remove' && $scope.selected.indexOf(id) != -1) {
                var idx = $scope.selected.indexOf(id);
                $scope.selected.splice(idx,1)
            }
        }
        $scope.updateSelection = function($event, id){
            var checkbox = $event.target;
            var action = (checkbox.checked ? 'add' : 'remove');
            updateSelected(action, id);
        }
        $scope.isSelected = function(id) {
            return $scope.selected.indexOf(id) >= 0;
        }
        console.log($scope.selected)
        $scope.addPartner = function () {
            console.log($scope.selected)
            console.log(typeof ($scope.selected))


            if($scope.selected.length == 0){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: '请选择球友',
                    okText: '确定'
                });
                return;
            }
            if(typeof ($scope.selected) != 'string'){
                $scope.selected = $scope.selected.join(',')
            }
            $http({
                url:SITE_SUFFIX+'api/club/comopetition/member/addBySelectedId',
                method:'post',
                params:{projectId:$scope.projectId,userId:$scope.selected}
            }).success(function (response) {
                    console.log(response)
                    if(response.result != 0){
                        var alertPopup = $ionicPopup.alert({
                            title: '提示信息',
                            template: response.message,
                            okText: '确定'
                        });
                        $scope.selected = $scope.selected.split(',')
                        for(var i=0;i<$scope.selected.length;i++){
                            $scope.selected[i] = parseInt($scope.selected[i])
                        }
                        return;
                    }
                    $window.history.back()
                }

            )
        }
    })
    //添加新球友
    $scope.addNewPartner = function (pjId) {
        $window.sessionStorage.nickName = ''
        $window.sessionStorage.gender = null
        $window.sessionStorage.mobile = ''
        $state.go('editNewFriend',{projectId:pjId})
    }
})