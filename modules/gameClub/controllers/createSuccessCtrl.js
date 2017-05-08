/**
 * Created by Administrator on 2017/3/16 0016.
 */
app.controller('createSuccessCtrl', function ($scope,$state,$http,GameInfo) {
    $scope.shareQr = GameInfo.shareQr
    console.log($scope.shareQr)
    var location = SITE_SUFFIX+'createSuccess'
    console.log(location)
    $http({
        url: SITE_SUFFIX + 'api/wxApi/jsapi',
        method:'get',
        params:{referer:location}
    }).success(function(data) {
        if (data.result != 0) {
            alert(data.message);
            return;
        }
        if (data.result == 1009) {
            return
        }
        var result = data.message

        wx.config({
            debug: false,
            appId: result.appId,
            timestamp: result.timestamp,
            nonceStr: result.nonceStr,
            signature: result.signature,
            jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'translateVoice', 'startRecord', 'stopRecord',
                'onVoiceRecordEnd', 'playVoice', 'onVoicePlayEnd', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'closeWindow']

        });
    })
    //分享
    wx.ready(function() {
        var params = {
            title : '我创建了一个比赛，小伙伴们赶紧报名吧', // 分享标题
            desc : '羽众—一个好玩的羽毛球赛事平台',
            link : $scope.shareQr.shareUrl, // 分享链接
            imgUrl : 'http://img.tianqutiyu.com/logo.jpg', // 分享图标
            success : function() {
                // 用户确认分享后执行的回调函数
            },
            cancel : function() {
                // 用户取消分享后执行的回调函数
            }
        };

        wx.onMenuShareTimeline(params);
        wx.onMenuShareAppMessage(params);
        wx.onMenuShareQQ(params);
        wx.onMenuShareWeibo(params);
        wx.onMenuShareQZone(params);

    });
    $scope.backToMyGame = function () {
        $state.go('createGameDetails')
    }
})