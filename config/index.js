'use strict';

const _ = require('lodash'),
    config = {
        appname   : 'radical-service',
        baseurl   : 'http://localhost',
        paths     : {
            public: '/public',
        },
        env: process.env.NODE_ENV || 'development',
        api: {},
        aws: {},
        db : {},
        mq : {},
    };

module.exports = _.assignIn(config, require(`./${config.env}`));