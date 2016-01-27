var Bookshelf = require('bookshelf').mysqlAuth;

var Tag = Bookshelf.Model.extend({
    tableName: 'tags',
    goods: function(){
        //return this.belongsToMany('Good', 'goods_tags', 'tag_id', 'good_id');
        return this.belongsToMany('Good').through('GoodTag');
    }
});

module.exports = Bookshelf.model('Tag', Tag);
