'use strict';

const app      = require('express')(),
  addReqId     = require('express-request-id'),
    log        = require('./logger'),
    core       = require('../core'),
    bodyParser = require('body-parser'),
    _          = require('lodash'),
    config     = require('../config');

// to add unique-ids to requests
app.use(addReqId());

// use md5 hashes for etags
app.set('etag', 'strong');

// set config
app.set('config', config);

// set log, core
app.set('log', require('./logger'));
app.set('core', core(config));

// make express aware that it's sitting behind a proxy, ie trust the X-Forwarded-* header
app.enable('trust proxy');

app.disable('x-powered-by');

// set req._data = {}
app.use(function (req, res, next) {
    req._data = {};
    next();
});

// create response
app.use(function (req, res, next) {
    res.api = {
        'status': 200,
        'errors': {},
        'data'  : {},
    };

    next();
});

// pretty print json
app.use(function (req, res, next) {
    app.set('json spaces', 0);

    if (req.query.pretty) {
        app.set('json spaces', 2);
    }

    next();
});

// Log common fields
app.use(function (req, res, next) {
    req.app.set('logEntry', {
        'serviceName': 'radical-service',
        'method'     : req.method,
        'request'    : req.originalUrl,
        'query'      : req.query,
        'protocol'   : req.protocol,
        'ip'         : req.ip,
        'requestId'  : req.id,
    });

    next();
});

// accept json input
app.use(bodyParser.json());

// Attach routes
require('../api/routes')(app);

// handle 404
app.use(function (req, res) {
    res.api.status = 404;
    res.status(res.api.status);

    // setting appropriate error objects
    res.api.errors.code    = 'endpoint';
    res.api.errors.message = 'API endpoint does not exist';

    req.app.get('log').warn('404', _.assignIn(req.app.get('logEntry'), {
        'message': 'API endpoint does not exist',
        'status' : res.api.status
    }));

    res.json(res.api);
});

// handle errors
app.use(function (err, req, res, next) {
    if (! err) {
        return next();
    }

    // catch invalid json in request body
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {

        res.api.status = 400;
        res.status(res.api.status);

        // setting appropriate error objects
        res.api.errors.code    = 'body';
        res.api.errors.message = 'Invalid input';

        req.app.get('log').warn('400', _.assignIn(req.app.get('logEntry'), {
            'message': 'Invalid input',
            'status' : res.api.status,
            'error'  : err,
            'stack'  : err.stack,
        }));

        return res.json(res.api);
    }

    // setting appropriate error objects
    res.api.errors.code    = 'endpoint';
    res.api.errors.message = 'Oops something broke!';

    res.api.status = 500;
    res.status(res.api.status);

    req.app.get('log').warn('500', _.assignIn(req.app.get('logEntry'), {
        'message': 'Internal server error',
        'status' : res.api.status,
        'error'  : err,
        'stack'  : err.stack,
    }));

    res.json(res.api);
});


app.listen(app.get('config').api.port, () =>{
    console.log('Listening on %s:%s',
    app.get('config').api.host,
    app.get('config').api.port);
});

log.info(
    'Listening on %s:%s',
    app.get('config').api.host,
    app.get('config').api.port
);

console.log(`App is running on http://${app.get('config').api.host}:${app.get('config').api.port}`);