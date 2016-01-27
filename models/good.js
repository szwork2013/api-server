var Bookshelf = require('bookshelf').mysqlAuth;

var Good = Bookshelf.Model.extend({
    tableName: 'goods',
    cat:  function() {
        return this.belongsTo('Cat');
    },
    spec: function(){
        return this.belongsTo('Spec');
    },
    supplier: function(){
        return this.belongsTo('Store');
    },
    tags: function(){
        //return this.belongsToMany('Tag', 'goods_tags', 'good_id', 'tag_id');
        return this.belongsToMany('Tag').through('GoodTag');
    }
});

module.exports = Bookshelf.model('Good', Good);
