
var models = require('../models');
var Address = models.Address;

var util = require('../util/util.js');
var Promise = require('bluebird');
var Bookshelf = require('bookshelf').mysqlAuth;

module.exports = {
    /**
     * 查询收货地址/发货地址参数
     * GET /addresses
     * GET /users/:user_id/addresses
     * page=1
     * limit=30,
     * sort= update,create
     * inlne-relation-depeth=1 
     * q=user_id:8805,is_default:true
     *
     */
    queryAll: function(req, res, next){
        var filter = util.param(req);
        var relations = [];
        
        Address.where(filter)
            .fetchAll()
            .then(function (Addresses) {
                if (!Addresses) {
                    util.res(null, res, [])
                }
                else {
                    util.res(null, res, Addresses)
                }
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            });
    },

    /**
     * 查询收获地址参数
     * GET /addresses/:address_id
     * GET /users/:user_id/addresses/:address_id
     * inlne-relation-depeth:1 
     * 
     */
    findOne: function(req, res, next){
        var filter = util.param(req);
        var relations = [];

        if (filter.address_id) {
            filter.id  = filter.address_id;
            delete filter.address_id;
        }
        
        Address.where(filter)
            .fetch()
            .then(function (address) {
                if (!address) {
                    util.res(null, res, [])
                }
                else {
                    util.res(null, res, address)
                }
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            });
    },

    /**
     * 更新地址数据
     * PUT /addresses/:address_id
     * PUT /users/:user_id/addresses/:address_id
     * 
     */
    update: function(req, res, next){

        //参数过滤
        var addr = req.body.address

        Address.forge({id: req.params.address_id})
            .fetch({require: true})
            .then(function (address) {
                //鉴权
                if(address.get('user_id') == req.session.user.id){
                    new Address(address)
                        .save(addr, {patch: true})
                        .then(function () {
                            util.res(null, res, {});
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
     * 新增地址数据
     * POST /addresses/
     * POST /users/:user_id/addresses/
     */
    add: function(req, res, next){
        //参数过滤
        var address = req.body.address
        Address.forge(address)
            .save()
            .then(function (address) {
                util.res(null, res, {id: address.get('id')});
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            }); 
    },

    /**
     * 删除地址数据
     * DELETE /addresses/:address_id
     * DELETE /users/:user_id/addresses/:address_id
     */
    del: function(req, res, next){
        Address.forge({id: req.params.address_id})
            .fetch({require: true})
            .then(function (address) {
                //鉴权
                address.destroy()
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
