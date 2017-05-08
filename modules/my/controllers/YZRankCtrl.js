/**
 * Created by Administrator on 2016/11/17 0017.
 */
app.controller('YZRankCtrl', function ($scope,$state,$ionicModal) {
    $ionicModal.fromTemplateUrl('modules/my/templates/rankingIntro1.html', {
        scope: $scope,
        animation: 'none'
    }).then(function(modal1) {
        $scope.modal1 = modal1;
    });
    $ionicModal.fromTemplateUrl('modules/my/templates/rankingIntro2.html', {
        scope: $scope,
        animation: 'none'
    }).then(function(modal2) {
        $scope.modal2 = modal2;
    });
    $ionicModal.fromTemplateUrl('modules/my/templates/rankingIntro3.html', {
        scope: $scope,
        animation: 'none'
    }).then(function(modal3) {
        $scope.modal3 = modal3;
    });
    $ionicModal.fromTemplateUrl('modules/my/templates/rankingIntro4.html', {
        scope: $scope,
        animation: 'none'
    }).then(function(modal4) {
        $scope.modal4 = modal4;
    });
    $ionicModal.fromTemplateUrl('modules/my/templates/rankingIntro5.html', {
        scope: $scope,
        animation: 'none'
    }).then(function(modal5) {
        $scope.modal5 = modal5;
    });
    $ionicModal.fromTemplateUrl('modules/my/templates/rankingIntro6.html', {
        scope: $scope,
        animation: 'none'
    }).then(function(modal6) {
        $scope.modal6 = modal6;
    });
    $scope.toRanking1 = function() {
        $scope.modal1.show();
    };
    $scope.toRanking2 = function() {
        $scope.modal2.show();
    };
    $scope.toRanking3 = function() {
        $scope.modal3.show();
    };
    $scope.toRanking4 = function() {
        $scope.modal4.show();
    };
    $scope.toRanking5 = function() {
        $scope.modal5.show();
    };
    $scope.toRanking6 = function() {
        $scope.modal6.show();
    };
    $scope.closeModal = function() {
        $scope.modal1.hide();
        $scope.modal2.hide();
        $scope.modal3.hide();
        $scope.modal4.hide();
        $scope.modal5.hide();
        $scope.modal6.hide();
    };
    //当我们用到模型时，清除它！
    $scope.$on('$destroy', function() {
        $scope.modal1.remove();
    });

})