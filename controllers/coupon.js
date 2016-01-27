
var models = require('../models');
var Coupon = models.Coupon;

var util = require('../util/util.js');
var Promise = require('bluebird');
var Bookshelf = require('bookshelf').mysqlAuth;

module.exports = {
    /**
     * 查询参数
     * GET /coupons
     * GET /users/:user_id/coupons/
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
       
        Coupon.where(filter)
            .fetchAll()
            .then(function (coupons) {
                if (!coupons) {
                    util.res(null, res, [])
                }
                else {
                    util.res(null, res, coupons)
                }
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            });
    },

    /**
     * 查询参数
     * GET /coupons/:coupon_id
     * GET /users/:user_id/coupons/:coupon_id
     * inlne-relation-depeth:1 
     * 
     */
    findOne: function(req, res, next){
        var filter = util.param(req);
        var relations = [];

        if (filter.coupon_id) {
            filter.id  = filter.coupon_id;
            delete filter.coupon_id;
        }
        
        Coupon.where(filter)
            .fetch()
            .then(function (coupon) {
                if (!coupon) {
                    util.res(null, res, [])
                }
                else {
                    util.res(null, res, coupon)
                }
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            });

    },

    /**
     * 更新卡券数据
     * PUT /coupons/:coupon_id
     */
    update: function(req, res, next){
        //鉴权(管理员才有权限使用该接口)
        if(req.session && req.session.user && req.session.user.role==1){
            //参数过滤
            var coupon = req.body.coupon
            Coupon.where({id: req.params.coupon_id})
                .save(coupon, {patch: true})
                .then(function (coupon) {
                    util.res(null, res, {});
                })
                .catch(function (err) {
                    var error = { code: 500, msg: err.message};
                    util.res(error, res);
                }); 
        } else {
            var error = { code: 401, msg: 'not authorized'};
            util.res(error, res);
        }
    },

    /**
     * 更新卡券数据
     * POST /coupons/   {user_id: 1, type: 1, amount:2, condition: 'amount>=1000', expires: '1450323188000'}
     */
    add: function(req, res, next){
        //鉴权(管理员才有权限使用该接口)
        if(req.session && req.session.user && req.session.user.role==1){
            //参数过滤
            var coupon = req.body.coupon
            delete coupon.id
            Coupon.forge(coupon)
                .save()
                .then(function (coupon) {
                    util.res(null, res, {id: coupon.get('id')});
                })
                .catch(function (err) {
                    var error = { code: 500, msg: err.message};
                    util.res(error, res);
                });
        } else {
            var error = { code: 401, msg: 'not authorized'};
            util.res(error, res);
        }
    },

    /**
     * 删除用户卡券数据 [DANGER]
     * DELETE /coupons/:id
     * DELETE /users/:user_id/coupons/:coupon_id
     * DELETE /users/:user_id/coupons/ [coupon_id为空，清空所有]
     */
    del: function(req, res, next){
        Coupon.forge({id: req.params.coupon_id})
            .fetch({require: true})
            .then(function (coupon) {
                //鉴权
                coupon.destroy()
                    .then(function () {
                        util.res(null, res, {});
                    })
                    .catch(function (err) {
                        var error = { code: 500, msg: err.message};
                        util.res(error, res);
                    });
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            });
    }
}
