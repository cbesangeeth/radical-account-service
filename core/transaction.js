'use strict';

module.exports = (cfg, db) => {
    const mixins    = require('./mixins')(cfg),
        _           = require('lodash'),
        Timestamped = mixins.Timestamped,
        table       = 'transaction',
        knex        = db.postgres;

    class Transaction extends Timestamped {
        constructor() {
            super();

            /**
             * @property userId
             * @type {number}
             */
            this.userId = null;

             /**
             * @property transactionDate
             * @type {Date}
             */
            this.transactionDate = null;

            /**
             * @property transactionTypeId
             * @type {number}
             */
            this.transactionTypeId = null;

            /**
             * @property cashFlowTypeId
             * @type {number}
             */
            this.cashFlowTypeId = null;

             /**
             * @property currentBalance
             * @type {number}
             */
            this.currentBalance = null;

            /**
             * @property amount
             * @type {number}
             */
            this.amount = null;
        }
    }

    /**
     * @constructor
     * @class transaction.Repo
     */
    class Repo {
        /**
         * Save a transaction
         *
         * @static
         * @method save
         * @for    transaction.Repo
         * @param  {Object} transaction
         * @return {Promise} Inserted transaction
         */
        static async save(transaction) {
            const sql = `INSERT INTO ${table}
        (user_id, transaction_date, cash_flow_type_id, current_balance, amount, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?) returning id`;

            const params = [
                transaction.userId,
                transaction.transactionDate,
                transaction.cashFlowTypeId,
                transaction.currentBalance,
                transaction.amount,
                transaction.createdAt,
                transaction.updatedAt,
            ];

            const response = await knex.raw(sql, params);

            return _.head(response.rows).id;
        }

    };

    return {
        Transaction,
        Repo,
    };
};