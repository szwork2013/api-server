var Bookshelf = require('bookshelf').mysqlAuth;

var Order = Bookshelf.Model.extend({
    tableName: 'orders',
    user:  function() {
        return this.belongsTo('User');
    },
    details: function(){
        return this.hasMany('OrderDetail');
    }
});

module.exports = Bookshelf.model('Order', Order);
