
var models = require('../models');
var Order = models.Order;
var OrderDetail = models.OrderDetail;

var util = require('../util/util.js');
var Promise = require('bluebird');
var Bookshelf = require('bookshelf').mysqlAuth;

var Paginator = require('./paginator');
var _ = require('underscore');

module.exports = {
    /**
     * 查询参数
     * GET /orders
     * GET /users/:user_id/orders
     * page=1
     * limit=30,
     * sort= update,create
     * inlne-relation-depeth=1 
     * q=owner:8805,cat_id:758
     *
     */
    queryAll: function(req, res, next){
        var filter = util.param(req);
        var relations = [];
        var inline_relation = parseInt(req.param('inline-relation-depth'));
        if(!isNaN(inline_relation) && inline_relation == 1){
            relations = ['details.good']
        }
        if(!isNaN(inline_relation) && inline_relation == 2){
            relations = ['details.good.supplier']
        }

        var page, pageSize, skip = null, limit = null, paginator = null;

        page = parseInt(filter.page) || 1;
        pageSize = parseInt(filter.page_size) || 4;

        paginator = new Paginator(page, pageSize);

        limit = paginator.getLimit();
        skip = paginator.getOffset();

        var like = filter.like, sort = util.parseSort(filter.sort);
        var trasher = ['like', 'page', 'page_size', 'sort']
        _.each(trasher, function(key){
            filter[key] && (delete filter[key])
        })

        var queryFun = function(qb, limited){
            //排序
            if(sort){
                qb = qb.orderByRaw(sort);
            }
            //按属性过滤
            qb = qb.where(filter);
            //是否进行分页
            if(limited) qb = qb.limit(limit).offset(skip);
        }

        Order.forge()
            .query(function (qb) {
                queryFun(qb, true);
            })
            .fetchAll({withRelated: relations})
            .then(function(orders) {
                return Order.forge(filter)
                .query(function(qb){
                    queryFun(qb);
                })
                .count()
                .then(function (count) {
                    count = count.length? count[0]['count(*)'] : count;
                    return {
                        count: count,
                        data: orders
                    };
                });
            }, function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            }).then(function (result) {
                var count = result.count;
                var orders = result.data;

                paginator.setCount(count);
                paginator.setData(orders);

                var ret = paginator.getPaginator();
                return  util.res(null, res, ret);
            });
    },

    /**
     * 查询参数
     * GET /orders/:id
     * GET /users/:user_id/orders/:order_id
     * inlne-relation-depeth:1 
     * 
     */
    findOne: function(req, res, next){
        var filter = util.param(req);
        var relations = [];

        if (filter.order_id) {
            filter.id  = filter.order_id;
            delete filter.order_id;
        }

        var inline_relation = parseInt(req.param('inline-relation-depth'));
        if(!isNaN(inline_relation) && inline_relation == 1){
            relations = ['details.good']
        }
        if(!isNaN(inline_relation) && inline_relation == 2){
            relations = ['details.good.supplier']
        }

        Order.forge(filter)
            .fetch({withRelated: relations})
            //.fetchAll()
            .then(function (order) {
                if (!order) {
                    util.res(null, res, [])
                }
                else {
                    util.res(null, res, order)
                }
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            });
    },

    /**
     * 更新订单数据
     * PUT /users/:user_id/orders/:order_id  {order_detail: [{good_id:10085, amount:2}]}
     * 
     */
    update: function(req, res, next){
        var filter = util.param(req);
        var orderDetails = req.body.order_details;

        if( !orderDetails || !orderDetails.length){
            var error = { code: 400, msg: 'bad request'};
            util.res(error, res);
            return;
        }

        Bookshelf.transaction(function(t) {
            Order.forge({id: filter.order_id}).fetch({
                withRelated:['details']
            }).then(function (order) {
                if(order){
                    //鉴权
                    //console.log(order.get('user_id'))
                    //if(order.get('user_id') == req.session.user.id){}

                    return Promise.map(orderDetails, function(orderDetail) {
                        var exist = false;
                        var details = order.related('details');
                        //console.dir(orderDetail);
                        //console.log(details);
                        for(var i=0 ; i< details.length; i++){
                            if(orderDetail.good_id == details[i].good_id){
                                exist = true;
                                break;
                            }
                        }
                        //console.dir(exist);
                        if(!exist){
                            return new OrderDetail(orderDetail).save({'amount': orderDetail.amount}, {transacting: t});
                        } else {
                            OrderDetail.where({id: orderDetail.id}).fetch().then(function(detail){
                                return  detail.save({amount: orderDetail.amount}, {patch: true, transacting: t})
                            })
                        }
                        
                    });
                } else {
                    var error = { code: 500, msg: 'not found'};
                    util.res(error, res);
                }
            });

        }).then(function(order) {
            util.res(null, res, {id: order.get('id')});    
        }).catch(function(err) {
            var error = { code: 500, msg: err.message};
            util.res(error, res);
        });
    },

    /**
     * 新增订单数据
     * POST /orders?q=from:ios
     * POST /users/:user_id/orders/ {order_details: [{good_id:10085, amount:2}], status: 0}
     */
    add: function(req, res, next){
        var filter = util.param(req);
        var orderDetails = req.body.order_details;
        var sn = '';

        if( !orderDetails || !orderDetails.length){
            var error = { code: 400, msg: 'bad request'};
            util.res(error, res);
            return;
        }

        //订单号 = 日期前缀 + 随机流水号
        sn = util.formatTime(new Date(), 'yyyyMMddhhmmssS') + Math.floor( Math.random() * 100000 )

        Bookshelf.transaction(function(t) {
          return new Order({
                user_id: filter.user_id,
                sn: sn,
                status: 0,
                from: filter.from || 'unknown'
            })
            .save(null, {transacting: t})
            .tap(function(order) {
                return Promise.map(orderDetails, function(orderDetail) {
                    // Some validation could take place here.
                    return new OrderDetail(orderDetail).save({'order_id': order.id}, {transacting: t});
                });
            });
        }).then(function(order) {
            util.res(null, res, {id: order.get('id')});    
        }).catch(function(err) {
            var error = { code: 500, msg: err.message};
            util.res(error, res);
        });

    },

    /**
     * 删除订单数据
     * DELETE /orders/:order_id
     * DELETE /users/:user_id/orders/:order_id
     */
    del: function(req, res, next){
        var filter = util.param(req);

        Bookshelf.transaction(function (t) {
            Order.forge({id: filter.order_id}).fetch({
                withRelated:['details']
            }).then(function (order) {
                //如果存在　
                if(order){
                    return order.related('details').invokeThen('destroy').then(function () {
                        return order.destroy().then(function () {
                            util.res(null, res, {});
                        });
                    });
                } else {
                    var error = { code: 500, msg: 'not found'};
                    util.res(error, res);
                }
            });
        }).then( function () {
            util.res(null, res, {});
        }).catch( function(err) {
            var error = { code: 500, msg: err.message};
            util.res(error, res);
        })

        //var qb = OrderDetail.query();
        //return qb.where('order_id', filter.order_id).del()
        //    .then(function (numRows) {
        //         return numRows;
        //    })

    }
}
