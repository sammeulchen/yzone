/**
 * Created by Administrator on 2016/11/15 0015.
 */
app.controller('eventsDetailsSettingCtrl', function ($scope,$state,ProjectSetting,$ionicPopup) {
    var releaseEvents = ProjectSetting.releaseProjects
    console.log(releaseEvents)
    for(var i=0;i<releaseEvents.length;i++){
        if(releaseEvents[i].groupDesc == null){
            releaseEvents[i].DescShow = false
        }
        for(var j = 0;j<releaseEvents[i].groupProject.length;j++){
            if(releaseEvents[i].groupProject[j].details.length == 0){
                releaseEvents[i].groupProject[j].liShow = false
            }else{
                releaseEvents[i].groupProject[j].liShow = true
            }
        }
    }
    $scope.releaseEvents = releaseEvents
    console.log(releaseEvents)
    //设置背景
    $scope.setBg = function (groupId) {
        var p = ''
        if(groupId == 1){
            p = '#00A0E2'
        }
        if(groupId == 2){
            p = '#009F40'
        }
        if(groupId == 3){
            p = '#D6000F'
        }
        if(groupId == 4){
            p = '#614C3F'
        }
        if(groupId == 5){
            p = '#000000'
        }
        return {"background": p};
    }
    //设置颜色
    $scope.setColor = function (groupId) {
        var p = ''
        if(groupId == 1){
            p = '#00A0E2'
        }
        if(groupId == 2){
            p = '#009F40'
        }
        if(groupId == 3){
            p = '#D6000F'
        }
        if(groupId == 4){
            p = '#614C3F'
        }
        if(groupId == 5){
            p = '#000000'
        }
        return {"color": p};
    }

    //点击在添加一组
    $scope.addEventsAgain = function () {
        $state.go('groupSetting')
    }

    //删除一组
    $scope.deleteGroup = function (event) {
        var confirmPopup = $ionicPopup.confirm({
            title: '提示信息',
            template: '您确定删除该组比赛吗?',
            okText:'确定',
            cancelText:'取消'
        });
        confirmPopup.then(function(res) {
            if(res) {
                var idx = $scope.releaseEvents.indexOf(event)
                $scope.releaseEvents.splice(idx,1)
            }
        });
    }
    
    //编辑一组信息
    $scope.editGroup = function (event) {
        ProjectSetting.editGroup = event
        $state.go('groupSetting')
    }

    //完成项目设置
    $scope.completeProjectSetting = function () {
        $state.go('releaseSingleGame')
    }
})