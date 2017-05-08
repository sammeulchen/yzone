/**
 * Created by Administrator on 2016/8/12 0012.
 */
app.controller('eventsGradeGroupCtrl',function($scope,$state,$window){

    $scope.scaleEventsLists = [
        {id:1,name:'男团'},
        {id:2,name:'女团'},
        {id:3,name:'混团'}
    ]

    $scope.toEventsDetailsGroupMan = function(id){
        console.log(id)
        $window.sessionStorage.eventId = id
        $state.go('eventsDetailsGroupMan')
    }
})