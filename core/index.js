'use strict';

const _     = require('lodash'),
    modules = [

    ];

function init(cfg){
    let core = {},
        db   = {};

    _.each(modules , (modulel) => {
        core[module] = require('./' + module)(cfg, db);
    });

    return core;
}

module.exports = init;