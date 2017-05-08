/**
 * Created by Administrator on 2017/3/1 0001.
 */
app.controller('inviteLeaderCtrl', function ($scope) {
    $scope.tabNames = ['参赛信息','队员信息']
    $scope.slectIndex = 0
    $scope.activeSlide=function(index){//点击时候触发
        $scope.slectIndex=index;
    };
    $scope.pages=["modules/home/templates/regInfo.html","modules/home/templates/partnerInfo.html"]
})