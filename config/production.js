'use strict';

const db = require('./database.json');

module.exports = {
    api: {
        host: '0.0.0.0',
        port: process.env.PORT || '3000',
    },
    db: {
        postgres:{
            user    : db.prod.user,
            password: db.prod.password,
            database: db.prod.database,
            host    : db.prod.host,
            dialect : db.prod.driver,
            port    : db.prod.port
        },
    },
};