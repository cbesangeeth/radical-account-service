'use strict';

const db = require('./database.json');

module.exports = {
    api: {
        host: '0.0.0.0',
        port: process.env.PORT || '3000',
    },
    db: {
        postgres:{
            user    : db.production.user,
            password: db.production.password,
            database: db.production.database,
            host    : db.production.host,
            dialect : db.production.driver,
            port    : db.production.port
        },
    },
};