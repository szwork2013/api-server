
var Tag = require('../models/tag.js');
var TagSvc = require('../services/tag.js');

module.exports = {
    /**
     * 查询所有标签信息
     * GET /tags
     * page=1
     * limit=30,
     * sort= update,create
     * inlne-relation-depeth=1 
     * q=owner:8805,cat_id:758
     *
     */
    queryAll: function(req, res, next){

    },

    /**
     * 查询标签信息
     * GET /tags/:tag_id
     * inlne-relation-depeth:1 
     * 
     */
    findOne: function(req, res, next){

    },

    /**
     * 更新用户信息
     * PUT /tag/:tag_id
     * 
     */
    update: function(req, res, next){

    },

    /**
     * 新增标签信息
     * POST /tags/
     */
    add: function(req, res, next){

    },

    /**
     * 删除标签信息
     * DELETE /tags/:id
     */
    del: function(req, res, next){

    }
}
