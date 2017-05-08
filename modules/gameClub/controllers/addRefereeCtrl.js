/**
 * Created by Administrator on 2017/3/27 0027.
 */
app.controller('addRefereeCtrl', function ($scope,$stateParams,$http,$ionicPopup,$window,$state) {
    $scope.competitionId = $stateParams.competitionId
    $http.get(SITE_SUFFIX+'api/club/referee/getFriendList/'+$scope.competitionId).success(function (response) {
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
            if($scope.selected.length == 0){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: '请选择裁判',
                    okText: '确定'
                });
                return;
            }
            if(typeof ($scope.selected) != 'string'){
                $scope.selected = $scope.selected.join(',')
            }
            $http({
                url:SITE_SUFFIX+'api/club/referee/add',
                method:'post',
                params:{competitionId:$scope.competitionId,userId:$scope.selected}
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
    $scope.addNewPartner = function (competitionId) {
        $state.go('addNewFriend',{competitionId:competitionId})
    }
})