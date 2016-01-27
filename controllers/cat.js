
var models = require('../models');
var Cat = models.Cat;


var util = require('../util/util.js');

module.exports = {
    /**
     * 查询Category参数
     * GET /cats
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
            relations = ['specs']
        }

        if (filter.cat_id) {
            filter.id  = filter.cat_id;
            delete filter.cat_id;
        }
        Cat.forge(filter)
            .fetchAll({withRelated: relations})
            //.fetchAll()
            .then(function (cats) {
                if (!cats) {
                    util.res(null, res, [])
                }
                else {
                    util.res(null, res, cats)
                }
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            });
    },

    /**
     * 查询某个具体的Category
     * GET /cats/:id
     * inline-relation-depeth:1 
     * 
     */
    findOne: function(req, res, next){
        var filter = util.param(req);
        var relations = [];
        var inline_relation = parseInt(req.param('inline-relation-depth'));
        if(!isNaN(inline_relation) && inline_relation >= 1){
            relations = ['specs']
        }

        if (filter.cat_id) {
            filter.id  = filter.cat_id;
            delete filter.cat_id;
        }
        Cat.forge(filter)
            .fetch({withRelated: relations})
            .then(function (cat) {
                if (!cat) {
                    util.res(null, res, [])
                }
                else {
                    util.res(null, res, cat)
                }
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            });
    },

    /**
     * 更新cat数据
     * PUT /cats/:cat_id {cat_name: '家居清洁', cat_pic: 'http://img.jindianhuo8.com/jiaju.png', sort: 50, is_show: true}
     * 
     */
    update: function(req, res, next){
        //参数过滤
        var cat = req.body.cat
        Cat.where({id: req.params.cat_id})
            .save(cat, {patch: true})
            .then(function (cat) {
                util.res(null, res, {});
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            }); 
    },

    /**
     * 新增cat数据
     * POST /cats/ {cat_name: '家居清洁', cat_pic: 'http://img.jindianhuo8.com/jiaju.png', sort: 50, is_show: true}
     */
    add: function(req, res, next){
        //参数过滤
        var cat = req.body.cat
        delete cat.id
        Cat.forge(cat)
            .save()
            .then(function (cat) {
                util.res(null, res, {id: cat.get('id')})
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message}
                util.res(error, res);
            }); 
    },

    /**
     * 删除cat数据 ［DANGER］
     * DELETE /cats/:id
     */
    del: function(req, res, next){
        Cat.forge({id: req.params.cat_id})
            .fetch({require: true})
            .then(function (cat) {
                //鉴权
                cat.destroy()
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
