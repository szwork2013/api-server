var Bookshelf = require('bookshelf').mysqlAuth;

var CmsModule = Bookshelf.Model.extend({
    tableName: 'cms_modules',
    fragments: function(){
        return this.hasMany('CmsFragment');
    }
});

module.exports = Bookshelf.model('CmsModule', CmsModule);
