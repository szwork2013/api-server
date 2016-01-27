var Bookshelf = require('bookshelf').mysqlAuth;


var Address = Bookshelf.Model.extend({
    tableName: 'address',
    owner: function(){
        return this.belongsTo('User');
    }
});

module.exports = Bookshelf.model('Address', Address);
