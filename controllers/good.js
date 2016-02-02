var models = require('../models');
var Good = models.Good;
var Tag = models.Tag;
var GoodTag = models.GoodTag;
var Paginator = require('./paginator');
var _ = require('underscore');
var Promise = require('bluebird');


var util = require('../util/util.js');

//存储tags
var saveTags = function(goodId, tags) {
    // create tag objects
    var tagObjects = tags.map(function (tag) {
        return { name: tag };
    });
  return Tag.forge()
  // fetch tags that already exist
  .query('whereIn', 'name', _.pluck(tagObjects, 'name'))
  .fetchAll()
  .then(function (existingTags) {

    var doNotExist = [];
    existingTags = existingTags ? existingTags.toJSON(): '';
    // filter out existing tags
    if (existingTags.length > 0) {
      var existingSlugs = _.pluck(existingTags, 'name');
      doNotExist = tagObjects.filter(function (t) {
        return existingSlugs.indexOf(t.name) < 0;
      });
    }
    else {
      doNotExist = tagObjects;
    }
    // save tags that do not exist
    return Promise.map(doNotExist, function(model){
        return  Tag.forge(model).save()
                .then(function(tag) {
                    return tag.get('id');
                });
    })
    // return ids of all passed tags
    .then(function (ids) {
        var tagIds = existingTags? ids: _.union(ids, _.pluck(existingTags, 'id'));
        //save good-tag relationships
        return Promise.map(tagIds, function(tagId){
            return new GoodTag({
              good_id: goodId,
              tag_id: tagId
            }).fetch().then(function(goodTag){
                //console.log(goodId, tagId)
                if(!goodTag){
                    return  new GoodTag({good_id: goodId, tag_id: tagId}).save();
                } else {
                    return '';
                }
            })
        })
    });
  });
}

module.exports = {
    /**
     * 查询参数
     * GET /goods
     * GET /suppliers/:supplier_id/goods
     * GET /cats/:cat_id/goods
     * GET /specs/:spec_id/goods
     * page=1
     * limit=30,
     * sort=sales,recomended
     * inlne-relation-depth=1 
     * q=supplier_id:8805,cat_id:758
     *
     */
    queryAll: function(req, res, next){
        var filter = util.param(req);
        var relations = [];
        var inline_relation = parseInt(req.param('inline-relation-depth'));
        if(!isNaN(inline_relation) && inline_relation >= 1){
            relations = ['cat', 'spec', 'supplier', 'tags']
        }

        if (filter.good_id) {
            filter.id  = filter.good_id;
            delete filter.good_id;
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
        //filter.like && (delete filter.like);
        //console.log(sort)
        var queryFun = function(qb, limited){
            if(like) { 
                qb = qb.where('name', 'like', '%' + like + '%')
                    .orWhere('description', 'like', '%' + like + '%');
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

        Good.forge()
            .query(function(qb){
                queryFun(qb, true)
            })
            .fetchAll({withRelated: relations})
            .then(function(goods) {
                return Good.forge()
                .query(function(qb){
                    queryFun(qb)
                })
                .count()
                .then(function (count) {
                    count = count.length? count[0]['count(*)'] : count;
                    return {
                        count: count,
                        data: goods
                    };
                });
            }, function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            }).then(function (result) {
                var count = result.count;
                var goods = result.data;
                paginator.setCount(count);
                paginator.setData(goods);

                var ret = paginator.getPaginator();
                //console.log(ret);
                return  util.res(null, res, ret);

                //return res.json();
            });

            // .then(function (goods) {
            //     if (!goods) {
            //         util.res(null, res, [])
            //     }
            //     else {
            //         util.res(null, res, goods)
            //     }
            // })
            // .catch(function (err) {
            //     var error = { code: 500, msg: err.message};
            //     util.res(error, res);
            // });
    },

    /**
     * 查询参数
     * GET /goods/:good_id
     * inlne-relation-depth:1 
     * 
     */
    findOne: function(req, res, next){
        var filter = util.param(req);

        var relations = [];
        var inline_relation = parseInt(req.param('inline-relation-depth'));
        if(!isNaN(inline_relation) && inline_relation >= 1){
            relations = ['cat', 'spec', 'supplier', 'tags']
        }

        if (filter.good_id) {
            filter.id  = filter.good_id;
            delete filter.good_id;
        }

        Good.forge(filter)
            .fetch({withRelated: relations})
            .then(function (good) {
                if (!good) {
                    var error = { code: 404, msg: 'not found'};
                    util.res(error, res)
                }
                else {
                    util.res(null, res, good)
                }
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            });
    },

    /**
     * 更新商品数据
     * PUT /goods/:good_id
     * PUT /suppliers/:supplier_id/goods/:good_id
     * 
     */
    update: function(req, res, next){
        var filter = util.param(req);
        var whiteList = ['name', 'brand_name', 'cat_id', 'spec_id', 'default_image', 'description',
            'hot', 'market_price', 'price', 'store_id', 'stock', 'type', 'unit']
        var good = util.cloneProps(req.body.good, whiteList);

        console.log(good)
        var tags = req.body.tags;

        //鉴权(管理员才有权限使用该接口)
        if(true){ //req.session && req.session.user && req.session.user.role==1
            //参数过滤
            new Good({id: req.params.good_id})
                .save(good, {patch: true})
                .then(function (good) {
                    //继续存储tags内容
                    saveTags(req.params.good_id, tags).then(function(){
                        util.res(null, res, {});
                    })
                    //util.res(null, res, {});
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
     * 新增商品数据
     * POST /goods/
     * POST /suppliers/:supplier_id/goods/:id
     */
    add: function(req, res, next){
        //鉴权(供应商或者管理员)
        if(req.session && req.session.user && req.session.user.role==1){

        }

        //参数过滤
        var good = req.body.good
        var tags = req.body.tags;

        Good.forge(good)
            .save()
            .then(function (good) {
                //继续存储tags内容
                saveTags(good.get('id'), tags).then(function(){
                    util.res(null, res, {id: good.get('id')});
                })
                
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            }); 

    },

    /**
     * 删除商品数据
     * DELETE /goods/:good_id
     * DELETE /suppliers/:supplier_id/goods/:good_id
     */
    del: function(req, res, next){
        Good.forge({id: req.params.good_id})
            .fetch({require: true})
            .then(function (good) {
                //鉴权


                
                good.destroy()
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
