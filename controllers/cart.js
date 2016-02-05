var models = require('../models');
var Cart = models.Cart;

var util = require('../util/util.js');

module.exports = {
    /**
     * 查询参数
     * GET /carts
     * page=1
     * limit=30,
     * sort= update,create
     * inlne-relation-depeth=1 
     * q=owner:105
     *
     */
    queryAll: function(req, res, next){

    },

    /**
     * 查询购物车商品数据
     * GET /users/:user_id/cart
     * inline-relation-depeth:1 
     * 
     */
    findOne: function(req, res, next){
        var filter = util.param(req);

        var relations = [];
        var inline_relation = parseInt(req.param('inline-relation-depth'));
        if(!isNaN(inline_relation) && inline_relation >= 1){
            relations = ['good', 'good.supplier']
        }

        Cart.where(filter) // query('where', 'user_id', '=', filter.user_id)
            .fetchAll({withRelated: relations})
            .then(function (cart) {
                if (!cart) {
                    var error = { code: 404, msg: 'not found'};
                    util.res(error, res)
                }
                else {
                    util.res(null, res, cart)
                }
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            });
    },

    /**
     * 更新购物车商品数据
     * PUT /users/:user_id/cart  {good_id: 10058, amount=2}
     * 
     */
    update: function(req, res, next){
        var user_id = req.params.user_id;
        var good_id = req.body.good_id;
        var amount = req.body.amount;

        if(req.user.id != user_id) {
            var error = { code: 500, msg: 'not authenticated.'};
            return util.res(error, res);
        }

        Cart.where({
                user_id: user_id, 
                good_id: good_id
            })
            .fetch()
            .then(function (item) {
                //如果存在该商品项，为更新
                if(item) {
                    //如果目标数量不为空，则为更换数量
                    if( amount != 0 ) {
                        //如果数量没有发生变化, 直接返回成功
                        if ( item.amount == amount) {
                            util.res(null, res, {});
                            return;
                        }
                        item.save({amount: amount}, {patch: true})
                            .then(function () {
                                util.res(null, res, {});
                            })
                            .catch(function (err) {
                                var error = { code: 500, msg: err.message};
                                util.res(error, res);
                            });
                    } else {
                        //如果目标数量为空，则从购物车移除该商品项
                        item.destroy()
                            .then(function () {
                                util.res(null, res, {});
                            })
                            .catch(function (err) {
                                var error = { code: 500, msg: err.message};
                                util.res(error, res);
                            });
                    }
                } else {
                    //如果不存在该商品项，则为新增
                    Cart.forge({
                            user_id: user_id,
                            good_id: good_id,
                            amount: amount
                        })
                        .save()
                        .then(function (item) {
                            if (!item) {
                                var error = { code: 404, msg: 'not found'};
                                util.res(error, res)
                            }
                            else {
                                util.res(null, res, {id: item.get('id')});
                            }
                        })
                        .catch(function (err) {
                            var error = { code: 500, msg: err.message};
                            util.res(error, res);
                        });
                }
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            });

    },

    /**
     * 新增购物车
     * NOT IMPLEMENT YET
     */
    add: function(req, res, next){
        res.jsonp({code: 500, msg:''})
    },

    /**
     * 清空用户购物车数据
     * DELETE /users/:user_id/cart/
     */
    del: function(req, res, next){
        var filter = util.param(req);

        //鉴权 @todo


        var qb = Cart.query();
        qb.where('user_id', filter.user_id)
            .del()
            .then(function (numRows) {
                //console.log(numRows + ' rows have been deleted');
                util.res(null, res, {numRows: numRows});
            }).catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            });
    }
}
