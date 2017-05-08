/**
 * Created by Administrator on 2016/11/25 0025.
 */
app.controller('knockoutCtrl', function ($scope,$state,$http,$window) {

    var projectId = $window.sessionStorage.projectId
    $scope.treeShow = false
    $scope.picShow = false
    //获取数据
    $http({
        url:SITE_SUFFIX+"api/competition/treeMap",
        method:'get',
        params:{projectId:projectId}
    }).success(function (response) {
        console.log(response)
        if(response.message.type == 1){
            $scope.treeShow = true
            $scope.players = response.message.data

            var chart_config = {
                chart: {
                    container: "#custom-colored",

                   // levelSeparation:    20,
                   // siblingSeparation:  15,
                  //  subTeeSeparation:   15,
                    rootOrientation:  'EAST',


                    connectors: {
                        type: 'step'
                    },
                    node: {
                        HTMLclass: 'nodeExample1',
                        drawLineThrough: true
                    }
                },
                nodeStructure:$scope.players
            };
            new Treant( chart_config );
        }
        if(response.message.type == 0){
            $scope.picShow = true
            $scope.pictureUrls = response.message.data
        }

    })

    /*{
     text: {
     name: {val: "Djokovic, Novak", href: "http://www.atpworldtour.com/Tennis/Players/Top-Players/Novak-Djokovic.aspx"}
     },
     HTMLclass: "winner",
     children: [
     {
     text: {
     name: "Djokovic, Novak",
     desc: "4-6, 6-2, 6-2"
     },
     children: [
     {
     text: {
     name: "Djokovic, Novak",
     desc: "4-6, 6-1, 6-4"
     },
     children: [
     {
     text: {
     name: "Djokovic, Novak",
     desc: "4-6, 6-1, 6-4"
     },
     children: [
     {
     text: {
     name: "Djokovic, Novak"
     },
     HTMLclass: "first-draw"

     },
     {
     text: {
     name: "Bye"
     },
     HTMLclass: "first-draw bye"
     }
     ]
     },
     {
     text: {
     name: "Youzhny, Mikhail",
     desc: "6-4, 6-0"
     },
     children: [
     {
     text: {
     name: "Youzhny, Mikhail"
     },
     HTMLclass: "first-draw"
     },
     {
     text: {
     name: "Gimeno-Traver, Daniel"
     },
     HTMLclass: "first-draw"
     }
     ]
     }
     ]
     },
     {
     text: {
     name: "Monaco, Juan",
     desc: "6-0, 3-6, 6-3"
     },
     children: [
     {
     text: {
     name: "Gulbis, Ernests",
     desc: "4-6, 6-2, 6-3"
     },
     children: [
     {
     text: {
     name: "Gulbis, Ernests"
     },
     HTMLclass: "first-draw"
     },
     {
     text: {
     name: "Isner, John"
     },
     HTMLclass: "first-draw"
     }
     ]
     },
     {
     text: {
     name: "Monaco, Juan",
     desc: "6-4, 6-0"
     },
     children: [
     {
     text: {
     name: "Klizan, Martin"
     },
     HTMLclass: "first-draw"
     },
     {
     text: {
     name: "Monaco, Juan"
     },
     HTMLclass: "first-draw"
     }
     ]
     }
     ]
     }
     ]
     },
     {
     text: {
     name: "Nieminen, Jarkko",
     desc: "6-3, 1-6, 7-6(3)"
     },
     children: [
     {
     text: {
     name: "Nieminen, Jarkko",
     desc: "4-6, 6-1, 6-4"
     },
     children: [
     {
     text: {
     name: "Raonic, Milos",
     desc: "6-1, 6-4"
     },
     children: [
     {
     text: {
     name: "Raonic, Milos"
     },
     HTMLclass: "first-draw"
     },
     {
     text: {
     name: "Benneteau, Julien"
     },
     HTMLclass: "first-draw"
     }
     ]
     },
     {
     text: {
     name: "Nieminen, Jarkko",
     desc: "6-1, 6-2"
     },
     children: [
     {
     text: {
     name: "Nieminen, Jarkko"
     },
     HTMLclass: "first-draw"
     },
     {
     text: {
     name: "Troicki, Viktor"
     },
     HTMLclass: "first-draw"
     }
     ]
     }
     ]
     },
     {
     text: {
     name: "Del Potro, Juan Martin",
     desc: "6-2, 6-4"
     },
     children: [
     {
     text: {
     name: "Dolgopolov, Alexandr",
     desc: "4-6, 6-2, 6-3"
     },
     children: [
     {
     text: {
     name: "Dolgopolov, Alexandr"
     },
     HTMLclass: "first-draw"
     },
     {
     text: {
     name: "Tomic, Bernard"
     },
     HTMLclass: "first-draw"
     }
     ]
     },
     {
     text: {
     name: "Del Potro, Juan Martin",
     desc: "6-4, 6-0"
     },
     children: [
     {
     text: {
     name: "Bye"
     },
     HTMLclass: "first-draw bye"
     },
     {
     text: {
     name: "Del Potro, Juan Martin"
     },
     HTMLclass: "first-draw"
     }
     ]
     }
     ]
     }
     ]
     }
     ]
     }*/


})