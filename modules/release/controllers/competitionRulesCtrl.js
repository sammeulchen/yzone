/**
 * Created by Administrator on 2016/11/11 0011.
 */
app.controller('competitionRulesCtrl', function ($scope,$state,$rootScope,$window) {
    $scope.competitionRules = $scope
    $scope.rulesSetting = function(){
        var competitionRules = $scope.competitionRules.rules
        $rootScope.competitionRule = competitionRules
        console.log($rootScope.competitionRule)
        $window.history.back()
    }
})