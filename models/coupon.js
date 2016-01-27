var Bookshelf = require('bookshelf').mysqlAuth;

var Coupon = Bookshelf.Model.extend({
    tableName: 'coupons',
    owner: function(){
        return this.belongsTo('User');
    }
});

module.exports = Bookshelf.model('Coupon', Coupon);
