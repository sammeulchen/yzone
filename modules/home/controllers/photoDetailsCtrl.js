/**
 * Created by Administrator on 2017/3/1 0001.
 */
app.controller('photoDetailsCtrl', function ($scope,$stateParams,$state,$http,$ionicPopup,$ionicScrollDelegate) {
    $scope.photoId = $stateParams.photoId;
    //获取照片信息
    $http.get(SITE_SUFFIX+'api/competition/photo/detail/'+$scope.photoId).success(function (response) {
        console.log(response)
        if(response.result != 0){
            return;
        }
        $scope.photoDetail = response.message

        $scope.photoDetail.newDate = new Date()
        console.log($scope.photoDetail.newDate.getHours())
//分享
        $scope.shareShow = false
        $scope.sharePhoto = function () {
            $scope.shareShow = true
        }
        $scope.shareMiss = function () {
            $scope.shareShow = false
        }
        var location = SITE_SUFFIX+'photoDetails/'+$scope.photoId
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
        wx.ready(function() {

            var params = {
                title : '图片分享', // 分享标题
                desc : '羽众—一个好玩的羽毛球赛事平台',
                link : SITE_SUFFIX+'api/competition/photo/share/detail/'+$scope.photoId, // 分享链接
                imgUrl : 'http://img.tianqutiyu.com/logo.jpg', // 分享图标
                success : function() {
                    // 用户确认分享后执行的回调函数
                    $scope.shareShow = false
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

    //评论列表
    $scope.hasmore = true
    $scope.page = 1
    $http({
        url:SITE_SUFFIX+'api/competition/photo/comment/list',
        method:'get',
        params:{photoId:$scope.photoId,page:$scope.page}
    }).success(function (response) {
        console.log(response)
        if(response.result != 0){
            return;
        }
        $scope.userComments = response.message
        $scope.loadMore = function () {
            $scope.page += 1
            console.log($scope.page)
            $http({
                url: SITE_SUFFIX + 'api/competition/photo/comment/list',
                method: 'get',
                params: {photoId:$scope.photoId,page: $scope.page}
            }).success(function (response) {
                if (response.result != 0) {
                    return;
                }
                for (var i = 0; i < response.message.length; i++) {
                    $scope.userComments.push(response.message[i])
                }
                if (response.message.length < 12) {
                    $scope.hasmore = false
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
            })
        }

    })
    //点击出现输入框
    $scope.comment = $scope
    $scope.commentInput = false
    $scope.commentBtn = true
    $scope.commentBgShow = false
    $scope.writeComment = function () {
        $scope.commentInput = true
        $scope.commentBtn = false
        $scope.commentBgShow = true
        $scope.parentId = 0
        $scope.comment.commentContent = ''
        document.getElementById('contentFocus').innerHTML = ''
        var editor = document.getElementById('contentFocus')
        /*editor.onfocus = function () {
            window.setTimeout(function () {
                var sel,range;
                if (window.getSelection && document.createRange) {
                    range = document.createRange();
                    range.selectNodeContents(editor);
                    range.collapse(true);
                    range.setEnd(editor, editor.childNodes.length);
                    range.setStart(editor, editor.childNodes.length);
                    sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                } else if (document.body.createTextRange) {
                    range = document.body.createTextRange();
                    range.moveToElementText(editor);
                    range.collapse(true);
                    range.select();
                }
            }, 1);
        }*/
        editor.focus()
    }
    $scope.writeReply = function (commentId) {
        $scope.commentInput = true
        $scope.commentBtn = false
        $scope.commentBgShow = true
        $scope.parentId = commentId
        $scope.comment.commentContent = ''
        //document.getElementById('contentFocus').innerHTML = ''
        var editor = document.getElementById('contentFocus')
       /* editor.onfocus = function () {
            window.setTimeout(function () {
                var sel,range;
                if (window.getSelection && document.createRange) {
                    range = document.createRange();
                    range.selectNodeContents(editor);
                    range.collapse(true);
                    range.setEnd(editor, editor.childNodes.length);
                    range.setStart(editor, editor.childNodes.length);
                    sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                } else if (document.body.createTextRange) {
                    range = document.body.createTextRange();
                    range.moveToElementText(editor);
                    range.collapse(true);
                    range.select();
                }
            }, 1);
        }*/
        editor.focus()
    }




    //删除评论
    $scope.deleteComment = function (commentId,index) {
        var confirmPopup = $ionicPopup.confirm({
            template: '确定删除该条评论吗？',
            okText:'确定',
            cancelText:'取消'
        });
        confirmPopup.then(function(res) {
            if(res) {
                $http({
                    url:SITE_SUFFIX+'api/competition/photo/comment/delete',
                    method:'get',
                    params:{commentId:commentId}
                }).success(function (response) {
                    console.log(response)
                    if(response.result != 0){
                        return;
                    }
                    $scope.photoDetail.commentCount = $scope.photoDetail.commentCount - 1
                    $scope.userComments.splice(index, 1);
                })
            }
        });

    }
    //提交评论

    $scope.submitComment = function () {
       // $scope.commentContent = document.getElementById('contentFocus').innerHTML;
        $scope.commentContent = $scope.comment.commentContent;
        if($scope.commentContent == ''){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '评论内容不能为空',
                okText:'确定'
            });
            return;
        }
        $http({
            url:SITE_SUFFIX+'api/competition/photo/comment/add',
            method:'get',
            params:{photoId:$scope.photoId,parentId:$scope.parentId,content:$scope.commentContent}
        }).success(function (response) {
            console.log(response)
            if(response.result != 0){
                return;
            }
            $scope.photoDetail.commentCount = $scope.photoDetail.commentCount + 1
            $scope.commentInput = false
            $scope.commentBtn = true
            $scope.commentBgShow = false
            //$scope.userComments.splice(index, 1);
            $http({
                url:SITE_SUFFIX+'api/competition/photo/comment/list',
                method:'get',
                params:{photoId:$scope.photoId,page:1}
            }).success(function (response) {
                console.log(response)
                if (response.result != 0) {
                    return;
                }
                $scope.userComments = response.message
                $scope.loadMore = function () {
                    $scope.page += 1
                    console.log($scope.page)
                    $http({
                        url: SITE_SUFFIX + 'api/competition/photo/comment/list',
                        method: 'get',
                        params: {photoId:$scope.photoId,page: $scope.page}
                    }).success(function (response) {
                        if (response.result != 0) {
                            return;
                        }
                        for (var i = 0; i < response.message.length; i++) {
                            $scope.userComments.push(response.message[i])
                        }
                        if (response.message.length < 12) {
                            $scope.hasmore = false
                        }
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    })
                }
            })
        })
        console.log($scope.commentContent)
    }
    $scope.commentBgMiss = function(){
        $scope.commentBgShow = false
        $scope.commentInput = false
        $scope.commentBtn = true
    }
    
    //点赞
    $scope.likePic = function () {
        $http({
            url: SITE_SUFFIX + 'api/competition/photo/follow/'+$scope.photoId,
            method: 'get'
        }).success(function (response) {
            console.log(response)
            if (response.result != 0) {
                return;
            }
            if($scope.photoDetail.followed == 0){
                $scope.photoDetail.followCount = response.message
                $scope.photoDetail.followed = 1
            }else{
                $scope.photoDetail.followCount = $scope.photoDetail.followCount - 1
                $scope.photoDetail.followed = 0
            }
        })
    }

    //滑动
    $scope.scrollPhoto = function () {
        if($ionicScrollDelegate.$getByHandle('photo').getScrollPosition().left >= document.getElementsByClassName('pic-img')[0].clientWidth*0.25 ){
            if($scope.photoDetail.nextPhotoId == -1){
                $scope.photoDetail.nextPhotoId = $scope.photoDetail.photoId
                return
            }
            $state.go('photoDetails',{photoId:$scope.photoDetail.nextPhotoId})

        }

        if($ionicScrollDelegate.$getByHandle('photo').getScrollPosition().left <= -document.getElementsByClassName('pic-img')[0].clientWidth*0.25 ){
            if($scope.photoDetail.prePhotoId == -1){
                $scope.photoDetail.prePhotoId = $scope.photoDetail.photoId
                return
            }
            $state.go('photoDetails',{photoId:$scope.photoDetail.prePhotoId})

        }


    }


    //下载
    $scope.downLoad = function () {
        console.log($scope.photoDetail.bigPhotoPath)
        wx.previewImage({
            current: $scope.photoDetail.bigPhotoPath, // 当前显示图片的http链接
            urls: [$scope.photoDetail.bigPhotoPath] // 需要预览的图片http链接列表
        });
        $http({
            url:SITE_SUFFIX+'api/competition/photo/download/'+$scope.photoId,
            method:'get'
        }).success(function (response) {
            console.log(response)
        })



       // window.location.href = $scope.photoDetail.bigPhotoPath
    }
    $scope.goToPre = function () {
        $state.go('allPictures',{competitionId:$scope.photoDetail.competitionId})
    }



})