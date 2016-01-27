var Bookshelf = require('bookshelf').mysqlAuth;

var User = Bookshelf.Model.extend({
    tableName: 'users',
    cart: function() {
        return this.hasOne('Cart');
    },
    coupons: function(){
        return this.hasMany('Coupon');
    },
    orders: function(){
        return this.hasMany('Order');
    },
    stores: function(){
        return this.hasMany('Store');
    }, 
    addresses: function() {
        return this.hasMany('Address');
    }
});

module.exports = Bookshelf.model('User', User);
