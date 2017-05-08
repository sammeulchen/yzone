/**
 * Created by Administrator on 2017/3/28 0028.
 */
app.controller('matchPartnerCtrl', function ($scope,$state,$stateParams,$http,$ionicPopup) {
    $scope.projectId = $stateParams.projectId
    $scope.partnerPortfolios = []
    $scope.partnerPortfoliosAvatar = []
    $scope.partnerAvatar = []
    $scope.selectedPartner = []
    $http.get(SITE_SUFFIX+'api/club/manage/paterner/applylist/'+$scope.projectId).success(function (response) {
        console.log(response)
        $scope.partnerLists = response.message
        $scope.selected = []
        $scope.selectedIndex = []

        var updateSelected = function(action,id,index,avatar) {
            if(action == 'add'&& $scope.selected.indexOf(id) == -1){
                $scope.selected.push(id)
                $scope.selectedIndex.push(index)
                $scope.selectedPartner.push(id)
                $scope.partnerAvatar.push(avatar)
                if($scope.selected.length == 2){
                    $scope.partnerPortfolios = []
                    $scope.partnerPortfoliosAvatar = []
                    $scope.partnerPortfolios.push()
                    if($scope.selectedIndex[1] > $scope.selectedIndex[0]){
                        $scope.partnerLists.splice($scope.selectedIndex[0],1)
                        $scope.partnerLists.splice($scope.selectedIndex[1]-1,1)
                    }
                    if($scope.selectedIndex[1] < $scope.selectedIndex[0]){
                        $scope.partnerLists.splice($scope.selectedIndex[0],1)
                        $scope.partnerLists.splice($scope.selectedIndex[1],1)
                    }
                    $scope.selected = []
                    $scope.selectedIndex = []
                    for(var i=0;i<$scope.selectedPartner.length;i += 2){
                        $scope.partnerPortfolios.push({'projectId':$scope.projectId,'order1Id':$scope.selectedPartner[i],'order2Id':$scope.selectedPartner[i+1]})
                        $scope.partnerPortfoliosAvatar.push({'avatar1':$scope.partnerAvatar[i],'avatar2':$scope.partnerAvatar[i+1],'order1Id':$scope.selectedPartner[i],'order2Id':$scope.selectedPartner[i+1]})
                    }

                }
            }
            if (action == 'remove' && $scope.selected.indexOf(id) != -1) {
                var idx = $scope.selected.indexOf(id);
                $scope.selected.splice(idx,1)
                $scope.selectedIndex.splice(idx,1)
                $scope.selectedPartner.splice(idx,1)
                $scope.partnerAvatar.splice(idx,1)
            }
        }
        $scope.updateSelection = function($event, id,index,avatar){
            var checkbox = $event.target;
            var action = (checkbox.checked ? 'add' : 'remove');
            updateSelected(action, id,index,avatar);
        }
        $scope.isSelected = function(id) {
            return $scope.selected.indexOf(id) >= 0;
        }
        $scope.relieve = function (id1,id2,index) {
            $scope.partnerPortfolios.splice(index,1)
            $scope.partnerPortfoliosAvatar.splice(index,1)
            $http.get(SITE_SUFFIX+'api/club/manage/paterner/applylist/'+$scope.projectId).success(function (response) {
                $scope.allPartners = response.message
                for(var i=0;i<$scope.allPartners.length;i++){
                    if($scope.allPartners[i].id == id1){
                        $scope.partnerLists.push($scope.allPartners[i])
                    }
                    if($scope.allPartners[i].id == id2){
                        $scope.partnerLists.push($scope.allPartners[i])
                    }
                }
                console.log($scope.partnerLists)
                for(var i=0;i<$scope.selectedPartner.length;i++){
                    if($scope.selectedPartner[i] == id1){
                        var idx1 = $scope.selectedPartner.indexOf(id1)
                        $scope.selectedPartner.splice(idx1,1)
                        $scope.partnerAvatar.splice(idx1,1)
                    }
                    if($scope.selectedPartner[i] == id2){
                        var idx2 = $scope.selectedPartner.indexOf(id2)
                        $scope.selectedPartner.splice(idx2,1)
                        $scope.partnerAvatar.splice(idx2,1)
                    }
                }
            })
        }

    })
    $scope.submitPartner = function () {
        if($scope.partnerPortfolios.length == 0){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '您还没有匹配任何搭档',
                okText:'确定'
            });
            return;
        }
        $http({
            url:SITE_SUFFIX+'api/club/manage/paterner/save',
            method:'post',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify($scope.partnerPortfolios)
        }).success(function (response) {
            if(response.result != 0){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: response.message,
                    okText:'确定'
                });
                return
            }
            $state.go('clubAllPlayers',{projectId:$scope.projectId})
        })
    }
    //自动匹配
    $scope.autoMatch = function () {
        $http.get(SITE_SUFFIX+'api/club/manage/paterner/addPaternerBySystem/'+$scope.projectId).success(function(response){
            if(response.result != 0){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: response.message,
                    okText:'确定'
                });
                return;
            }
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: response.message,
                okText:'确定'
            });
            alertPopup.then(function(res) {
                $state.go('allPlayersAdmin',{projectId:$scope.projectId})
            });

            console.log(response)
        })
    }


})