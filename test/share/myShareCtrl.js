/**
 * Created by Administrator on 2016/12/28 0028.
 */
var app = angular.module('share',[])
app.controller('shareCtrl', function ($scope,$http) {
    $scope.status = [
        {id:-1,text:'当然能'},
        {id:0,text:'咱俩半斤八两'},
        {id:1,text:'还是你厉害'}
    ]

    $scope.btnShow = true
    $scope.shareShow = false
    $scope.getRankShow = false
    $scope.rankShow = false
    $scope.currentShow = false
    $scope.targetShow = false
    $scope.shareTo = function () {
        $scope.shareShow = true
    }
    $scope.cancelShare = function () {
        $scope.shareShow = false
    }
    //获取current target
    var current = document.getElementById('current').value;
    var target = document.getElementById('target').value;
    console.log(current)
    console.log(target)
    if(current == target){
        $scope.currentShow = false
        $scope.targetShow = true
        //获取好友列表
        $http({
            url:'http://wx.tianqutiyu.com/h5/activity/rank/friend',
            method:'get',
            params:{target:target}
        }).success(function (response) {
            if(response.result != 0){
                return
            }
            $scope.lists = response.message
            console.log(response)
        })
    }
    if(current != target){
        $scope.currentShow = true
        $scope.targetShow = false
    }

    $scope.getRank = function(id){
        $scope.btnShow = false
        $scope.getRankShow = true
        $http({
            url:'http://wx.tianqutiyu.com/h5/activity/rank/add',
            method:'post',
            params:{current:current,target:target,result:id}
        }).success(function(response){
            console.log(response)
            if(response.result == 0){
                $scope.getRankShow = false;
                $scope.rankShow = true;
            }

        })
    }

    $http.get('http://wx.tianqutiyu.com/h5/activity/rank/top').success(function (response) {
        console.log(response)
        $scope.rankLists = response.message
    })
    


    //分享
    var jsAapiList = [ 'checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage','onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'hideMenuItems'];
    $http.get('http://wx.tianqutiyu.com/api/wxApi/jsapi').success(function(data) {
        if (data.result != 0) {
            alert(data.message);
            return;
        }
        var result = data.message;
        wx.config({
            debug : false,
            appId : result.appId,
            timestamp : result.timestamp,
            nonceStr : result.nonceStr,
            signature : result.signature,
            jsApiList : jsAapiList
        });

        wx.ready(function() {
            var params = {
                title : '羽众', // 分享标题
                desc : '排名大作战',
                link : 'http://wx.tianqutiyu.com/h5/activity/rank/${currentUesr.openid}', // 分享链接
                imgUrl : 'http://img.tianqutiyu.com/logo.jpg', // 分享图标
                success : function() {
                    $scope.shareShow = false
                    $scope.currentShow = false
                    $scope.targetShow = true
                },
                cancel : function() {
                    $scope.shareShow = false
                }
            };

            wx.onMenuShareTimeline(params);
            wx.onMenuShareAppMessage(params);
            wx.onMenuShareQQ(params);
            wx.onMenuShareWeibo(params);
            wx.onMenuShareQZone(params);

        });
        wx.error(function(data) {
            alert(JSON.stringify(data));
        });

    });
})