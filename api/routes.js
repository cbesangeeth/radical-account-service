'use strict'

module.exports = function (app) {
    app.use('/',                    require('./handlers/v1/hello-world'));
    app.use('/v1/transactions',     require('./handlers/v1/vital/transaction'));
};