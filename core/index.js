'use strict';

const _ = require('lodash'),
    knex = require('knex'),

    modules = [
        'mixins',
        'transaction',
        'user',
    ];

function init(cfg) {

    let core = {},
        db = {
            'postgres': knex({
                client: 'pg',
                connection: {
                    host    : cfg.db.postgres.host,
                    user    : cfg.db.postgres.user,
                    password: cfg.db.postgres.password,
                    database: cfg.db.postgres.database,
                },
                debug: false
            }),
        };

    _.each(modules, (module) => {
        core[module] = require('./' + module)(cfg, db);
    });

    return core;
}

module.exports = init;