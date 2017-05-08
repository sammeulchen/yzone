/**
 * Created by Administrator on 2016/8/11 0011.
 */
app.controller('groupSettingCtrl',function ($scope,$state,$rootScope,$ionicModal,$ionicPopup,ProjectSetting) {
    console.log(ProjectSetting.editGroup)

    $scope.toEventsGrade = function () {
        $state.go('eventsGrade')

    }
    $scope.eventItems = $rootScope.eventItems
    console.log($scope.eventItems)

    $scope.projectDetails = [
        {
            groupId:1,
            groupImg:'wind.gif',
            projectName:'风级',
            details:[

            ]
        },
        {
            groupId:2,
            groupImg:'forest.gif',
            projectName:'林级',
            details:[

            ]
        },
        {
            groupId:3,
            groupImg:'fire.gif',
            projectName:'火级',
            details:[

            ]
        },
        {
            groupId:4,
            groupImg:'mount.gif',
            projectName:'山级',
            details:[

            ]
        },
        {
            groupId:5,
            projectName:'不分级',
            details:[

            ]
        }

    ]

    //设置背景
    $scope.setBg = function (groupId) {
        var p = ''
        if(groupId == 1){
            p = '#00A0E2'
        }
        if(groupId == 2){
            p = '#009F40'
        }
        if(groupId == 3){
            p = '#D6000F'
        }
        if(groupId == 4){
            p = '#614C3F'
        }
        if(groupId == 5){
            p = '#000000'
        }
        return {"background": p};
    }
    //设置颜色
    $scope.setColor = function (groupId) {
        var p = ''
        if(groupId == 1){
            p = '#00A0E2'
        }
        if(groupId == 2){
            p = '#009F40'
        }
        if(groupId == 3){
            p = '#D6000F'
        }
        if(groupId == 4){
            p = '#614C3F'
        }
        if(groupId == 5){
            p = '#000000'
        }
        return {"color": p};
    }
    
    //项目设置

    $ionicModal.fromTemplateUrl('modules/release/templates/projectSetting.html', {
        scope: $scope,
        animation: 'none'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    var groupId = null
    $scope.selectProject = $scope
    $scope.toProjectSetting = function(groupId) {
        console.log(groupId)
        $scope.modal.show();
        if(groupId ==1){
            $scope.projects = $scope.windProjects
        }
        if(groupId ==2){
            $scope.projects = $scope.forestProjects
        }
        if(groupId ==3){
            $scope.projects = $scope.fireProjects
        }
        if(groupId ==4){
            $scope.projects = $scope.mountProjects
        }
        if(groupId ==5){
            $scope.projects = $scope.noneProjects
        }

console.log($scope.projectDetails)
        //所有项目
        var projectName = ""
        $scope.allProjects = [
            {id:1,name:'男单'},
            {id:2,name:'男双'},
            {id:3,name:'女单'},
            {id:4,name:'女双'},
            {id:5,name:'混双'},
            {id:6,name:'混三'}
        ]
        for(var i in $scope.allProjects){
            $scope.selectProject.project = $scope.allProjects[0]
            projectName = $scope.selectProject.project.name
        }
        $scope.getProject = function () {
            projectName = $scope.selectProject.project.name
        }
        var addedAllProjects = []
        var id = 0

        //增加项目
        $scope.addProject = function () {

            var addedProject = {}

            var description = $scope.selectProject.description
            var maxCount = $scope.selectProject.maxCount
            if(description == null){
                description = ''
            }
            if(maxCount == null){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: '请填写需要设置的数量',
                    okText:'确定'
                });
                return
            }
            var str = description + projectName
            if(projectName.indexOf('单') == 1){
                maxCount = maxCount + '人'
            }
            if(projectName.indexOf('双') == 1){
                maxCount = maxCount + '对'
            }
            if(projectName.indexOf('三') == 1){
                maxCount = maxCount + '组'
            }
            // addedProject.description = description


            for(var i in addedAllProjects){
                if(str == addedAllProjects[i].projectName){
                    var alertPopup = $ionicPopup.alert({
                        title: '提示信息',
                        template: '您已经添加过该项目了',
                        okText:'确定'
                    });
                    return
                }
            }
            id = ++id
            addedProject.id = id
            addedProject.description = description
            addedProject.maxCount = maxCount
            addedProject.name = projectName
            addedProject.projectName = str
            addedAllProjects.unshift(addedProject)
            console.log(addedAllProjects)
            $scope.projects = addedAllProjects
            if(groupId == 1){
                $scope.windProjects = addedAllProjects
                $scope.projectDetails[0].details = $scope.projects
            }
            if(groupId == 2){
                $scope.forestProjects = addedAllProjects
                $scope.projectDetails[1].details = $scope.projects
            }
            if(groupId == 3){
                $scope.fireProjects = addedAllProjects
                $scope.projectDetails[2].details = $scope.projects
            }
            if(groupId == 4){
                $scope.mountProjects = addedAllProjects
                $scope.projectDetails[3].details = $scope.projects
            }
            if(groupId == 5){
                $scope.noneProjects = addedAllProjects
                $scope.projectDetails[4].details = $scope.projects
            }
            $scope.projects = addedAllProjects

        }

        //删除项目
        $scope.deleteProject = function (id,event) {
            var confirmPopup = $ionicPopup.confirm({
                title: '提示信息',
                template: '您确定删除该项目吗?',
                okText:'确定',
                cancelText:'取消'
            });
            confirmPopup.then(function(res) {
                if(res) {
                    var idx = $scope.projects.indexOf(event)
                    $scope.projects.splice(idx,1)
                }
            });
        }
        //修改项目
        $scope.editShow = true
        $scope.editLastShow = false
        $scope.editProject = function (id,event) {
            $scope.editShow = false
            $scope.editLastShow = true
            console.log(event)
            $scope.selectProject.description = event.description
            $scope.selectProject.project.name = event.name
            $scope.selectProject.maxCount = parseInt(event.maxCount)

            //修改完成
            $scope.editLast = function () {


                event.description = $scope.selectProject.description
                event.name = $scope.selectProject.project.name
                event.maxCount = $scope.selectProject.maxCount
                if(event.description == null){
                    description = ''
                }
                if(event.maxCount == null){
                    var alertPopup = $ionicPopup.alert({
                        title: '提示信息',
                        template: '请填写需要设置的数量',
                        okText:'确定'
                    });
                    return
                }
                var str = event.description + event.name
                if(event.name.indexOf('单') == 1){
                    event.maxCount = event.maxCount + '人'
                }
                if(event.name.indexOf('双') == 1){
                    event.maxCount = event.maxCount + '对'
                }
                if(event.name.indexOf('三') == 1){
                    event.maxCount = event.maxCount + '组'
                }
                for(var i in addedAllProjects){
                    if(str == addedAllProjects[i].projectName){
                        var alertPopup = $ionicPopup.alert({
                            title: '提示信息',
                            template: '您已经添加过该项目了',
                            okText:'确定'
                        });
                        return
                    }
                }
                event.projectName = str
                $scope.editShow = true
                $scope.editLastShow = false



            }
        }

    };

    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    //当我们用到模型时，清除它！
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // 当隐藏的模型时执行动作
    $scope.$on('modal.hide', function() {
        // 执行动作
    });
    // 当移动模型时执行动作
    $scope.$on('modal.removed', function() {
        // 执行动作
    });

    //完成一组添加

    var releaseProject = {}
    $scope.addMore  = function () {
        releaseProject.groupName= $scope.selectProject.groupName
        if(releaseProject.groupName == null){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '请填写组别名称',
                okText:'确定'
            });
            return
        }
        if($scope.projects == null){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '您还没有设置项目信息',
                okText:'确定'
            });
            return
        }
        releaseProject.groupDesc = $scope.selectProject.groupDesc
        releaseProject.groupProject = $scope.projectDetails
        //console.log(releaseProject)

       console.log(releaseProject)
        var add_project = releaseProject
        console.log(add_project)
        ProjectSetting.addReleaseProject(add_project)
       // $scope.releaseProjects.push(releaseProject)
        $state.go('eventsDetailsSetting')


    }
    if(ProjectSetting.editGroup.length != 0){
         $scope.projectDetailss = ProjectSetting.editGroup
        $scope.selectProject.groupName = $scope.projectDetailss.groupName
        $scope.selectProject.groupDesc = $scope.projectDetailss.groupNDesc
        $scope.projectDetails = $scope.projectDetailss.groupProject
    }




})