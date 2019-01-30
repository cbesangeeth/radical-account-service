'use strict';

const router = require('express').Router(),
      _      = require('lodash');

router.use('', (req, res, next) =>{
    const userId = _.trim(req.header('userId'));

    // If no userId, throw 401 bad request error
    if (!userId) {
        res.api.status = 401;
        res.status(res.api.status);

        res.api.errors = {};

        // setting appropriate error objects
        res.api.errors.code    = 'UNAUTHENTICATED';
        res.api.errors.message = 'Invalid / no userId';

        req.app.get('log').warn('validateUser', _.assign(req.app.get('logEntry'), {
            'message': 'Invalid / no userId',
            'res'    : JSON.stringify(res.api),
            'status' : res.api.status
        }));

        return res.json(res.api);
    }

    // setting header userId to query.userId
    req.query.userId = userId;

    next();
});

module.exports = router;