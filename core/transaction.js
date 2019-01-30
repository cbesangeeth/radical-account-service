'use strict';

module.exports = (cfg, db) => {
    const mixins     = require('./mixins')(cfg),
        _            = require('lodash'),
        Timestamped  = mixins.Timestamped,
        expenseTable = 'expense',
        incomeTable  = 'income',
        knex         = db.postgres;

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

            // /**
            //  * @property transactionTypeId
            //  * @type {number}
            //  */
            // this.transactionTypeId = null;

            /**
             * @property amount
             * @type {numeric}
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
         * @method saveExpense
         * @for    transaction.Repo
         * @param  {Object} transaction
         * @return {Promise} Inserted exooense id
         */
        static async saveExpense(transaction) {
            const sql = `INSERT INTO ${expenseTable}
        (user_id, transaction_date, amount, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?) returning id`;

        console.log('adsf')
            const params = [
                transaction.userId,
                transaction.transactionDate,
                transaction.amount,
                transaction.createdAt,
                transaction.updatedAt,
            ];

            const response = await knex.raw(sql, params);

            return _.head(response.rows).id;
        }

         /**
         * Save a transaction
         *
         * @static
         * @method saveIncome
         * @for    transaction.Repo
         * @param  {Object} transaction
         * @return {Promise} Inserted exooense id
         */
        static async saveIncome(transaction) {
            const sql = `INSERT INTO ${incomeTable}
        (user_id, transaction_date, amount, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?) returning id`;

            const params = [
                transaction.userId,
                transaction.transactionDate,
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