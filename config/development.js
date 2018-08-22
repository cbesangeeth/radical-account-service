'use strict';

const db = require('./database.json');

module.exports = {
    api: {
        host: '0.0.0.0',
        port: process.env.PORT || '3000',
    },
    db: {
        postgres:{
            user    : db.dev.user,
            password: db.dev.password,
            database: db.dev.database,
            host    : db.dev.host,
            dialect : db.dev.driver
        },
    },
};