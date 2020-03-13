const sql = require("../config/db");

module.exports.get = (reqObj, callback) => {
    sql.query("SELECT user_dept.dept_id, user_dept.user_id, user_dept.id, user_dept.created_at, user_dept.created_by, user_dept.updated_at, user_dept.updated_by, user.first_name FROM user_dept LEFT JOIN user ON user.id = user_dept.created_by WHERE user_dept.is_active IS NULL OR user_dept.is_active = ?",[reqObj.is_active], function (err, result) {
        if(err) {
            return callback(err, null);
        }
        if (!result) {
            return callback({}, null);
        }
        return callback(null, result);
    });
}


module.exports.getUserDept = (reqObj, callback) => {
    sql.query("SELECT user_dept.dept_id, user_dept.user_id, user_dept.id, user_dept.created_at, user_dept.created_by, user_dept.updated_at, user_dept.updated_by, department.name FROM user_dept LEFT JOIN department ON department.id = user_dept.dept_id WHERE user_dept.is_active IS NULL OR user_dept.is_active = ? AND user_dept.user_id = ? ",[reqObj.is_active], function (err, result) {
        if(err) {
            return callback(err, null);
        }
        if (!result) {
            return callback({}, null);
        }
        return callback(null, result);
    });
}


module.exports.create = function(reqObj, callback){
    sql.query('INSERT INTO user_dept SET ?', reqObj, (err, resData) => {
        if (err) {
            return callback(err, null);
            }
            return callback(null, resData);
        });
}

module.exports.put = function(reqObj, callback){
    sql.query('UPDATE user_dept SET user_id = ?, dept_id = ?, updated_at = ? WHERE id = ?', [reqObj.user_id, reqObj.dept_id, reqObj.updated_at, reqObj.id], (err, resData) => {
        if (err) {
            return callback(err, null);
            }
            return callback(null, resData);
        });
}

module.exports.delete = function(reqObj, callback){
    sql.query('UPDATE user_dept SET is_active = ? WHERE id = ?', [reqObj.is_active, reqObj.id], (err, resData) => {
        if (err) {
            return callback(err, null);
            }
            return callback(null, resData);
        });
}