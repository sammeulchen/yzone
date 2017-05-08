/**
 * Created by Administrator on 2017/3/20 0020.
 */
angular.module('yuZoneApp',[])
    .service('GameInfo', function () {
        var service = {
            gameInfos:{
                category:null,
                classLevel:null,
                projectId:null,
                maxCount:null
            },
            shareQr:null,
            singleLevel:null,
            doubleLevel:null,
            seedCount:[],
            addFormat: function (details) {
                service.gameInfos.category = details;
            },
            addProject: function (details) {
                service.gameInfos.projectId = details;
            },
            addLevel: function (details) {
                service.gameInfos.classLevel = details
            },
            addMaxCount: function (details) {
                service.gameInfos.maxCount = details
            },
            addStadiumId: function (details) {
                service.gameInfos.stadiumId = details
            },
            addStadium: function (details) {
                service.gameInfos.stadium = details
            },
            addShareQr: function (details) {
                service.shareQr = details
            },
            addSingleLevel: function (details) {
                service.singleLevel = details
            },
            addDoubleLevel: function (details) {
                service.doubleLevel = details
            },
            addSeedCount: function (detail) {
                service.seedCount.push(detail)
            }



        }
        return service
    })