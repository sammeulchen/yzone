/**
 * Created by Administrator on 2017/2/20 0020.
 */
app.controller('createGroupCtrl', function ($scope,$state,$ionicModal) {
    $ionicModal.fromTemplateUrl('modules/my/templates/groupClass.html', {
        scope: $scope,
        animation: 'none'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.toGroupClass = function () {
        $scope.modal.show();
    }
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    //当我们用到模型时，清除它！
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    $scope.groupClasses = [
        {id:1,name:'公司'},
        {id:2,name:'学校'},
        {id:3,name:'院系'},
        {id:4,name:'俱乐部'},
        {id:5,name:'其他'}
    ]
})