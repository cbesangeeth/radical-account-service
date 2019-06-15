const _ = require('lodash'),
    router = require('express').Router(),
    validator = require('validator');

router.post('/', async (req, res, next) => {

    // Create userDeviceInstance object
    const expense = new(req.app.get('core').expense.Expense)();

    let errors = validateAndBuild(req, expense);

    // Throw 400 - Bad request error
    if (errors.length) {
        res.api.errors = errors;
        res.api.status = 400;
        res.status(res.api.status);

        req.app.get('log').warn('expense', _.assignIn(req.app.get('logEntry'), {
            'message': 'Bad request',
            'res': JSON.stringify(res.api),
            'status': res.api.status
        }));

        return res.json(res.api);
    }

    // Service call to save the expense object
    try {
        await req.app.get('core').expense.ExpenseRepo.save(expense);
    } catch (err) {
        return next(err);
    }

    const response = {};
    response.expense = expense;

    res.api.status = 201;
    res.api.data = response;
    res.status(res.api.status);

    return res.json(res.api);

});


function validateAndBuild(req, expense) {

    const errors = [];

    if (!req.body.expense) {
        errors.push({
            'field': 'expense',
            'message': 'Missing expense body'
        });

        return errors;
    }

    if (!req.body.expense.userId) {
        errors.push({
            'field': 'userId',
            'message': 'Missing userId'
        });
    }

    if (!req.body.expense.categoryId) {
        errors.push({
            'field': 'categoryId',
            'message': 'Missing category id'
        });
    }

    if (!req.body.expense.date) {
        errors.push({
            'field': 'date',
            'message': 'Missing date'
        });
    }

    if (!req.body.expense.amount) {
        errors.push({
            'field': 'amount',
            'message': 'Missing amount'
        });
    }

    if (errors.length) {
        return errors;
    }

    if (!validator.toDate(req.body.expense.date)) {
        errors.push({
            'field': 'date',
            'message': 'date should be a valid date string'
        });
    }

    expense.userId = req.body.expense.userId;
    expense.categoryId = req.body.expense.categoryId;
    expense.date = req.body.expense.date;
    expense.amount = req.body.expense.amount;

    if (req.body.expense.description) {
        expense.description = req.body.expense.description;
    }

    return errors;
}

module.exports = router;