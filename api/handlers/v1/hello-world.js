'use strict';

const router  = require('express').Router(),
            _ = require('lodash');

/*
    GET API to display welcome message
*/
router.get('/', (req, res , next) =>{
    console.log('hello-world');

    let errors;

    errors = validateAndBuild(req);

    res.api.data = {
        hello : {
            hi : 'Welcome,',
            to : 'radical-service !',
        }
    }

    req.app.get('log').info(_.assign(req.app.get('logEntry'), {
        'res'   : JSON.stringify(res.api),
        'status': res.api.status,
    }));

    return res.send(res.api);
});

function validateAndBuild(req) {
    let errors = [];

    /* if (!req.body.hello) {
        errors.push({
            'code'   : errorCode.NULL_VALUE,
            'target' : 'hello',
            'message': 'hello is required'
        });
    } */

    return errors;
}

module.exports = router;