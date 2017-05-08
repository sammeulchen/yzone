/**
 * Created by Administrator on 2016/8/31 0031.
 */
/*
app.directive('timerbutton', function($timeout, $interval){
    return {
        restrict: 'AE',
        transclude: true,
        scope: {
            showTimer: '=?',
            onClick: '&',
            timeout: '=?'
        },
        link: function(scope){
            scope.timer = false;
            scope.timeout = 60000;
            scope.timerCount = scope.timeout / 1000;
            scope.text = "获取验证码";

            scope.onClick = function(){
                scope.showTimer = true;
                scope.timer = true;
                scope.text = "s后重新获取";
                var counter = $interval(function(){
                    scope.timerCount = scope.timerCount - 1;
                }, 1000);

                $timeout(function(){
                    scope.text = "获取验证码";
                    scope.timer = false;
                    $interval.cancel(counter);
                    scope.showTimer = false;
                    scope.timerCount = scope.timeout / 1000;
                }, scope.timeout);
            }
        },
        template: '<div on-tap="onClick()" class="send-code" ng-disabled="timer"><span ng-if="showTimer">{{ timerCount }}</span>{{text}}</div>'
    };
});
*/

(function() {
    'use strict'
    var cartDirective = angular.module("yuZoneApp");
    cartDirective.directive("map", ['map','$parse',function(map,$parse) {
        return {
            restrict: "A",
            scope: true,
            link:function(scope,element,attrs){
                //获取控制器中定义的地图配置config对象
                var model = $parse(attrs.map);
                var config = model(scope);
                //实例化地图service，将指令元素作为容器传入
                //传入config对象
                var mapObj = new map(element[0],config);
                //开始加载
                mapObj.load();

            }
        };
    }]);
})();