'use strict';

const router  = require('express').Router(),
    moment    = require('moment'),
    errorCode = require(__dirname + '/../../../../common/errorCode'),
    _         = require('lodash');

/**
 * This POST API is to collect the user transactions
 *
 * For more details, check out API docs {@link api_docs/analytics.html}
 */

router.post('/', require('../middlewares/validateUser'));
router.post('/', async (req, res, next) => {
    let errors;

    // Create userDeviceInstance object
    const transaction = new (req.app.get('core').transaction.Transaction)();

    // validate inputs
    errors = validateAndBuild(req, transaction);

    if (errors.length) {
        // setting response status to 400
        res.api.status = 400;
        res.status(res.api.status);

        // setting appropriate error objects
        res.api.errors.code    = errorCode.BAD_REQUEST;
        res.api.errors.message = 'Validation error';
        res.api.errors.details = errors;

        req.app.get('log').warn(_.assign(req.app.get('logEntry'), {
            'res'   : JSON.stringify(res.api),
            'status': res.api.status,
        }));

        return res.json(res.api);
    }

    // Service call to save the transaction
    let insertedId;

    try {
        insertedId = await req.app.get('core').transaction.Repo.save(transaction);
    } catch (err) {
        return next(err);
    }

    req.app.get('log').info(_.assign(req.app.get('logEntry'), {
        'res'   : JSON.stringify(res.api),
        'status': res.api.status,
    }));

    // update balance
    try {
        await req.app.get('core').user.Repo.updateCurrentBalanceByUserId(
            req.query.userId ,
            req.body.transaction.amount
        );
    } catch (err) {
        return next(err);
    }

    // Get Current balance
    let currentBalance;

    try {
        currentBalance = await req.app.get('core').user.Repo.getCurrentBalanceByUserId(req.query.userId);
    } catch (err) {
        return next(err);
    }

    transaction.currentBalance = currentBalance;
    res.api.data = {
        transaction
    };

    return res.json(res.api);
});

function validateAndBuild(req, transaction) {
    const errors = [];

    if (!req.body.transaction) {
        errors.push({
            'code'   : errorCode.NULL_VALUE,
            'target' : 'transaction',
            'message': 'transaction is required'
        });
    }

    if (!req.query.userId) {
        errors.push({
            'code'   : errorCode.NULL_VALUE,
            'target' : 'userId',
            'message': 'userId is required'
        });
    }

    if (errors.length ){
        return errors;
    }

    if (!req.body.transaction.transactionDate) {
        errors.push({
            'code'   : errorCode.NULL_VALUE,
            'target' : 'transactionDate',
            'message': 'transactionDate is required'
        });
    }

    if (!req.body.transaction.amount) {
        errors.push({
            'code'   : errorCode.NULL_VALUE,
            'target' : 'amount',
            'message': 'amount is required'
        });
    }

    if (!req.body.transaction.cashFlowTypeId) {
        errors.push({
            'code'   : errorCode.NULL_VALUE,
            'target' : 'cashFlowTypeId',
            'message': 'cashFlowTypeId is required'
        });
    }


    if (!req.body.transaction.transactionTypeId) {
        errors.push({
            'code'   : errorCode.NULL_VALUE,
            'target' : 'transactionTypeId',
            'message': 'transactionTypeId is required'
        });
    }

    // avoid hitting db if there are errors
    if (!errors.length) {
        // building data
        transaction.userId            = req.query.userId;
        transaction.transactionDate   = req.body.transaction.transactionDate;
        transaction.amount            = req.body.transaction.amount;
        transaction.cashFlowTypeId    = req.body.transaction.cashFlowTypeId;
        transaction.transactionTypeId = req.body.transaction.transactionTypeId;
        transaction.touch();
    }

    console.log(transaction);
    return errors;
}

module.exports = router;