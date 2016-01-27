var Bookshelf = require('bookshelf').mysqlAuth;

var Cart = Bookshelf.Model.extend({
    tableName: 'carts',
    good: function(){
        return this.belongsTo('Good');
    },
    owner: function(){
        return this.belongsTo('User');
    }
});

module.exports = Bookshelf.model('Cart', Cart);
