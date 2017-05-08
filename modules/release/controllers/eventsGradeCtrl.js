/**
 * Created by Administrator on 2016/8/11 0011.
 */
app.controller('eventsGradeCtrl',function($scope,$state,$ionicPopup,$rootScope,$window){

    $scope.devLists = [
        {
            id:1,
            name: '风级',
            items:[
                {id:1,text: '男单',maxCount:null},
                {id:2,text: '女单',maxCount:null},
                {id:3,text: '男双',maxCount:null},
                {id:4,text: '女双',maxCount:null},
                {id:5,text: '混双',maxCount:null},
                {id:6,text: '混三',maxCount:null}
            ]
        },
        {
            id:2,
            name: '林级',
            items:[
                {id:7,text: '男单'},
                {id:8,text: '女单'},
                {id:9,text: '男双'},
                {id:10,text: '女双'},
                {id:11,text: '混双'},
                {id:12,text: '混三'}
            ]
        },
        {
            id:3,
            name: '火级',
            items:[
                {id:13,text: '男单'},
                {id:14,text: '女单'},
                {id:15,text: '男双'},
                {id:16,text: '女双'},
                {id:17,text: '混双'},
                {id:18,text: '混三'}
            ]
        },
        {
            id:4,
            name: '山级',
            items:[
                {id:19,text: '男单'},
                {id:20,text: '女单'},
                {id:21,text: '男双'},
                {id:22,text: '女双'},
                {id:23,text: '混双'},
                {id:24,text: '混三'}
            ]
        },
        {
            id:5,
            name: '无级',
            items:[
                {id:25,text: '男单'},
                {id:26,text: '女单'},
                {id:27,text: '男双'},
                {id:28,text: '女双'},
                {id:29,text: '混双'},
                {id:30,text: '混三'}
            ]
        }
    ]

    $scope.selectedWind = []
    $scope.selecteds = []
    $scope.isChecked = false
    var updateSelected = function(action,id,item) {
        if(action == 'add'&& $scope.selectedWind.indexOf(id) == -1){
            $scope.selectedWind.push(id)
            $scope.selecteds.push(item)
        }
        if (action == 'remove' && $scope.selectedWind.indexOf(id) != -1) {
            var idx = $scope.selectedWind.indexOf(item);
            $scope.selecteds.splice(idx,1)
        }
    }

    $scope.updateSelection = function($event, id,item) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        updateSelected(action, id, item);
    }

    $scope.isSelected = function(id){
        return $scope.selectedWind.indexOf(id)>=0;


    }

    $scope.lists = $scope.devLists
    $scope.eventItems = []
    $scope.windItemsObj = {}
    $scope.forestItemsObj = {}
    $scope.fireItemsObj = {}
    $scope.mountItemsObj = {}
    $scope.noneItemsObj = {}
    $scope.windItems = []
    $scope.forestItems = []
    $scope.fireItems = []
    $scope.mountItems = []
    $scope.noneItems = []
    $scope.backToPrePage = function () {
        for(var i=0;i<$scope.selecteds.length;i++){
            if($scope.selecteds[i].maxCount == 0 || $scope.selecteds[i].maxCount == null){
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: '您选择的项目中有数量未填写，请填写后再进行提交',
                    okText:'确定'
                });
                return
            }
            if($scope.selecteds[i].id>0 && $scope.selecteds[i].id<=6){
                $scope.windItems.push($scope.selecteds[i])


            }
            if($scope.selecteds[i].id>6 && $scope.selecteds[i].id<=12){
                $scope.forestItems.push($scope.selecteds[i])

            }
            if($scope.selecteds[i].id>12 && $scope.selecteds[i].id<=18){
                $scope.fireItems.push($scope.selecteds[i])

            }
            if($scope.selecteds[i].id>18 && $scope.selecteds[i].id<=24){
                $scope.mountItems.push($scope.selecteds[i])

            }
            if($scope.selecteds[i].id>24 && $scope.selecteds[i].id<=30){
                $scope.noneItems.push($scope.selecteds[i])

            }


        }
        $scope.windItemsObj.name = '风级'
        $scope.windItemsObj.items = $scope.windItems
        $scope.eventItems.push($scope.windItemsObj)
        $scope.forestItemsObj.name='林级'
        $scope.forestItemsObj.items=$scope.forestItems
        $scope.eventItems.push($scope.forestItemsObj)
        $scope.fireItemsObj.name = '火级'
        $scope.fireItemsObj.name = $scope.fireItems
        $scope.eventItems.push($scope.fireItemsObj)
        $scope.mountItemsObj.name = '山级'
        $scope.mountItemsObj.name = $scope.mountItems
        $scope.eventItems.push($scope.mountItemsObj)
        $scope.noneItemsObj.name = '无级'
        $scope.noneItemsObj.name = $scope.noneItems
        $scope.eventItems.push($scope.noneItemsObj)

        $rootScope.eventItems = $scope.eventItems
        $window.history.back()
    }




   /* $scope.gameItems = []
    grade = {}
    gameItems.push(grade)
    //grade.name = ''
    grade.items = []
    events = {}
    events.name = ''
    events.maxCount = ''
    grade.items.push(events)*/


   /* gameItems = [
        {
            name: '风级',
            items: [
                {
                    id:'1',
                    name:'男单',
                    maxCount:50
                },
                {
                    id:'2',
                    name:'男双',
                    maxCount:50
                },
                {
                    id:'3',
                    name:'女单',
                    maxCount:50
                }
            ]
        },
        {
            name: '林级',
            items: [
                {
                    name:'男单',
                    maxCount:50
                },
                {
                    name:'男双',
                    maxCount:50
                },
                {
                    name:'女单',
                    maxCount:50
                }
            ]
        }
    ]*/
  /*  $scope.gameItems = []
    $scope.gameItemsClassWind = {}
    $scope.gameItemsClassForest = {}
    $scope.gameItemsClassItems = []
    $scope.gameItemsClassItem = {}*/


    //点击确定按钮
   /* $scope.eventItems = []

    var obj = {}*/


  /* $scope.selected = []
    $scope.Items = $scope
    var updateSelected = function(action,id,name) {

        if(action == 'add'&& $scope.selected.indexOf(id) == -1 && id>0 && id<7){
            $scope.gameItemsClassWind.name = '风级'
            $scope.gameItemsClassWind.gameItemsClassItems =$scope.gameItemsClassItems
            $scope.gameItemsClassItem.id = id;
            $scope.gameItemsClassItem.name = name;
            $scope.gameItemsClassItems.maxCount = $scope.Items.maxCount
            $scope.gameItemsClassItems.push( {id:$scope.gameItemsClassItem.id, name:$scope.gameItemsClassItem.name,maxCount:$scope.gameItemsClassItem.maxCount})
       }

        if (action == 'remove' && $scope.selected.indexOf(id) != -1) {
            var idx = $scope.selected.indexOf(id);
           // $scope.gameItemsClassItems.splice(idx,1)
        }
    }

    $scope.updateSelection = function($event, id){

        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        updateSelected(action, id, checkbox.name);
        $scope.gameItems.push($scope.gameItemsClass)
    console.log(  $scope.gameItemsClassWind)



    }
    $scope.isSelected = function(id){
        return $scope.selected.indexOf(id)>=0;

    }*/
  /*  $scope.changeCount = function(id,maxCount){
       //

    }*/
   /* $scope.isChecked=false
    $scope.backToPrePage = function (val) {

    }*/


    /*$scope.selected=[]
    $scope.selectedItems = [];
    $scope.selectedItems1 = [];
    $scope.selectedItems2 = [];
    $scope.selectedItems3 = [];
    $scope.selectedItems4 = [];

    var updateSelected = function(action,id,name) {

        if(action == 'add' && $scope.selected.indexOf(id) == -1 && id>=1 && id<7){
            $scope.selected.push(id);
            $scope.selectedItems.push(name);
        }
        if(action == 'add' && $scope.selected.indexOf(id) == -1 && id>=7 && id<13){
            $scope.selected.push(id);
            $scope.selectedItems1.push(name);
        }
        if(action == 'add' && $scope.selected.indexOf(id) == -1 && id>=13 && id<19){
            $scope.selected.push(id);
            $scope.selectedItems2.push(name);
        }
        if(action == 'add' && $scope.selected.indexOf(id) == -1 && id>=19 && id<25){
            $scope.selected.push(id);
            $scope.selectedItems3.push(name);
        }
        if(action == 'add' && $scope.selected.indexOf(id) == -1 && id>=25 && id<31){
            $scope.selected.push(id);
            $scope.selectedItems4.push(name);
        }

        if (action == 'remove' && $scope.selected.indexOf(id) != -1&& id>=1&&id<7) {
            var idx = $scope.selected.indexOf(id);
            $scope.selected.splice(idx, 1);
            $scope.selectedItems.splice(idx, 1);
        }
        if(action == 'remove' && $scope.selected.indexOf(id) != -1&& id>=7&&id<13){
            var idx = $scope.selected.indexOf(id);
            $scope.selected.splice(idx, 1);
            $scope.selectedItems1.splice(idx, 1);
        }
        if(action == 'remove' && $scope.selected.indexOf(id) != -1&& id>=13&&id<19){
            var idx = $scope.selected.indexOf(id);
            $scope.selected.splice(idx, 1);
            $scope.selectedItems2.splice(idx, 1);
        }
        if(action == 'remove' && $scope.selected.indexOf(id) != -1&& id>=19&&id<25){
            var idx = $scope.selected.indexOf(id);
            $scope.selected.splice(idx, 1);
            $scope.selectedItems3.splice(idx, 1);
        }
        if(action == 'remove' && $scope.selected.indexOf(id) != -1&& id>=25&&id<31){
            var idx = $scope.selected.indexOf(id);
            $scope.selected.splice(idx, 1);
            $scope.selectedItems4.splice(idx, 1);
        }
    }

    $scope.updateSelection = function($event, id){

        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        updateSelected(action, id, checkbox.name);

    }
    $scope.isSelected = function(id){
        return $scope.selected.indexOf(id)>=0;
    }

    $scope.backToPrePage = function () {
        var gameItems = []
        var obj1 = {}
        var obj2 = {}
        var obj3 = {}
        var obj4 = {}
        var obj5 = {}
        obj1.name= '风级'
        obj2.name= '林级'
        obj3.name= '火级'
        obj4.name= '山级'
        obj5.name= '无级'

        obj1.items = $scope.selectedItems
        obj2.items = $scope.selectedItems1
        obj3.items = $scope.selectedItems2
        obj4.items = $scope.selectedItems3
        obj5.items = $scope.selectedItems4
        console.log(obj1)
        console.log(obj2)
        console.log(obj3)
        console.log(obj4)
        console.log(obj5)

    }

*/

/*

    $scope.backToPrePage = function () {

    }


        [
        {
            "competitionId": 15,
            "description": "老年组 50-60岁",
            "name": "甲组",
            "projectList": [
                {
                    "className": "风级",
                    "maxCount": 1,
                    "name": "男单"
                },
                {
                    "className": "风级",
                    "maxCount": 1,
                    "name": "男双"
                },
                {
                    "className": "风级",
                    "manCount": 1,
                    "maxCount": 1,
                    "name": "男单",
                    "secondManCount": 1,
                    "secondWomenCount": 1,
                    "subProjects": [
                        {
                            "maxCount": 3,
                            "name": "混双"
                        },
                        {
                            "maxCount": 3,
                            "name": "混双"
                        },
                        {
                            "maxCount": 3,
                            "name": "混双"
                        }
                    ],
                    "womenCount": 1
                }
            ]
        },
        {
            "competitionId": 15,
            "description": "老年组 50-60岁",
            "name": "甲组",
            "projectList": [
                {
                    "className": "风级",
                    "manCount": 1,
                    "maxCount": 1,
                    "name": "男单",
                    "secondManCount": 1,
                    "secondWomenCount": 1,
                    "subProjects": [
                        {
                            "maxCount": 3,
                            "name": "混双"
                        },
                        {
                            "maxCount": 3,
                            "name": "混双"
                        },
                        {
                            "maxCount": 3,
                            "name": "混双"
                        }
                    ],
                    "womenCount": 1
                },
                {
                    "className": "风级",
                    "manCount": 1,
                    "maxCount": 1,
                    "name": "男单",
                    "secondManCount": 1,
                    "secondWomenCount": 1,
                    "subProjects": [
                        {
                            "maxCount": 3,
                            "name": "混双"
                        },
                        {
                            "maxCount": 3,
                            "name": "混双"
                        },
                        {
                            "maxCount": 3,
                            "name": "混双"
                        }
                    ],
                    "womenCount": 1
                },
                {
                    "className": "风级",
                    "manCount": 1,
                    "maxCount": 1,
                    "name": "男单",
                    "secondManCount": 1,
                    "secondWomenCount": 1,
                    "subProjects": [
                        {
                            "maxCount": 3,
                            "name": "混双"
                        },
                        {
                            "maxCount": 3,
                            "name": "混双"
                        },
                        {
                            "maxCount": 3,
                            "name": "混双"
                        }
                    ],
                    "womenCount": 1
                }
            ]
        },
        {
            "competitionId": 15,
            "description": "老年组 50-60岁",
            "name": "甲组",
            "projectList": [
                {
                    "className": "风级",
                    "manCount": 1,
                    "maxCount": 1,
                    "name": "男单",
                    "secondManCount": 1,
                    "secondWomenCount": 1,
                    "subProjects": [
                        {
                            "maxCount": 3,
                            "name": "混双"
                        },
                        {
                            "maxCount": 3,
                            "name": "混双"
                        },
                        {
                            "maxCount": 3,
                            "name": "混双"
                        }
                    ],
                    "womenCount": 1
                },
                {
                    "className": "风级",
                    "manCount": 1,
                    "maxCount": 1,
                    "name": "男单",
                    "secondManCount": 1,
                    "secondWomenCount": 1,
                    "subProjects": [
                        {
                            "maxCount": 3,
                            "name": "混双"
                        },
                        {
                            "maxCount": 3,
                            "name": "混双"
                        },
                        {
                            "maxCount": 3,
                            "name": "混双"
                        }
                    ],
                    "womenCount": 1
                },
                {
                    "className": "风级",
                    "manCount": 1,
                    "maxCount": 1,
                    "name": "男单",
                    "secondManCount": 1,
                    "secondWomenCount": 1,
                    "subProjects": [
                        {
                            "maxCount": 3,
                            "name": "混双"
                        },
                        {
                            "maxCount": 3,
                            "name": "混双"
                        },
                        {
                            "maxCount": 3,
                            "name": "混双"
                        }
                    ],
                    "womenCount": 1
                }
            ]
        }
        ]
*/









































});

