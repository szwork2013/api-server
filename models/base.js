'use strict'

/**
 * init bookshelf connection
 * @type {[type]}
 * 用法如下
    const bookshelf = require('./base')();
    var Users = bookshelf.Model.extend({
        tableName: 'users'
    });

    module.exports = Users;

 */
let Bookshelf = null,
    dbConfig = require('../config/db.dev.conf.js');
module.exports = function() {

    if (Bookshelf) {
        return Bookshelf;
    }

    var knex = require('knex')(dbConfig);

    Bookshelf = require('bookshelf')(knex);

    /**
     * This solves the circular module dependency problem created by Bookshelf models
     * in a previous commit #38d98bb4c33e91b636a3538bd546ebe7f5077328
     **/
    Bookshelf.plugin('registry');

    return Bookshelf;
};