<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@  taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@  taglib uri="/yzone" prefix="yzone"%>

<!DOCTYPE HTML >
<html>
<head>


<meta charset="UTF-8">
<meta name="viewport"
	content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">

<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script src="/static/js/jquery-2.1.1.js"></script>
<script src="/static/js/app/wxJsApi.js"></script>
<script src="/lib/ionic/js/angular/angular.min.js"></script>
<link href="/h5/rank.css" rel="stylesheet">
<script type="text/javascript" src="/h5/rank.js?v=1.5"></script>
</head>

<body ng-app="share" ng-controller="shareCtrl">
	<div class="poster">
		<img style="width: 100%; height: 100%"
			src="http://img.tianqutiyu.com/2016/92c2876b17a24ec7a0c680c2bffa3bec.png">
	</div>
	<div ng-show="currentShow">
		<div class="title">
			<img src="${user.avatar}" />
			<h3>你能打赢我吗？</h3>
			<div class="selected-btn">

				<c:if test="${!isVoted}">
					<span ng-show="btnShow" ng-repeat="item in status"
						ng-click="getRank(item.id)">{{item.text}}</span>
					<div ng-show="getRankShow"
						style="width: 100%; height: 40px; background: #e4e5e7; text-align: center; line-height: 40px">正在计算排名...</div>
				</c:if>


				<div ng-show="rankShow"
					style="display: -webkit-flex; -webkit-justify-content: space-between; width: 100%">
					<i
						style="font-style: normal; height: 40px; line-height: 40px; text-align: center">${user.nickname}</i>
					<i
						style="font-style: normal; height: 40px; line-height: 40px; text-align: center">羽王星排名</i>
					<i
						style="font-style: normal; height: 40px; line-height: 40px; text-align: center;">
						{{rankInAll}} <c:if test="${isVoted}">
						${user.rankInAll}
						</c:if> 名/${total}
					</i>
				</div>
			</div>

		</div>
		<div style="width: 100%; height: 5px; background: #e4e5e7"></div>
		<div class="count">当前参与总人数：${total}人</div>
    <div style="width: 100%;height: 5px;background: #e4e5e7"></div>
    <div>
        <div style="width: 100%;height: 30px;line-height: 30px;font-size: 16px;text-align: center;margin-bottom: 10px">羽王星总排名榜</div>
        <div style="width:50%;border-right: 1px dashed #D8D9D9;display: inline-block">
            <div style="width: 100%;height: 30px;line-height: 30px;margin-bottom: 10px" ng-repeat="rankList in rankLists" ng-show="$index < 4">
                <span style="display:inline-block;width:15px;height: 30px;line-height: 30px;margin-left: 20px;overflow: hidden;font-size: 16px">{{rankList.rank}}</span>
                <img style="width: 30px;height: 30px" ng-src="{{rankList.avatar}}"/>
                <span style="display:inline-block;height: 30px;line-height: 30px;margin-left: 5px;overflow: hidden;font-size: 16px">{{rankList.nickname}}</span>
            </div>
        </div>
        <div style="margin-bottom: 5px;display: inline-block" ng-show="$index >= 4 && $index <8">
            <div style="width: 100%;height: 30px;line-height: 30px;margin-bottom: 10px" ng-repeat="rankList in rankLists" ng-show="rankList.rank <5">
                <span style="display:inline-block;width:15px;height: 30px;line-height: 30px;margin-left: 20px;overflow: hidden;font-size: 16px">{{rankList.rank}}</span>
                <img style="width: 30px;height: 30px" ng-src="{{rankList.avatar}}"/>
                <span style="display:inline-block;height: 30px;line-height: 30px;margin-left: 5px;overflow: hidden;font-size: 16px">{{rankList.nickname}}</span>
            </div>
        </div>
    </div>
    <div style="width: 100%;height: 5px;background: #e4e5e7"></div>
		<div class="rank-desc">[羽王星]排名是通过好友间胜负关系大数据推算得出，参与的人数越多，排名越准确。</div>
		<div style="padding: 0 40px">



			<c:choose>

				<c:when test="${currentUesr.shared==1}">
					<button  onclick="window.location.href='/h5/activity/rank/user/v3/${currentUesr.openid}'"
						style="width: 100%; height: 40px; border: none; background: #169BD5; border-radius: 10px; font-size: 15px; color: #ffffff"
						>查看我的排名</button>
				</c:when>
				<c:otherwise>
					<button
						style="width: 100%; height: 40px; border: none; background: #169BD5; border-radius: 10px; font-size: 15px; color: #ffffff"
						ng-click="shareTo()">分享给好友，获得你的排名</button>
				</c:otherwise>

			</c:choose>

		</div>
	</div>
	<div ng-show="targetShow">
		<div class="my-rank">
			<i>{{userInfo.rank}}</i> <img ng-src="{{userInfo.avatar}}" /> <span
				style="height: 60px; line-height: 60px; font-size: 16px; margin-left: 50px">{{userInfo.nickname}}</span>
    <span style="width: 80px;height: 30px;position: absolute;right: 110px;top: 0;font-size: 14px;color: #717071;text-align: center">羽王星排名</span>
    <span style="width: 80px;height: 30px;line-height: 30px;position: absolute;right: 20px;top: 0;font-size: 16px;text-align: right">{{userInfo.totalRank}}</span>
		</div>
		<div style="width: 100%; height: 5px; background: #e4e5e7"></div>
		<ul class="friend-rank">
			<li ng-repeat="list in lists"><i>{{$index+1}}</i> <img
				ng-src="{{list.avatar}}" /> <span
				style="height: 60px; line-height: 60px; font-size: 16px; margin-left: 50px">{{list.nickname}}</span>
				<img style="width: 11px; height: 12px; position: static"
				ng-show="list.gender == 0"
				src="http://img.tianqutiyu.com/2017/c6cdc68491bf4cad9a079b80150f9076.png" />
				<img style="width: 11px; height: 12px; position: static"
				ng-show="list.gender == 1"
				src="http://img.tianqutiyu.com/2017/2cec8a1dd7644adb98fdaa37d3c6a1d8.png" />
				<span
				style="width: 80px; height: 60px; line-height: 60px; position: absolute; right: 20px; top: 0; font-size: 16px; text-align: right">{{list.rankInAll}}</span>
			</li>
		</ul>
	</div>


	<div ng-show="shareShow" ng-click="cancelShare()" class="share"
		style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; background: #000000; opacity: 0.6; z-index: 100;">
		<span
			style="font-size: 20px; color: #ffffff; display: block; height: 50px; margin-top: 100px; padding: 0 20px">快转发给你的好友吧，看看你们谁最厉害</span>
	</div>
	<input type="hidden" id="target" value="${user.openid}" />
	<input type="hidden" id="current" value="${currentUesr.openid}" />
	<input type="hidden" id="currentNickName"
		value="${currentUesr.nickname}" />
	<input type="hidden" id="currentAvatar" value="${currentUesr.avatar}" />
	<input type="hidden" id="isVoted" value="${isVoted}" />
</body>
</html>
