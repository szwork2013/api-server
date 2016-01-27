var Bookshelf = require('bookshelf').mysqlAuth;

var Store = Bookshelf.Model.extend({
    tableName: 'stores',
    owner: function(){
        return this.belongsTo('User');
        //return this.belongsTo('User').query().select('username', 'nickname', 'email', 'phone', 'avatar', 'id');
    },
    goods: function(){
        return this.hasMany('Good');
    }
});

module.exports = Bookshelf.model('Store', Store);
