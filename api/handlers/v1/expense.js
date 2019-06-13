const _ = require('lodash'),
    router = require('express').Router();

router.post('/', (req, res, next) => {



    return res.json(res.api);

});

module.exports = router;