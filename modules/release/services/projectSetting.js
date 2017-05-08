/**
 * Created by Administrator on 2016/11/15 0015.
 */
angular.module('yuZoneApp',[])
.service('ProjectSetting', function () {
    var service = {
        releaseProjects:[],
        addReleaseProject: function (add_project) {
            service.releaseProjects.push(add_project)
        },
        editGroup:[]

    }
    return service
})