'use strict';

let bunyan = require('bunyan'),
    cfg    = require('../config');

module.exports = bunyan.createLogger({
    name: cfg.appname,
    streams: [
        {
            stream: process.stdout,
            level: 'debug'
        },
        {
            path :  cfg.appname + '.log',
            level: 'trace'
        }
    ],
    serializers: {
      req: bunyan.stdSerializers.req,
      res: bunyan.stdSerializers.res
    }
});
