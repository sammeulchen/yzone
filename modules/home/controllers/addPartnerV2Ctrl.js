/**
 * Created by Administrator on 2017/1/4 0004.
 */
app.controller('addPartnerV2Ctrl', function ($scope,$state,$stateParams,$http,$window,$ionicPopup,$rootScope) {
    $scope.competitionId = $stateParams.competitionId
    $scope.orderId = $window.sessionStorage.orderId
    $scope.projectCategory = $window.sessionStorage.projectCategory
    $scope.oldPid = -1
    var location  = SITE_SUFFIX+'addPartner_v2/'+$scope.competitionId
    $http({
        url: SITE_SUFFIX + 'api/wxApi/jsapi',
        method:'get',
        params:{referer:location}
    }).success(function(data) {
        if (data.result != 0) {
            alert(data.message);
            return;
        }
        /*if (data.result == 1009) {
            return
        }*/
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
    //获取好友列表
    //var partnerId = null
   $http({
       url:SITE_SUFFIX+'api/ucenter/paterner/list',
       method:'get',
       params:{orderId:$scope.orderId}
   }).success(function (response) {
       console.log(response)
       if(response.result != 0){
           return;
       }
       $scope.partnerLists = response.message
       if($scope.projectCategory == 2){
          /* if($scope.partnerLists.length >0){
               $scope.partnerLists[0].check = true
           }*/

           //选择搭档完
           $scope.partnerL = $scope
           $scope.addPartner = function () {
              /* if(partnerId == null){
                   partnerId = $scope.partnerLists[0].paternerId
               }else{
                   partnerId = $scope.partnerL.paternerId
               }*/
               // partnerId = $scope.partnerLists[0].paternerId
               var partnerId = $scope.partnerL.paternerId
               console.log(partnerId)
               if(partnerId == null){
                   var alertPopup = $ionicPopup.alert({
                       title: '提示信息',
                       template: '请先选择你要添加的搭档',
                       okText: '确定'
                   });
                   return;
               }
               var data = {orderId:$scope.orderId,pid:partnerId}
               console.log(data)
               $http({
                   url:SITE_SUFFIX+'api/competition/order/addSelectedPaterner',
                   method:'post',
                   params:data
               }).success(function (response) {
                   if(response.result != 0){
                       var alertPopup = $ionicPopup.alert({
                           title: '提示信息',
                           template: response.message,
                           okText: '确定'
                       });
                       return;
                   }
                   $state.go('myProjects',{competitionId:$scope.competitionId})
               })
           }
       }

        if($scope.projectCategory == 3){
            //获取被选取的队员的数据
            $scope.selected = []
            var updateSelected = function(action,id) {
                if(action == 'add'&& $scope.selected.indexOf(id) == -1){
                    $scope.selected.push(id)
                }
                if (action == 'remove' && $scope.selected.indexOf(id) != -1) {
                    var idx = $scope.selected.indexOf(id);
                    $scope.selected.splice(idx,1)
                }
            }
            $scope.updateSelection = function($event, id){
                var checkbox = $event.target;
                var action = (checkbox.checked ? 'add' : 'remove');
                updateSelected(action, id);
            }
            $scope.isSelected = function(id) {
                return $scope.selected.indexOf(id) >= 0;
            }
            console.log($scope.selected)
            $scope.addPartner = function () {

                if($scope.selected.length == 0){
                    var alertPopup = $ionicPopup.alert({
                        title: '提示信息',
                        template: '请添加队员',
                        okText: '确定'
                    });
                    return;
                }
                if(typeof ($scope.selected) != 'string'){
                    $scope.selected = $scope.selected.join(',')
                }
                $http({
                    url:SITE_SUFFIX+'api/competition/order/addSelectedPaterner',
                    method:'post',
                    params:{orderId:$scope.orderId,pid:$scope.selected,oldPid:$scope.oldPid}
                }).success(function (response) {
                        if(response.result != 0){
                            var alertPopup = $ionicPopup.alert({
                                title: '提示信息',
                                template: response.message,
                                okText: '确定'
                            });
                            $scope.selected = $scope.selected.split(',')
                            for(var i=0;i<$scope.selected.length;i++){
                                $scope.selected[i] = parseInt($scope.selected[i])
                            }
                            return;
                        }
                        $state.go('myProjects',{competitionId:$scope.competitionId})
                    }

                )
            }
        }



   })

    //编辑搭档信息
    $scope.editPartner  = function () {
        $rootScope.pid = $scope.oldPid
        $state.go('editPartner',{competitionId:$scope.competitionId})

    }


    $scope.addNewPartner = function(){
        $state.go('addNewPartner',{competitionId:$scope.competitionId})
    }

    //更换领队
    $scope.changeLeader = function (competitionId,orderId) {
        var confirmPopup = $ionicPopup.confirm({
            template: '领队位置转让成功后，与比赛相关的一切事宜将会仅由新领队负责。',
            okText:'确定',
            cancelText:'取消'
        });
        confirmPopup.then(function(res) {
            if(res) {
                $window.sessionStorage.orderId = orderId
                $state.go('selectedLeader',{competitionId:competitionId})
            }
        });

    }


    //分享
    $scope.shareShow = false
    $scope.invite = function() {
        $scope.shareShow = true
    }

    //点击阴影  阴影消失
    $scope.shareMiss = function(){
        $scope.shareShow = false
    }
    $http({
        url:SITE_SUFFIX+'api/competition/order/genInviteUrl/'+$scope.orderId,
        method:'get',
        params:{pid:$scope.oldPid}
    }).success(function (response) {
        console.log(response)
        $scope.qrCode = response.message.qrCode

        wx.ready(function() {
            var params = {
                title : response.message.title, // 分享标题
                desc : response.message.desc,
                link : response.message.url, // 分享链接
                imgUrl : 'http://img.tianqutiyu.com/logo.jpg', // 分享图标
                success : function() {
                    // 用户确认分享后执行的回调函数
                    $state.go('myProjects',{competitionId:$scope.competitionId})
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