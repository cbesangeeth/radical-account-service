'use strict';

const _ = require('lodash'),
    config = {
        appname: 'radical-service',
        baseurl: process.env.BASEURL || 'http://localhost',
        paths  : {},
        env    : process.env.NODE_ENV || 'development',
        api    : {},
        db     : {},
    };

module.exports = _.assignIn(config, require(`./${config.env}`));