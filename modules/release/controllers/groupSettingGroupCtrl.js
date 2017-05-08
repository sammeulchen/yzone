/**
 * Created by Administrator on 2016/8/12 0012.
 */
app.controller('groupSettingGroupCtrl', function ($scope,$state) {
    $scope.toEventsGradeGroup = function () {
        $state.go('eventsGradeGroup')

    }
})