const _ = require('lodash'),
    router = require('express').Router();

router.post('/', async (req, res, next) => {

    // Create userDeviceInstance object
    const expense = new(req.app.get('core').expense.Expense)();

    console.log(req.body, 'body');

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
    let insertedId;
    try {
        insertedId = await req.app.get('core').expense.ExpenseRepo.save(expense);
    } catch (err) {
        return next(err);
    }

    // Setting inserted id
    expense.id = insertedId;

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

    if (!req.body.userId) {
        errors.push({
            'field': 'userId',
            'message': 'Missing userId'
        });
    }

    expense.userId = req.body.expense.userId;
    expense.categoryId = req.body.expense.categoryId;
    expense.date = req.body.expense.date;
    expense.amount = req.body.expense.amount;
    if (expense.description) {
        expense.description = req.body.expense.description;
    }

    return errors;
}

module.exports = router;