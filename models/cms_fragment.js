var Bookshelf = require('bookshelf').mysqlAuth;

var CmsFragment = Bookshelf.Model.extend({
    tableName: 'cms_fragments',
    module: function(){
        return this.belongsTo('CmsModule');
    }
});

module.exports = Bookshelf.model('CmsFragment', CmsFragment);
