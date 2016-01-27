var Bookshelf = require('bookshelf').mysqlAuth;

var GoodTag = Bookshelf.Model.extend({
    tableName: 'goods_tags',
    good: function(){
        return this.belongsTo('Good');
    },
    tag: function(){
        return this.belongsTo('Tag');
    }
});

module.exports = Bookshelf.model('GoodTag', GoodTag);
