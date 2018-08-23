
# select current balance
SELECT current_balance
FROM
    "user"
WHERE
 id=? and
 is_active =true limit 1


 INSERT INTO
 transcation
 (user_id, transaction_date, cash_flow_type_id, transcation_type_id, amount, created_at, updated_at)
VALUES
    (1, '2018-08-17T12:15:48.346Z', 1, 1, 10, '2018-08-17T12:15:48.346Z', '2018-08-17T12:15:48.346Z')
returning id;