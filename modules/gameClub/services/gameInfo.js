/**
 * Created by Administrator on 2017/3/20 0020.
 */
angular.module('yuZoneApp',[])
    .service('GameInfoDetails', function () {
        var service = {
            gameInfoDetails:{
                classLevel:null,
                projectId:null,
                maxCount:null
            },
            addName: function (detail) {
                service.gameInfoDetails.classLevel = details;
            }


        }
        return service
    })