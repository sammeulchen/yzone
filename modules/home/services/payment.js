/**
 * Created by Administrator on 2016/8/25 0025.
 */
angular.module('yuZoneApp',[])
    .service('PaymentOrder', function () {
        var service = {
            PayOrder:null,
            addOrder: function (order) {
                service.PayOrder = order;
            },
            addPrice: function (price) {
                service.price = price;
            },
            addPrice2: function (price2) {
                service.price2 = price2;
            },

            price:null,
            price2:null
        }
        return service
    })