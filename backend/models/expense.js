const sql = require("../config/db");

module.exports.get = (reqObj, callback) => {
    sql.query("SELECT expense.id, expense.category_id, expense.dept_id, expense.amount, expense.created_at, expense.created_by, expense.updated_at, expense.updated_by, expense.status, expense.approved_by, user.first_name FROM expense LEFT JOIN user ON user.id = expense.created_by WHERE expense.is_active IS NULL OR expense.is_active = ?",[reqObj.is_active], function (err, result) {
        if(err) {
            callback(err, null);
        }
        if (!result) {
            callback({}, null);
        }
        callback(null, result);
    });
}

module.exports.create = function(reqObj, callback){
    sql.query('INSERT INTO expense SET ?', reqObj, (err, resData) => {
        if (err) {
               callback(err, null);
            }
         callback(null, resData);
        });
}

module.exports.put = function(reqObj, callback){
    sql.query('UPDATE expense SET category_id = ?, dept_id = ?, amount = ?, updated_at = ? WHERE id = ?', [reqObj.category_id, reqObj.dept_id, reqObj.amount, reqObj.updated_at, reqObj.id], (err, resData) => {
        if (err) {
               callback(err, null);
            }
         callback(null, resData);
        });
}

module.exports.approveExpn = function(reqObj, callback){
    sql.query('UPDATE expense SET amount = ?, status = ?, updated_at = ?, approved_by = ? WHERE id = ?', [reqObj.amount, reqObj.status, reqObj.updated_at, reqObj.approved_by, reqObj.id], (err, resData) => {
        if (err) {
               callback(err, null);
            }
         callback(null, resData);
        });
}


module.exports.delete = function(reqObj, callback){
    sql.query('UPDATE expense SET is_active = ? WHERE id = ?', [reqObj.is_active, reqObj.id], (err, resData) => {
        if (err) {
               callback(err, null);
            }
         callback(null, resData);
        });
}