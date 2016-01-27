
var models = require('../models');
var Spec = models.Spec;


var util = require('../util/util.js');

module.exports = {
    /**
     * 查询Specs
     * GET /specs
     * GET /cats/:cat_id/specs
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
        var inline_relation = parseInt(req.param('inline-relation-depth'));
        if(!isNaN(inline_relation) && inline_relation >= 1){
            relations = ['cat']
        }

        if (filter.spec_id) {
            filter.id  = filter.spec_id;
            delete filter.spec_id;
        }
        Spec.forge(filter)
            .fetchAll({withRelated: relations})
            .then(function (specs) {
                if (!specs) {
                    util.res(null, res, [])
                }
                else {
                    util.res(null, res, specs)
                }
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            });
    },

    /**
     * 查询某个具体的Spec
     * GET /specs/:spec_id
     * 
     * inlne-relation-depeth:1 
     * 
     */
    findOne: function(req, res, next){
        var filter = util.param(req);
        var relations = [];
        var inline_relation = parseInt(req.param('inline-relation-depth'));
        if(!isNaN(inline_relation) && inline_relation >= 1){
            relations = ['cat']
        }

        if (filter.spec_id) {
            filter.id  = filter.spec_id;
            delete filter.spec_id;
        }
        Spec.forge(filter)
            .fetch({withRelated: relations})
            .then(function (spec) {
                if (!spec) {
                    util.res(null, res, [])
                }
                else {
                    util.res(null, res, spec)
                }
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            });
    },

    /**
     * 更新spec数据
     * PUT /specs/:spec_id
     * 
     */
    update: function(req, res, next){
        //参数过滤
        var spec = req.body.spec
        Spec.where({id: req.params.spec_id})
            .save(spec, {patch: true})
            .then(function (spec) {
                util.res(null, res, {});
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            }); 
    },

    /**
     * 新增spec数据
     * POST /specs/
     * POST /cats/:cat_id/specs/
     */
    add: function(req, res, next){
        var spec = req.body.spec
        delete spec.id
        Spec.forge(spec)
            .save()
            .then(function (spec) {
                util.res(null, res, {id: spec.get('id')})
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message}
                util.res(error, res);
            }); 
    },

    /**
     * 删除spec数据
     * DELETE /specs/:spec_id
     */
    del: function(req, res, next){
        Spec.forge({id: req.params.spec_id})
            .fetch({require: true})
            .then(function (spec) {
                //鉴权
                spec.destroy()
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
