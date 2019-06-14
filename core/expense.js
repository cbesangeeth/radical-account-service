module.exports = (cfg, db) => {

    const _ = require('lodash'),
        knex = db.mysql,
        table = 'expense';


    class Expense {
        constructor() {
            this.userId = null;
            this.categoryId = null;
            this.date = null;
            this.amount = null;
            this.description = null;
        }
    }

    class ExpenseRepo {

        static async save(expense) {

            const sql = `INSERT INTO ${table}
            (user_id, category_id, date, amount, description)
            VALUES (?, ?, ?, ?, ?)`;

            const params = [
                expense.userId,
                expense.categoryId,
                expense.date,
                expense.amount,
                expense.description,
            ];

            console.log(sql, 'exp');
            console.log(params, 'param');
            const response = await knex.raw(sql, params);

            console.log(response, 'expense core response');
            return response.rows;
        }

    }

    return {
        Expense,
        ExpenseRepo,
    };
}