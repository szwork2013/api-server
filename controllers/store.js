
var models = require('../models');
var Store = models.Store;


var util = require('../util/util.js');
var Paginator = require('./paginator');
var _ = require('underscore');
var Promise = require('bluebird');

module.exports = {
    /**
     * 查询商店参数
     * GET /stores
     * GET /users/:user_id/stores
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
        if(!isNaN(inline_relation) && inline_relation >= 1){
            //relations = ['owner']
        }

        if (filter.store_id) {
            filter.id  = filter.store_id;
            delete filter.store_id;
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


        Store.forge()
            .query(function (qb) {
                queryFun(qb, true);
            })
            .fetchAll({withRelated: relations})
            .then(function(stores) {
                return Store.forge(filter)
                .query(function(qb){
                    queryFun(qb)
                })
                .count()
                .then(function (count) {
                    count = count.length? count[0]['count(*)'] : count;
                    return {
                        count: count,
                        data: stores
                    };
                });
            }, function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            }).then(function (result) {
                var count = result.count;
                var stores = result.data;

                paginator.setCount(count);
                paginator.setData(stores);

                var ret = paginator.getPaginator();
                return  util.res(null, res, ret);
            });
    },

    /**
     * 查询商店参数
     * GET /stores/:id
     * GET /users/:user_id/stores/:id
     * inlne-relation-depeth:1 
     * 
     */
    findOne: function(req, res, next){
        var filter = util.param(req);
        var relations = [];
        var inline_relation = parseInt(req.param('inline-relation-depth'));
        if(!isNaN(inline_relation) && inline_relation >= 1){
            //relations = ['owner']
        }

        if (filter.store_id) {
            filter.id  = filter.store_id;
            delete filter.store_id;
        }
        Store.forge(filter)
            .fetch({withRelated: relations})
            .then(function (store) {
                if (!store) {
                    util.res(null, res, [])
                }
                else {
                    util.res(null, res, store)
                }
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            });
    },

    /**
     * 更新商店数据
     * PUT /stores/:id
     * PUT /users/:user_id/stores/:store_id
     * 
     */
    update: function(req, res, next){
        //参数过滤
        var store = req.body.store
        Store.where({id: req.params.store_id})
            .save(store, {patch: true})
            .then(function (store) {
                util.res(null, res, {});
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            }); 
    },

    /**
     * 新增商店数据
     * POST /stores/
     * POST /users/:user_id/stores/
     */
    add: function(req, res, next){
        //参数过滤
        var store = req.body.store
        delete store.id
        Store.forge(store)
            .save()
            .then(function (store) {
                util.res(null, res, {id: store.get('id')})
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message}
                util.res(error, res);
            }); 
    },

    /**
     * 删除商店数据
     * DELETE /stores/:id
     * DELETE /users/:user_id/stores/:store_id
     */
    del: function(req, res, next){
        Store.forge({id: req.params.store_id})
            .fetch({require: true})
            .then(function (cat) {
                //鉴权
                Store.destroy()
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
