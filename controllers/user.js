
var models = require('../models');
var User = models.User;


var util = require('../util/util.js');
var Paginator = require('./paginator');
var _ = require('underscore');
var Promise = require('bluebird');

module.exports = {
    /**
     * 查询用户信息
     * GET /users
     * page=1
     * limit=30,
     * sort= update,create
     * inlne-relation-depeth=1 
     * q=owner:8805,role:3
     *
     */
    queryAll: function(req, res, next){
        var filter = util.param(req);
        var relations = [];
        var columns = ['username', 'nickname', 'email', 'phone', 'avatar', 'role', 'last_login_time', 'id'];
        var inline_relation = parseInt(req.param('inline-relation-depth'));
        if(!isNaN(inline_relation) && inline_relation >= 1){
            relations = ['cart', 'coupons', 'orders', 'stores']
        }

        if (filter.user_id) {
            filter.id  = filter.user_id;
            delete filter.user_id;
        }

        var page, pageSize, skip = null, limit = null, paginator = null;

        page = parseInt(filter.page) || 1;
        pageSize = parseInt(filter.page_size) || 4;

        paginator = new Paginator(page, pageSize);

        limit = paginator.getLimit();
        skip = paginator.getOffset();

        var queryFun = function(qb, limited){
            if(like) { 
                qb = qb.where('name', 'like', '%' + like + '%');
            }
            //排序
            if(sort){
                qb = qb.orderByRaw(sort);
            }
            //按属性过滤
            qb = qb.where(filter);
            //是否进行分页
            if(limited) qb = qb.limit(limit).offset(skip);
        }

        User.forge()
            .query(function (qb) {
                queryFun(qb, true);
            })
            .fetchAll({withRelated: relations, columns: columns})
            //.fetchAll()
            .then(function(users) {
                return User.forge()
                .query(function(qb){
                    queryFun(qb);
                })
                .count()
                .then(function (count) {
                    count = count.length? count[0]['count(*)'] : count;
                    return {
                        count: count,
                        data: users
                    };
                });
            }, function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            }).then(function (result) {
                var count = result.count;
                var users = result.data;

                paginator.setCount(count);
                paginator.setData(users);

                var ret = paginator.getPaginator();
                //console.log(ret);
                return  util.res(null, res, ret);

                //return res.json();
            });
    },

    /**
     * 查询用户信息
     * GET /users/:user_id
     * inlne-relation-depeth:1 
     * 
     */
    findOne: function(req, res, next){
        var filter = util.param(req);
        var relations = [];
        var columns = ['username', 'nickname', 'email', 'phone', 'avatar', 'role', 'last_login_time', 'id'];
        var inline_relation = parseInt(req.param('inline-relation-depth'));
        if(!isNaN(inline_relation) && inline_relation >= 1){
            relations = ['cart', 'coupons', 'orders', 'stores']
        }

        if (filter.user_id) {
            filter.id  = filter.user_id;
            delete filter.user_id;
        }
        User.forge(filter)
            .fetch({withRelated: relations, columns: columns})
            //.fetchAll()
            .then(function (user) {
                if (!user) {
                    util.res(null, res, [])
                }
                else {
                    util.res(null, res, user)
                }
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            });

    },

    /**
     * 更新用户信息
     * PUT /users/:user_id
     * 
     */
    update: function(req, res, next){
        //参数过滤
        var propWhiteList = ['username', 'nickname', 'email', 'phone', 'avatar', 'role'];
        var user = util.cloneProps(req.body.user, propWhiteList);
        console.log(user);
        new User({id: req.params.user_id})
            .save(user, {patch: true})
            .then(function (user) {
                util.res(null, res, {});
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            }); 
    },

    /**
     * 新增用户信息
     * POST /users/
     */
    add: function(req, res, next){
        //鉴权(供应商或者管理员)
        if(req.session.user.role==1){

        }

        //参数过滤
        var propWhiteList = ['username', 'nickname', 'email', 'phone', 'avatar', 'role'];
        var user = util.cloneProps(req.body.user, propWhiteList);
        user.avatar = user.avatar || 'http://www.placehold.it/200x150/EFEFEF/AAAAAA&amp;text=avatar';

        User.forge(user)
            .save()
            .then(function (user) {
                util.res(null, res, {id: user.get('id')});
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            }); 
    },

    /**
     * 删除用户信息
     * DELETE /users/:user_id
     */
    del: function(req, res , next){
        User.forge({id: req.params.user_id})
            .fetch({require: true})
            .then(function (user) {
                //鉴权
                if(req.session.user.role==1){
                    user.destroy()
                        .then(function () {
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
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            });
    }
}
