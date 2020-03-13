const sql = require("../config/db");

module.exports.get = (reqObj, callback) => {
    sql.query("SELECT user_role.role_id, user_role.user_id, user_role.id, user_role.created_at, user_role.created_by, user_role.updated_at, user_role.updated_by, user.first_name FROM user_role LEFT JOIN user ON user.id = user_role.created_by WHERE user_role.is_active IS NULL OR user_role.is_active = ?",[reqObj.is_active], function (err, result) {
        if(err) {
            return callback(err, null);
        }
        if (!result) {
            return callback({}, null);
        }
        return callback(null, result);
    });
}

module.exports.getUserRoles = (reqObj, callback) => {
    sql.query("SELECT user_role.role_id, user_role.user_id, user_role.id, user_role.created_at, user_role.created_by, user_role.updated_at, user_role.updated_by, role.name FROM user_role LEFT JOIN role ON role.id = user_role.role_id WHERE user_role.is_active IS NULL OR user_role.is_active = ? AND user_role.user_id = ? ",[reqObj.is_active, reqObj.user_id], function (err, result) {
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
    sql.query('INSERT INTO user_role SET ?', reqObj, (err, resData) => {
        if (err) {
            return callback(err, null);
            }
            return callback(null, resData);
        });
}

module.exports.put = function(reqObj, callback){
    sql.query('UPDATE user_role SET user_id = ?, role_id = ?, updated_at = ? WHERE id = ?', [reqObj.user_id, reqObj.role_id, reqObj.updated_at, reqObj.id], (err, resData) => {
        if (err) {
            return callback(err, null);
            }
            return callback(null, resData);
        });
}

module.exports.delete = function(reqObj, callback){
    sql.query('UPDATE user_role SET is_active = ? WHERE id = ?', [reqObj.is_active, reqObj.id], (err, resData) => {
        if (err) {
            return callback(err, null);
            }
            return callback(null, resData);
        });
}