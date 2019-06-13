'use strict';

const _ = require('lodash'),
    mysql = require('mysql'),
    knex = require('knex'),
    modules = [

    ];

function init(cfg) {
    let core = {},
        db = {
            mysql: knex({
                client: 'mysql',
                connection: {
                    host: cfg.db.mysql.host,
                    user: cfg.db.mysql.user,
                    password: cfg.db.mysql.password,
                    database: cfg.db.mysql.database,
                },
                debug: false
            }),
        };


    _.each(modules, (modulel) => {
        core[module] = require('./' + module)(cfg, db);
    });

    return core;
}

module.exports = init;