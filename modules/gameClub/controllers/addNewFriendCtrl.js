/**
 * Created by Administrator on 2017/3/27 0027.
 */
app.controller('addNewFriendCtrl', function ($scope,$stateParams,$http) {
    $scope.competitionId = $stateParams.competitionId
    console.log($scope.competitionId)
    //分享
    $scope.shareShow = false
    $scope.invite = function() {
        $scope.shareShow = true
    }

    //点击阴影  阴影消失
    $scope.shareMiss = function(){
        $scope.shareShow = false
    }
    var _location = SITE_SUFFIX+'addNewFriend/'+$scope.competitionId
    $http({
        url: SITE_SUFFIX + 'api/wxApi/jsapi',
        method:'get',
        params:{referer:_location}
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

    $http.get(SITE_SUFFIX+'api/club/referee/generateInviteUrl/'+$scope.competitionId).success(function (response) {
        console.log(response)
        if(response.result != 0){
            return;
        }
        $scope.qrCode = response.message.qrcodeUrl

        wx.ready(function() {
            var params = {
                title : response.message.title, // 分享标题
                desc : response.message.desc,
                link : response.message.url, // 分享链接
                imgUrl : 'http://img.tianqutiyu.com/logo.jpg', // 分享图标
                success : function() {
                    // 用户确认分享后执行的回调函数
                    //$state.go('myProjects',{competitionId:$scope.competitionId})
                },
                cancel : function() {
                    // 用户取消分享后执行的回调函数
                    $scope.shareShow = false
                }
            };

            wx.onMenuShareTimeline(params);
            wx.onMenuShareAppMessage(params);
            wx.onMenuShareQQ(params);
            wx.onMenuShareWeibo(params);
            wx.onMenuShareQZone(params);

        });
    })
})