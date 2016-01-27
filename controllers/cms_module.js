
var models = require('../models');
var CmsModule = models.CmsModule;


var util = require('../util/util.js');
var Paginator = require('./paginator');
var _ = require('underscore');
var Promise = require('bluebird');

module.exports = {
    /**
     * 查询 CMS module 数据
     * GET /modules
     * page=1
     * limit=30,
     * sort= update,create
     * inline-relation-depeth=1 
     * q=user_id:8805,is_default:true
     *
     */
    queryAll: function(req, res, next){
        var filter = util.param(req);
        var relations = [];
        var inline_relation = parseInt(req.param('inline-relation-depth'));
        if(!isNaN(inline_relation) && inline_relation >= 1){
            relations = ['fragments']
        }

        if (filter.cms_module_id) {
            filter.id  = filter.cms_module_id;
            delete filter.cms_module_id;
        }

        var page, pageSize, skip = null, limit = null, paginator = null;

        page = parseInt(filter.page) || 1;
        pageSize = parseInt(filter.page_size) || 4;

        paginator = new Paginator(page, pageSize);

        limit = paginator.getLimit();
        skip = paginator.getOffset();

        CmsModule.forge(filter)
            .query(function (qb) {
                qb.limit(limit).offset(skip);
            })
            .fetchAll({withRelated: relations})
            .then(function(modules) {
                return CmsModule.forge(filter)
                .query()
                .count()
                .then(function (count) {
                    count = count[0]['count(*)'];
                    return {
                        count: count,
                        data: modules
                    };
                });
            }, function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            }).then(function (result) {
                var count = result.count;
                var modules = result.data;

                paginator.setCount(count);
                paginator.setData(modules);

                var ret = paginator.getPaginator();
                return  util.res(null, res, ret);
            });
    },

    /**
     * 查询某个具体的 module 信息
     * GET /modules/:cms_module_id
     * inline-relation-depeth:1 
     * 
     */
    findOne: function(req, res, next){
        var filter = util.param(req);
        var relations = [];
        var inline_relation = parseInt(req.param('inline-relation-depth'));
        if(!isNaN(inline_relation) && inline_relation >= 1){
            relations = ['fragments']
        }

        if (filter.cms_module_id) {
            filter.id  = filter.cms_module_id;
            delete filter.cms_module_id;
        }
        CmsModule.forge(filter)
            .fetch({withRelated: relations})
            .then(function (module) {
                if (!module) {
                    util.res(null, res, [])
                }
                else {
                    util.res(null, res, module)
                }
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            });
    },

    /**
     * 更新modules数据
     * PUT /modules/:cms_module_id {title: '', subtitle: '', ext1: ''}
     * 
     */
    update: function(req, res, next){
        //参数过滤
        var module = req.body.module
        new CmsModule({id: req.params.cms_module_id})
            .save(module, {patch: true})
            .then(function (module) {
                util.res(null, res, {});
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            }); 
    },

    /**
     * 新增cat数据
     * POST /modules/ {title: '', subtitle: '', ext1: ''}
     */
    add: function(req, res, next){
        //参数过滤
        var module = req.body.module
        delete module.id
        CmsModule.forge(module)
            .save()
            .then(function (module) {
                util.res(null, res, {id: module.get('id')})
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message}
                util.res(error, res);
            }); 
    },

    /**
     * 删除modules数据 ［DANGER］
     * DELETE /modules/:cms_module_id
     */
    del: function(req, res, next){
        CmsModule.forge({id: req.params.cms_module_id})
            .fetch({require: true})
            .then(function (module) {
                //鉴权
                module.destroy()
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
