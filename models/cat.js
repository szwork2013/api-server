var Bookshelf = require('bookshelf').mysqlAuth;

var Cat = Bookshelf.Model.extend({
    tableName: 'cats',
    specs: function(){
        return this.hasMany('Spec');
    },
    goods: function(){
        return this.hasMany('Good');
    }
});

module.exports = Bookshelf.model('Cat', Cat);
